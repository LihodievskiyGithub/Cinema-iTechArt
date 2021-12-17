<template>
  <modal @close="$emit('close')">
    <template v-slot:header>
      <h3 class="m-0">Create new movie</h3>
    </template>
    <template v-slot:body>
      <form @submit.prevent ref="movieForm" id="movie-form">
        <p>Fill out the details bellow</p>

        <input type="text" v-model="name">
        <select v-model="cinema" name="" id="">
          <option value="" hidden disabled selected>Cinema</option>
          <option :value="option" v-for="option in cinemas" :key="option">
            {{ option.name }}
          </option>
        </select>

        <div v-if="step === 1">
          <input
            @change="handleRowsChange"
            required
            v-model="rowsCount"
            type="number"
            placeholder="Rows"
          />
          <button id="update-movie" @click="nextStep">Next</button>
        </div>
        <div v-if="step === 2">
          <div v-for="(row, id) in seatsCount" :key="id">
            <input
              required
              v-model="row.value"
              type="number"
              placeholder="Seats"
            />
          </div>
          <button id="update-movie" @click="nextStep">Next</button>
        </div>
        <div v-if="step === 3">
          <div v-for="row in seating" :key="row">
            Row: {{ row }}
            <div v-for="seat in row.seats" :key="seat">
              <select v-model="seat.type" name="" id="">
                <option value="" hidden disabled selected>Seat type</option>
                <option :value="option" v-for="option in options" :key="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>
          <button @click="saveHall" >Save</button>
        </div>
      </form>
    </template>
  </modal>
</template>

<script>
import Modal from "./Modal.vue";
import cinemaService from "../services/cinema";
import hallsService from "../services/hall";



export default {
  components: { Modal },
  data() {
    return {
      cinema: "",
      name: "",
      step: 1,
      rowsCount: 1,
      cinemas: [],
      seating: [],
      seatsCount: [],
      options: ["Movie Seat", "Love Seat", "Sofa Seat"],
    };
  },
  methods: {
    nextStep() {
      if (this.step == 2) {
        this.seating = this.seatsCount.map((count) => {
          const seats = [];
          for (let i = 0; i < count.value; i++) {
            seats.push({ type: "Movie Seat" });
          }
          return { seats };
        });
      }

      if (this.step !== 3) {
        this.step++;
      }
    },
    handleRowsChange() {
      this.seatsCount = [];
      if (this.rowsCount > 0) {
        for (let i = 0; i < this.rowsCount; i++) {
          this.seatsCount.push({ value: 5 });
        }
      }
    },

    async fetchCinemas() {
      try {
        this.cinemas = await cinemaService.getCinemas();
      } catch (err) {
        console.log(err);
      }
    },
    saveHall(){
        const data= {
            name: this.name,
            cinema: this.cinema._id,
            rows: this.seating,
        }
        hallsService.addHall(data);
    }
  },

  created() {
      this.fetchCinemas();
  }
};
</script>

<style>
</style>