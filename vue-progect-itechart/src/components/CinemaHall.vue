<template>
  <div v-if="hall" class="hall">
    <hall-screen />
    <div class="seats-info">
      <div class="seat-info">
        <div class="seat-info__seat">
          <movie-seat />
        </div>
        <span>Свободно</span>
      </div>
      <div class="seat-info">
        <div class="seat-info__seat">
          <movie-seat :is-bought="true" />
        </div>
        <span>Занято</span>
      </div>
    </div>
    <div class="row" v-for="row in hall.rows" :key="row">
      <div class="seat" v-for="seat in row" :key="seat">
        <component
          @click="handleSeatClick(seat)"
          :is="getSeatComponent(seat.type)"
          :is-reserved="!!reservedSeats?.[seat._id]"
          :is-bought="isBought(seat) || isReservedByAnotherClient(seat)"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import SofaSeat from "./Seats/SofaSeat.vue";
import LoveSeat from "./Seats/LoveSeat.vue";
import MovieSeat from "./Seats/MovieSeat.vue";
import HallScreen from "./HallScreen.vue";
import { subscribe } from "../services/socketIo";
import _ from "lodash";

const typeOfSeats = {
  "Movie Seat": MovieSeat,
  "Love Seat": LoveSeat,
  "Sofa Seat": SofaSeat,
};

export default {
  emits: [
    "reserveSeat",
    "unReserveSeat",
    "preReserveSeat",
    "unReserveSeatSilent",
  ],
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
    reservedSeats: {
      type: Object,
      reqiured: true,
    },
    tickets: {
      type: Array,
      required: true,
    },
    hall: {
      type: [Object],
      default: null,
    },
  },
  components: { MovieSeat, HallScreen },
  data() {
    return {
      preReservedTickets: [],
    };
  },
  methods: {
    getSeatComponent(type) {
      return typeOfSeats[type];
    },

    handleSeatClick(seat) {
      if (this.reservedSeats[seat._id]) {
        this.$emit("unReserveSeat", seat);
      } else {
        this.$emit("reserveSeat", seat);
      }
    },

    isBought(seat) {
      return this.tickets.some((ticket) => {
        return ticket.seatId === seat._id && ticket.bought;
      });
    },
    isReservedByAnotherClient(seat) {
      return this.tickets.some((ticket) => {
        return (
          ticket.seatId === seat._id &&
          ticket.reserved &&
          !this.reservedSeats[seat._id]
        );
      });
    },
    actualizeReservedTickets(tickets) {
      const seats = _.flatten(this.hall?.rows); // делает один массив из двухмерного
      tickets.forEach((ticket) => {
        const seat = _.find(seats, { _id: ticket.seatId });
        if (seat) {
          this.$emit("preReserveSeat", seat);
        }
      });
    },

    seatsUnreservedHandler({ tickets }) {
      const seats = _.flatten(this.hall.rows); // делает один массив из двухмерного
      tickets.forEach((ticket) => {
        const seat = _.find(seats, { _id: ticket.seatId });
        if (seat) {
          this.$emit("unReserveSeatSilent", seat, tickets);
        }
      });
    },

    savePrereservedTickets({ tickets }) {
      this.preReservedTickets = tickets;
      this.actualizeReservedTickets(tickets);
    },
  },

  watch: {
    hall() {
      this.actualizeReservedTickets(this.preReservedTickets);
    },
  },

  async created() {
    subscribe("reserved-tickets-sent", this.savePrereservedTickets.bind(this));
    subscribe("seats-unreserved", this.seatsUnreservedHandler.bind(this));
  },
};
</script>

<style lang="scss" scoped>
.hall {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  display: flex;
  height: 50px;
  margin-bottom: 20px;
  justify-content: center;
}

.seat {
  margin-right: 10px;
}

.seats-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: -10px 0px 30px 113px;
}

.seat-info {
  display: flex;
  gap: 10px;

  span {
    color: white;
  }
}

.seat-info__seat {
  width: 20px;
  height: 20px;
}
</style>

