<template>
  <span v-if="timerFinishedDate">{{ timer }}</span>
  <div class="container">
    <cinema-hall
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
  <span style="color: white">${{ sumPurchase }}</span>
  <custom-button title="Buy" @click="handleBuyTickets" />
  <custom-button title="Add stuff" @click="handleAddStuff" />
  <additional-modal
    v-if="isAdditionalOpen"
    @close="isAdditionalOpen = false"
    @save="handleAddStuffSave"
  />
</template>

<script>
import CinemaHall from "../components/CinemaHall.vue";
import SeatsPrice from "../components/Prices/SeatsPrice.vue";
import CustomButton from "../components/CustomButton.vue";
import AdditionalModal from "../components/AdittionsModal.vue";
import calculateStuffSum from "../services/calculateStuffSum.js";
import ticketService from "../services/ticket";
import {
  joinSession,
  reserveSeat,
  subscribe,
  unReserveSeat,
} from "../services/socketIo";
import moment from "moment";

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
  },
  data() {
    return {
      reservedSeats: {},
      tickets: [],
      isAdditionalOpen: false,
      additionalStuff: {},
      currentDate: new Date(),
      intervalId: null,
      timerFinishedDate: null,
    };
  },
  computed: {
    sumPurchase() {
      // выводим сумму зарезервированных
      return (
        this.stuffCost +
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
      return calculateStuffSum(this.additionalStuff).total || 0;
    },

    timer() {
      if(!this.timerFinishedDate) return null
      const timerFinishedDate = moment(this.timerFinishedDate);
      const timer = timerFinishedDate.diff(this.currentDate);
      return moment(timer).format("mm:ss")
    }
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
        this.seatReservationHandler({ticket});
      })
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

    seatReservationHandler(data) {
      const ticketIndex = this.tickets.findIndex((ticket) => {
        return ticket._id === data.ticket._id;
      });
      this.tickets[ticketIndex] = data.ticket;
    },

    timerCreatedHandler({ timer }) {
      if(this.timerFinishedDate) return
      this.currentDate = new Date();
      this.timerFinishedDate = new Date(timer.finishedDate)
      this.intervalId = setInterval(() => {
        this.currentDate = new Date();
      }, 1000)
    },

    timerDeletedHandler() {
      this.timerFinishedDate = null;
      clearInterval(this.intervalId)
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

    this.fetchTickets();

    joinSession(this.id);

    subscribe("seat-reserved", this.seatReservationHandler.bind(this));
    subscribe("seat-unreserved", this.seatReservationHandler.bind(this));
    subscribe("timer-created", this.timerCreatedHandler.bind(this));
    subscribe("timer-deleted", this.timerDeletedHandler.bind(this));
    subscribe("timer-is-out", this.timerDeletedHandler.bind(this));
  },
};
</script>

<style scoped>
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
</style>