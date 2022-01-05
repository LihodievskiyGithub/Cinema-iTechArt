<template>
  <div class="hall">
    <div class="row" v-for="row in hall.rows" :key="row">
      <div class="seat" v-for="seat in row" :key="seat">
        <component
          @click="handleSeatClick(seat)"
          :is="getSeatComponent(seat.type)"
          :is-reserved="!!reservedSeats?.[seat._id]"
          :is-bought="isBought(seat)"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import SofaSeat from "./Seats/SofaSeat.vue";
import LoveSeat from "./Seats/LoveSeat.vue";
import MovieSeat from "./Seats/MovieSeat.vue";
import hallService from "../services/hall";

const typeOfSeats = {
  "Movie Seat": MovieSeat,
  "Love Seat": LoveSeat,
  "Sofa Seat": SofaSeat,
};

export default {
  emits: ["reserveSeat", "unReserveSeat"],
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
  },
  // components: {SofaSeat, LoveSeat, MovieSeat},
  data() {
    return {
      hall: {
        rows: [],
      },
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
      return this.tickets.some((ticket) =>{
        return ticket.seatId === seat._id && ticket.bought;
      })
    }
  },
  async created() {
    const hall = await hallService.getHallBySessionId(this.id);
    this.hall = hall;
  },
};
</script>

<style scoped>
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
</style>

