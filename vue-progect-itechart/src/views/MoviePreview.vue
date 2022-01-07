<template>
  <button-back />

  <div id="movie-preview">
    <!-- <navbar /> -->

    <div id="movie-container" v-if="movie">
      <div id="movie-poster" class="movie-poster">
        <div class="movie-poster__img">
          <img :src="movie.poster" alt="Movie poster" />
        </div>

        <div class="movie-poster__container">
          <button @click="showModal = true" class="movie-poster__button">
            <img src="../assets/images/edit.svg" />
          </button>
          <button @click="deleteMovie" class="movie-poster__button">
            <img src="../assets/images/delete.svg" />
          </button>

          <div class="add-block">
            <button @click="addList = !addList" class="add-block__button">
              <img src="../assets/images/add.svg" />
            </button>
            <ul :class="{ active: addList }" class="add-block__list">
              <li class="add-block__item">
                <button
                  class="add-block__item-button"
                  @click="showModalSession = true"
                >
                  Add Session
                </button>
              </li>
              <li class="add-block__item">
                <button
                  class="add-block__item-button"
                  @click="showHallModal = true"
                >
                  Add hall
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div id="movie-info">
        <div>
          <h1>{{ movie.name }}</h1>
          <h3> <strong>{{ movie.year }}</strong></h3>
          <h3> <strong>{{ movie.genre }}</strong></h3>
          <h3>
            <span
              id="movie-rating"
              :style="{ 'background-color': raitingColor }"
              >{{ movie.rating }}</span
            >
          </h3>

          <h3> <strong>Budget:</strong> {{ movie.budget }}</h3>
          <h3> <strong>Box office:</strong> {{ movie.boxOffice }}</h3>
          <h3>
            <strong>Actors: </strong>
            <span v-for="(actor, index) in movie.actors" :key="index">{{
              actor.name
            }}</span>
          </h3>
          <h3>
            <strong>Storyline:  </strong>
            {{ movie.storyline }}
          </h3>
        </div>
        <div id="options"></div>
      </div>
    </div>

    <modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <h3 class="m-0">Create new movie</h3>
      </template>
      <template v-slot:body>
        <form @submit.prevent="updateMovie" ref="movieForm" id="movie-form">
          <p>Fill out the details bellow</p>
          <input
            required
            v-model="copyMovie.name"
            type="text"
            placeholder="Name"
          />
          <input
            required
            v-model="copyMovie.year"
            type="number"
            placeholder="Year"
          />
          <input
            required
            v-model="copyMovie.rating"
            type="number"
            placeholder="Rating"
          />
          <input
            required
            v-model="copyMovie.budget"
            type="text"
            placeholder="Budget"
          />
          <input
            required
            v-model="copyMovie.poster"
            type="text"
            placeholder="Poster"
          />
          <input
            required
            v-model="copyMovie.boxOffice"
            type="text"
            placeholder="Box Office"
          />

          <hr />

          <div>
            <div id="actor-input">
              <p class="m-0">Actors</p>
              <span @click="addActor" class="add-actor">+</span>
            </div>

            <input
              required
              v-for="(actor, index) in copyMovie.actors"
              :key="index"
              v-model="copyMovie.actors[index].name"
              type="text"
              placeholder="Actor"
            />
          </div>

          <hr />

          <textarea
            required
            v-model="copyMovie.storyline"
            placeholder="Storyline"
            rows="6"
          />
          <button id="update-movie" @click="updateMovie()">Save</button>
        </form>
      </template>
      <template v-slot:footer>
        <button id="update-movie" @click="$refs.movieForm.requestSubmit()">
          Save
        </button>
      </template>
    </modal>
  </div>

  <div class="session">
    <div class="session-item" v-for="session in sessions" :key="session._id">
      <!-- <p>Sessions:</p> -->
      <div class="session-info">
        <div>Cinema: {{ session.cinema.name }}</div>
        City: {{ session.city.cityName }}
        <div>Date: {{ session.date.month }}</div>
        Time: {{ session.time.time }}
        <button class="project__item-cross" @click="deleteSession(session._id)">
          <span></span>
          <span></span>
        </button>
      </div>
      <custom-button title="Buy Ticket" @click="toHall(session._id)" />
    </div>
    <modal v-if="showModalSession" @close="showModalSession = false">
      <template v-slot:header>
        <h3 class="m-0">Create new movie</h3>
      </template>
      <template v-slot:body>
        <form @submit.prevent ref="movieForm" id="movie-form">
          <p>Form for add session</p>

          <input required v-model="form.time" type="text" placeholder="Time" />
          <input required v-model="form.date" type="text" placeholder="Date" />

          <select v-model="form.city" name="" id="">
            <option value="" hidden disabled selected>City</option>
            <option :value="option" v-for="option in cities" :key="option">
              {{ option.cityName }}
            </option>
          </select>
          <select v-model="form.cinema" name="" id="">
            <option value="" hidden disabled selected>Cinemas</option>
            <option :value="option" v-for="option in cinemas" :key="option">
              {{ option.name }}
            </option>
          </select>
          <select :disabled="!halls.length" v-model="form.hall" name="" id="">
            <option value="" hidden disabled selected>Hall</option>
            <option :value="option" v-for="option in halls" :key="option">
              {{ option.name }}
            </option>
          </select>

          <hr />

          <button id="update-movie" @click="addSession()">Save</button>
        </form>
      </template>
      <template v-slot:footer> </template>
    </modal>

    <hall-modal v-if="showHallModal" @close="showHallModal = false" />
  </div>
</template>

<script>
// import Navbar from "../components/Navbar.vue";
import ratingMixin from "../mixin/getRatingColor";
import Modal from "../components/Modal.vue";
import ButtonBack from "../components/ButtonBack.vue";
import CustomButton from "../components/CustomButton.vue";
import HallModal from "../components/HallModal.vue";
import moviesService from "../services/movies";
import movieSessionsService from "../services/sessions";
import cityService from "../services/city";
import cinemaService from "../services/cinema";
import hallsService from "../services/hall";

import _cloneDeep from "lodash/cloneDeep";

export default {
  mixins: [ratingMixin],
  components: {
    // Navbar,
    Modal,
    ButtonBack,
    CustomButton,
    HallModal,
  },
  //пропс из index.js (роутинг)
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
    searchQuery: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      addList: false,
      showHallModal: false,
      showModal: false,
      showModalSession: false,
      movie: null,
      copyMovie: null,
      sessions: [],
      cities: [],
      cinemas: [],
      halls: [],
      form: {
        hall: "",
        cinema: "",
        time: "",
        date: "",
        city: "",
      },
    };
  },
  methods: {
    async updateMovie() {
      // this.$store.dispatch('updateMovie', this.movie)
      await moviesService.updateMovie(this.id, this.copyMovie);
      this.movie = _cloneDeep(this.copyMovie);
      this.showModal = false;
    },
    deleteMovie() {
      // this.$store.dispatch('deleteMovie', parseInt(this.id))
      moviesService.deleteMovie(this.id);
      this.$router.push("/");
    },
    async fetchMovie() {
      try {
        this.movie = await moviesService.getMovieById(this.id);
        this.copyMovie = _cloneDeep(this.movie);
      } catch (err) {
        console.log(err);
      }
    },

    async fetchSessions() {
      try {
        this.sessions = await movieSessionsService.getSessions(this.id);
        console.log(this.sessions);
      } catch (err) {
        console.log(err);
      }
    },
    async addSession() {
      const data = {
        movie: this.id,
        // ...this.form,
        cinema: this.form.cinema._id,
        city: this.form.city._id,
        date: this.form.date,
        time: this.form.time,
        hall: this.form.hall._id,
      };
      const dataFilm = {
        cinema: this.form.cinema,
        city: this.form.city,
        date: {
          month: this.form.date,
          _id: 1,
        },
        time: {
          time: this.form.time,
          _id: 11,
        },
        hall: this.form.hall,
      };
      try {
        const response = await movieSessionsService.addSession(data);

        this.sessions.push({ ...dataFilm, _id: response._id });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      this.showModalSession = false;

      console.log(this.form);
    },
    deleteSession(sessionId) {
      movieSessionsService.deleteSession(sessionId);
      this.sessions = this.sessions.filter(
        (session) => session._id !== sessionId
      );
    },

    async fetchCities() {
      try {
        this.cities = await cityService.getCity();
      } catch (err) {
        console.log(err);
      }
    },

    async fetchCinemas() {
      try {
        this.cinemas = await cinemaService.getCinemas();
      } catch (err) {
        console.log(err);
      }
    },
    async fetchHalls(cinemaId) {
      try {
        this.halls = await hallsService.getHallsByCinemaId(cinemaId);
      } catch (err) {
        console.log(err);
      }
    },
    toHall(sessionId) {
      this.$router.push({
        name: "Reservation",
        params: { id: sessionId },
      });
    },
  },

  watch: {
    "form.cinema": function (val) {
      if (!val) {
        this.halls = [];
        return;
      }
      this.fetchHalls(val._id);
    },
  },

  created() {
    // call from store
    // console.log("ID: ", typeof this.id)
    // this.movie = this.$store.getters.getMovieById(parseInt(this.id))
    this.fetchMovie();
    this.fetchSessions();
    this.fetchCinemas();
    this.fetchCities();
  },
};
</script>

<style lang='scss' scoped>
.add-block {
  position: relative;
  width: 23px;
  height: 23px;
  margin-left: auto;

  &__button {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0;
    cursor: pointer;

    img {
      height: 100%;
      object-fit: contain;
    }
  }
  &__list {
    position: absolute;
    top: 27px;
    right: 0;
    background: #ffffff;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 200px;
    opacity: 0;
    visibility: hidden;
    overflow: hidden;
    border-radius: 15px;
    transition: all 0.4s ease-in-out;
    z-index: 1;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }

  &__item {
    height: 25px;
    border-bottom: 1px solid #000;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      .add-block__item-button {
        background: #000;
        color: #fff;
      }
    }

    &-button {
      height: 100%;
      width: 100%;
      padding: 0;
      background: transparent;
      border: none;
      outline: none;
      font-weight: 500;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
}

.movie-poster {
  max-width: 350px;

  &__container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__img {
    width: 100%;
    margin-bottom: 16px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0px -12px 24px 0px rgba(66, 68, 90, 1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__button {
    background: transparent;
    border: none;
    outline: none;
    width: 23px;
    height: 23px;
    padding: 0;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.session-item {
  margin: 0 20px;
}

.session-info {
  margin-bottom: 5px;
  border-bottom: red solid 1px;
}

.session {
  display: flex;
  justify-content: flex-start;
  margin: 35px 70px;
  color: white;
}
.project__item-cross {
  position: relative;
  width: 10px;
  height: 10px;
  display: flex;
  flex-direction: column;
  background: transparent;
  border: none;
  cursor: pointer;
}

.project__item-cross span {
  position: absolute;
  top: -67px;
  left: 150px;
  width: 100%;
  height: 1px;
  background: rgb(0, 0, 0);
}

.project__item-cross span:first-child {
  transform: translateY(50%) rotate(45deg);
  background-color: red;
}

.project__item-cross span:last-child {
  transform: translateY(50%) rotate(-45deg);
  background-color: red;
}

#movie-preview {
  display: flex;
  // overflow: auto;

  #movie-container {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    margin-top: 100px;
    padding: 0 1rem;

    #movie-poster {
      flex-basis: calc(35% - 10px);
      padding-right: 25px;
    }

    #movie-info {
      display: flex;
      flex-basis: calc(65% - 10px);
      padding-left: 10px;
      text-align: left;
      flex-direction: column;
      justify-content: space-between;

      h1 {
        color: white;
        margin-bottom: 2rem;
      }

      h3 {
        color: DarkGray;

        strong {
          color: white;
          border-bottom: 1px solid white;
        }

        #movie-rating {
          display: flex;
          justify-content: center;
          border-radius: 10px;
          font-size: 20px;
          width: 53px;
          color: white;
        }

        span {
          margin-right: 5px;
        }
      }

      #options {
        max-width: 180px;
        display: flex;
        justify-content: flex-between;
        margin-top: 1rem;
        margin-bottom: 1rem;

        .edit {
          margin: 0 15px 0 15px;
          height: 30px;
          width: 80px;
          background-color: #5eb85e;
          border: none;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 10px;
          outline: none;
          cursor: pointer;
        }

        .edit:hover {
          border: red;
        }

        .delete {
          height: 30px;
          width: 80px;
          background-color: #e10505;
          border: none;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 10px;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }

  #movie-form {
    display: flex;
    flex-direction: column;
    text-align: left;

    & > div {
      display: flex;
      flex-direction: column;

      #actor-input {
        display: flex;
        justify-content: space-between;
      }
    }

    .add-actor {
      background-color: green;
      text-align: center;
      color: white;
      margin-left: 5px;
      height: 100%;
      padding: 2px 10px;
      font-size: 20px;
      padding: 1re;
      align-self: center;
      cursor: pointer;
    }
  }

  #update-movie {
    background-color: #5eb85e;
    border: none;
    padding: 5px;
    width: 70px;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    text-transform: uppercase;
    outline: none;
  }
}
</style>