<template>
  <div id="movie-container">
    <movie v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script>
import Movie from "./Movie";
import moviesService from "../services/movies";
import _debounce from "lodash/debounce";


export default {
  props: {
    filters: {
      type: Object,
    },
    searchQuery: {
      type: String,
      required: true,
    },
    sort:{
      type: Object,
      required: true,
    }
  },
  components: {
    Movie,
  },
  data() {
    return {
      movies: [],
      //   myMovies: [],
    };
  },
  //   computed: {
  //     // выводим список через computed св-во
  //     movies() {
  //       return this.$store.getters.getMovies;
  //     },
  //   },
  methods: {
    async fetchMovies() {
      try {
        const params = {};
        
        if (this.sort.key && this.sort.order) {
          params.sortField = this.sort.key;
          params.sortOrder = this.sort.order;
        }
        if (this.searchQuery) {
          params.query = this.searchQuery;
        }
        Object.keys(this.filters).forEach((key) => {
          if (this.filters[key]) {
            params[key] = this.filters[key]
          }
        })
        this.movies = await moviesService.getMovies(params);
      } catch (err) {
        console.log(err);
      }
    },

    debouncedFetchMovies: _debounce(function () {
      this.fetchMovies();
    }, 500),

    // searchFilms () {
    //   moviesService.searchMovie(this.search);
    //   console.log(this.search);
    // }
  },
  watch: {
    searchQuery() {
      this.debouncedFetchMovies();
    },
    sort() {
      this.fetchMovies();
    },
    filters() {
      this.fetchMovies();
    }
  },
  created() {
    this.fetchMovies();
  },
  // created () { // или через массив и хук жизненного цикла
  // 	this.movies = this.$store.getters.getMovies
  // }
  // НЕ БУДЕТ РАБОТАТЬ С ПОИСКОМ ... вызываем фильмы на нашем created () , что означает, что это будет запускаться только один раз, потому что наш компонент создается только один раз.
};
</script>

<style lang='scss' scoped>
#movie-container {
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 2;
  justify-content: center;
}
</style>
