<template>
  <div v-if="movie" class="movie-info-container">
    <img :src="movie.poster" alt="Movie poster" />
    <div class="movie-info-1">
      <!-- <i class="fas fa-video"></i> -->
        <h3>
          <i class="fas fa-video"></i>
          {{ movie.name }}
        </h3>
        
      <!-- <i v-if="hall" class="fas fa-map-marker-alt"> {{ hall }} </i> -->
      <h3 v-if="hall">
        <i class="fas fa-map-marker-alt"></i>
        {{ hall }}
      </h3>
    </div>
    <div class="movie-info-2">
      <h3>
        <strong>
          <i class="fas fa-film"></i>
          {{ movie.genre }}
        </strong>
      </h3>
      <h3>
        <strong>
          <i class="far fa-star"></i>
          {{ movie.year }}
        </strong>
      </h3>
    </div>
  </div>
</template>

<script>
import moviesService from "../services/movies";
import ratingMixin from "../mixin/getRatingColor";

export default {
  mixins: [ratingMixin],
  props: {
    id: {
      type: [Number, String],
      default: null,
    },
    hall: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      movie: null,
    };
  },

  watch: {
    id() {
      this.fetchMovie();
    },
  },

  methods: {
    async fetchMovie() {
      try {
        this.movie = await moviesService.getMovieById(this.id);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.movie-info-container {
  display: flex;
  border-bottom: 1px solid grey;
  margin: 0px 50px;
  align-items: center;
  justify-content: space-between;

  .movie-info-1 {
    // font-size: 20px;
    margin: 0px 20px;
    color: white;

    .fas {
      font-weight: 700;
    }

    .fa-video::before {
      color: #c06f1e;
      margin: 0px 10px;
    }

    .fa-map-marker-alt::before {
      color: #c06f1e;
      margin: 0px 10px;
    }
  }

  .movie-info-2 {
    color: white;

    .fa-film {
      color: #c06f1e;
      margin: 0px 10px;
    }

    .fa-star {
      color: #c06f1e;
      margin: 0px 10px;
    }
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 5px;
    margin: 20px 0px;
  }

  .movie-rating {
    color: white;
    width: 20px;
    height: 20px;
  }
}
</style>