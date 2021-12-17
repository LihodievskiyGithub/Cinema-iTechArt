<template>
  <div id="sidebar">
    <filters  :sort="sort"  @sort-changed="sortChanged"/>
    <button @click="showModal = true">Add movie</button>

    <modal v-if="showModal" @close="showModal = !showModal">
      <template v-slot:header>
        <h3 class="m-0">Create new movie</h3>
      </template>
      <template v-slot:body>
        <form @submit.prevent="addMovie" ref="movieForm" id="movie-form">
          <p>Fill out the details bellow</p>
          <input required v-model="form.name" type="text" placeholder="Name" />
          <input
            required
            v-model="form.year"
            type="number"
            placeholder="Year"
          />
          <input
            required
            v-model="form.rating"
            type="number"
            placeholder="Rating"
          />
          <input
            required
            v-model="form.genre"
            type="text"
            placeholder="Genre"
          />
          <input
            required
            v-model="form.budget"
            type="text"
            placeholder="Budget"
          />
          <input
            required
            v-model="form.boxOffice"
            type="text"
            placeholder="Box Office"
          />
          <input
            required
            v-model="form.poster"
            type="text"
            placeholder="Poster"
          />
          <hr />
          <div>
            <div id="actor-input">
              <p class="m-0">Actors</p>
              <span @click="addActor" class="add-actor">+</span>
            </div>

            <input
              required
              v-for="(actor, index) in form.actors"
              :key="index"
              v-model="form.actors[index].name"
              type="text"
              placeholder="Actor"
            />
          </div>

          <hr />

          <textarea
            required
            v-model="form.storyline"
            placeholder="Storyline"
            rows="6"
          />

          <button id="add-movie">Add</button>
        </form>
      </template>
      <template v-slot:footer>
        <!-- movieForm - name of our ref -->
      </template>
    </modal>
  </div>
</template>

<script>
import Filters from "./Filters.vue";
import Modal from "./Modal.vue";
import moviesService from "../services/movies";

export default {
  emits: ['sortChanged'],
  props: {
    sort:{
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      form: {
        name: "",
        year: "",
        rating: "",
        genre: "",
        budget: "",
        boxOfice: "",
        poster: "",
        actors: [{ name: "" }],
        storyline: "",
      },
    };
  },
  methods: {
    addActor() {
      this.form.actors.push({ name: "" });
    },
    // addMovie (e) {
    // 	e.preventDefault()()

    // 	console.log('SUBMIT', this.form);
    // 	// call an action inside our store
    // 	this.$store.dispatch('addMovie', this.form);
    // 	this.showModal = false;
    // }
    addMovie() {
      moviesService.addMovie(this.form);
      this.showModal = false;
      // console.log(this.form);
    },
    sortChanged(sort) {
      this.$emit('sortChanged', sort)
    }
  },
  components: {
    Filters,
    Modal,
  },
};
</script>

<style lang='scss' scoped>
#sidebar {
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-height: 100vh;
  min-width: 150px;
  max-width: 150px;
  flex-grow: 1;
  background-color: #191c1f;
  justify-content: left;

  & > button {
    margin-top: 20px;
    height: 30px;
    background-color: #5eb85e;
    border: none;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 10px;
    outline: none;
    cursor: pointer;
  }
  & > button:hover {
    color: white;
    background-color: #a34c01;
    transition: 0.3s linear;
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

  #add-movie {
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