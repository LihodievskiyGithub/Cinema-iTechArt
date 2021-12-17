<template>
  <div id="navbar-wrap" class="card-shadow">
    <div id="navbar">
      <h2 @click="$router.push('/')">Cinema Ticket Reservation</h2>
      <div>
        <app-select :filters="filters" @filters-change="filtersChange" />
      </div>
      <div v-if="$route.path == '/'">
        <div class="input">
          <input
            @input="handleInput"
            :value="searchQuery"
            type="text"
            id="name"
            name="name"
            placeholder="Find movie..."
          />
        </div>
      </div>
      <button v-if="token" @click="logout">Logout</button>
      <router-link class="link" v-else to="/Signup">SignIn</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppSelect from "../components/AppSelect.vue";

export default {
  emits: ["filtersChange"],
  props: {
    filters: {
      type: Object,
    },
    searchQuery: {
      type: String,
      required: true,
    },
  },
  components: {
    AppSelect,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    handleInput(ev) {
      this.$emit("searchChange", ev.target.value);
    },
    logout() {
      // очищаем токен из vuex
      localStorage.removeItem("token");
      this.setToken(null);
    },
    ...mapActions("user", ["setToken"]),

    filtersChange(value) {
      this.$emit("filtersChange", value);
    },
  },
  computed: {
    // лежит токен из вьюкса
    ...mapGetters("user", ["token"]),
  },

  watch: {
    token() {
      console.log(this.token);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway:300);

.link {
  background: rgb(78, 76, 76);
  color: #ccc;
  width: 100px;
  height: 30px;
  border: 0;
  font-size: 18px;
  border-radius: 100px;
  font-family: "Raleway", sans-serif;
  transition: 0.6s;
  overflow: hidden;
  text-decoration: none;
  &:focus {
    outline: 0;
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    width: 60px;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0.5;
    filter: blur(30px);
    transform: translateX(-100px) skewX(-15deg);
  }
  &:hover {
    background: #338033;
    cursor: pointer;
    &:before {
      transform: translateX(300px) skewX(-15deg);
      opacity: 0.6;
      transition: 0.7s;
    }
  }
  &:after {
    transform: translateX(300px) skewX(-15deg);
    opacity: 1;
    transition: 0.7s;
  }
}

button {
  background: rgb(78, 76, 76);
  color: #ccc;
  width: 100px;
  height: 30px;
  border: 0;
  font-size: 18px;
  border-radius: 100px;
  font-family: "Raleway", sans-serif;
  transition: 0.6s;
  overflow: hidden;
  &:focus {
    outline: 0;
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    width: 60px;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0.5;
    filter: blur(30px);
    transform: translateX(-100px) skewX(-15deg);
  }
  &:hover {
    background: #338033;
    cursor: pointer;
    &:before {
      transform: translateX(300px) skewX(-15deg);
      opacity: 0.6;
      transition: 0.7s;
    }
  }
  &:after {
    transform: translateX(300px) skewX(-15deg);
    opacity: 1;
    transition: 0.7s;
  }
}

#navbar-wrap {
  position: fixed;
  width: 100%;
  z-index: 9999;

  #navbar {
    display: flex;
    padding: 15px;
    justify-content: space-between;
    background-color: #a34c01;

    h2 {
      margin: 0 1rem 0 0;
      color: white;
      cursor: pointer;
    }

    & > div {
      display: flex;
      flex-grow: 2;
      justify-content: flex-end;
    }

    * {
      box-sizing: border-box;
    }
    .input {
      width: auto;
      float: right;
      margin-right: 30px;
    }
    input {
      width: 100px;
      height: 30px;
      padding-left: 15px;
      border-radius: 42px;
      border: 2px solid #324b4e;
      background: #f9f0da;
      outline: none;
      position: relative;
      transition: 0.3s linear;
    }
    input:focus {
      width: 200px;
      border-color: #dc143c;
    }
  }
}
</style>
