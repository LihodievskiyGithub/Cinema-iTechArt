<template>
  <div class="header-container">
    <custom-button title="Go back" @click="goToMovie" />
    <timer-for-reservation />
  </div>
  <movie-info-for-hall :id="session.movie" :hall="hall?.name" />
  <div class="container">
    <cinema-hall
      :hall="hall"
      :tickets="tickets"
      :reserved-seats="reservedSeats"
      @reserveSeat="handleReserveSeat"
      @unReserveSeat="handleUnReserveSeat"
      @preReserveSeat="handlePreReserveSeat"
      @unReserveSeatSilent="handleUnReserveSeatSilent"
      class="container-hall"
      :id="id"
    />
    <seats-price class="container-seats" />
  </div>
  <ul>
    <li v-for="(seat, id) in reservedSeats" :key="id">
      {{ seat.type }} - {{ getTicketBySeat(seat).price }}$
      <i class="fas fa-times" @click="handleUnReserveSeat(seat)"></i> <br />
      row: {{ seat.row + 1 }} / number: {{ seat.number + 1 }}
    </li>
    <li
      v-show="cost && id !== 'total'"
      v-for="(cost, id) in stuffCost"
      :key="id"
    >
      {{ id }} - {{ cost }}
      <i class="fas fa-times" @click="handleRemoveStuff(id)"></i>
    </li>
  </ul>
  <span class="sum-of-seats" style="color: white"
    ><i class="fas fa-money-check-alt"></i> : {{ sumPurchase }}$</span
  >
  <custom-button title="Buy" @click="handleBuyTickets" />
  <custom-button title="Add stuff" @click="handleAddStuff" />
  <additional-modal
    v-if="isAdditionalOpen"
    @close="isAdditionalOpen = false"
    @save="handleAddStuffSave"
  />
</template>

<script>
import TimerForReservation from "../components/TimerForReservation.vue";
import MovieInfoForHall from "../components/MovieInfoForHall.vue";
import CinemaHall from "../components/CinemaHall.vue";
import SeatsPrice from "../components/Prices/SeatsPrice.vue";
import CustomButton from "../components/CustomButton.vue";
import AdditionalModal from "../components/AdittionsModal.vue";
import calculateStuffSum from "../services/calculateStuffSum.js";
import sessionService from "../services/sessions";
import hallService from "../services/hall";
import ticketService from "../services/ticket";
import {
  joinSession,
  reserveSeat,
  subscribe,
  unReserveSeat,
} from "../services/socketIo";

export default {
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
    session_id: {
      type: String,
      default: null,
    },
  },
  components: {
    SeatsPrice,
    CinemaHall,
    CustomButton,
    AdditionalModal,
    MovieInfoForHall,
    TimerForReservation,
  },
  data() {
    return {
      reservedSeats: {},
      tickets: [],
      isAdditionalOpen: false,
      additionalStuff: {},
      // currentDate: new Date(),
      // intervalId: null,
      // timerFinishedDate: null,
      session: { movie: null },
      hall: null,
    };
  },
  computed: {
    sumPurchase() {
      // выводим сумму зарезервированных
      return (
        (this.stuffCost.total || 0) +
        this.reservedTickets.reduce((acc, ticket) => {
          acc += ticket.price;
          return acc;
        }, 0)
      );
    },

    reservedTickets() {
      // проходимся по обычным билетам и фильтруем зарезервированные
      return this.tickets.reduce((acc, ticket) => {
        if (this.reservedSeats[ticket.seatId]) {
          acc.push(ticket);
        }
        return acc;
      }, []);
    },

    stuffCost() {
      return calculateStuffSum(this.additionalStuff);
    },
  },

  methods: {
    handleReserveSeat(seat) {
      const ticket = this.getTicketBySeat(seat);
      if (ticket.bought || ticket.reserved) return;
      this.reservedSeats[seat._id] = seat;
      const startDate = new Date();
      reserveSeat(ticket._id, this.id, startDate);
    },

    handleUnReserveSeat(seat) {
      const ticket = this.getTicketBySeat(seat);
      if (ticket.bought || (ticket.reserved && !this.reservedSeats[seat._id]))
        return;
      delete this.reservedSeats[seat._id];
      unReserveSeat(ticket._id, this.id);
    },

    handleUnReserveSeatSilent(seat, tickets) {
      delete this.reservedSeats[seat._id];
      tickets.forEach((ticket) => {
        this.seatReservationHandler({ ticket });
      });
    },

    handlePreReserveSeat(seat) {
      this.reservedSeats[seat._id] = seat;
    },

    getTicketBySeat(seat) {
      return this.tickets.find((ticket) => {
        return ticket.seatId === seat._id;
      });
    },

    async handleBuyTickets() {
      try {
        const stripeSession = await ticketService.handleBuyTickets(
          {
            tickets: this.reservedTickets,
            stuff: this.additionalStuff,
          },
          this.id
        );
        window.location = stripeSession.url;
      } catch (err) {
        console.log(err);
      }
    },

    async fetchTickets() {
      try {
        this.tickets = await ticketService.getTicketBySessionId(this.id);
      } catch (err) {
        console.log(err);
      }
    },

    handleAddStuff() {
      this.isAdditionalOpen = true;
    },

    handleAddStuffSave(stuff) {
      this.additionalStuff = stuff;
      this.isAdditionalOpen = false;
    },

    handleRemoveStuff(id) {
      this.additionalStuff[id] -= 1;
    },

    seatReservationHandler(data) {
      const ticketIndex = this.tickets.findIndex((ticket) => {
        return ticket._id === data.ticket._id;
      });
      this.tickets[ticketIndex] = data.ticket;
    },

    goToMovie() {
      this.$router.push({
        name: "moviePreview",
        params: { id: this.session?.movie },
      });
    },

    async fetchSession() {
      try {
        this.session = await sessionService.getSessionById(this.id);
      } catch (err) {
        console.log(err);
      }
    },

    async fetchHall() {
      try {
        const hall = await hallService.getHallBySessionId(this.id);
        this.hall = hall;
      } catch (err) {
        console.log(err);
      }
    },
  },

  async created() {
    if (this.$route.query.session_id) {
      try {
        const response = await ticketService.completePurchase(
          this.$route.query.session_id
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }

    this.fetchHall();
    this.fetchSession();
    this.fetchTickets();

    joinSession(this.id);

    subscribe("seat-reserved", this.seatReservationHandler.bind(this));
    subscribe("seat-unreserved", this.seatReservationHandler.bind(this));
  },
};
</script>

<style lang="scss" scoped>


.container {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.container-seats {
  flex-grow: 1;
}

.container-hall {
  width: 70%;
  flex-shrink: 0;
  flex-grow: 2;
}

ul {
  list-style-type: none;
  display: flex;

  .fa-times {
    margin: 0px 4px;
    font-size: 15px;
  }

  .fa-times:hover {
    color: hsl(30, 73%, 44%);
    animation: 1s linear 0s normal none infinite running rot;
  }

  & > li {
    color: white;
    margin: 15px 40px 20px 11px;
  }

  @keyframes rot {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.sum-of-seats {
  border-top: 1px solid grey;
  display: flex;
  justify-content: flex-end;
  margin: 10px 50px 20px 50px;
  padding: 15px 0px;

  .fa-money-check-alt {
    margin: 0px 3px;
    font-size: 20px;
  }
}
</style>