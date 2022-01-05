<template>
  <div class="container">
    <cinema-hall
      :tickets="tickets"
      :reserved-seats="reservedSeats"
      @reserveSeat="handleReserveSeat"
      @unReserveSeat="handleUnReserveSeat"
      class="container-hall"
      :id="id"
    />
    <seats-price class="container-seats" />
  </div>
  <span style="color: white">${{ sumPurchase }}</span>
  <custom-button title="Buy" @click="handleBuyTickets" />
  <custom-button title="Add stuff" @click="handleAddStuff" />
  <additional-modal v-if="isAdditionalOpen" @close="isAdditionalOpen = false" @save="handleAddStuffSave" />
</template>

<script>
import CinemaHall from "../components/CinemaHall.vue";
import SeatsPrice from "../components/Prices/SeatsPrice.vue";
import CustomButton from "../components/CustomButton.vue";
import AdditionalModal from "../components/AdittionsModal.vue";
import calculateStuffSum from "../services/calculateStuffSum.js"
import ticketService from "../services/ticket";

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
    };
  },
  computed: {
    sumPurchase() {
      // выводим сумму зарезервированных
      return this.stuffCost +  this.reservedTickets.reduce((acc, ticket) => {
        acc += ticket.price;
        return acc;
      }, 0);
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

    stuffCost () {
      return calculateStuffSum (this.additionalStuff).total || 0;
    }
  },
  methods: {
    handleReserveSeat (seat) {
      this.reservedSeats[seat._id] = seat;
    },
    handleUnReserveSeat(seat) {
      delete this.reservedSeats[seat._id];
    },
    async handleBuyTickets () {
      const stripeSession = await ticketService.handleBuyTickets(
        {
          tickets: this.reservedTickets,
          stuff: this.additionalStuff,
        },
        this.id
      );
      window.location = stripeSession.url;
    },

    async fetchTickets () {
      this.tickets = await ticketService.getTicketBySessionId(this.id);
    },

    handleAddStuff () {
      this.isAdditionalOpen = true;
    },

    handleAddStuffSave (stuff) {
      this.additionalStuff = stuff;
      this.isAdditionalOpen = false;
    }
  },

  async created() {
    if (this.$route.query.session_id) {
      const response = await ticketService.completePurchase(
        this.$route.query.session_id
      );
      console.log(response);
    }

    this.fetchTickets();
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