<template>
  <div class="home">
    <navbar :search-query="searchQuery" :filters="filters" @searchChange="handleSearchChange" @filters-change="filtersChange" />
    <div id="main-section">
      <sidebar :sort="sort" @sort-changed="sortChanged" />
      <movie-list :search-query="searchQuery" :sort="sort" :filters="filters" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import MovieList from "../components/MovieList.vue";

export default {
  name: "Home",
  data() {
    return {
      filters: {
        cinema: "",
        city: "",
        date: "",
        time: "",
      },
      searchQuery: "",
      sort: {},
    };
  },
  components: {
    Navbar,
    Sidebar,
    MovieList,
  },
  created() {
    // user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  methods: {
    handleSearchChange(query) {
      this.searchQuery = query;
      console.log(query);
    },
    sortChanged(sort) {
      this.sort = sort;
    },
    filtersChange(value) {
      this.filters = value;
      console.log(value)
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;

  #main-section {
    display: flex;
    margin-top: 50px;
  }
}
</style>