<template>
  <div id="navbar-wrap" class="card-shadow">
    <div id="navbar">
      <h2 @click="$router.push('/')">Cinema City</h2>
      <app-select :filters="filters" @filters-change="filtersChange" />
      <div class="input" v-if="$route.path == '/'">
        <input
          @input="handleInput"
          :value="searchQuery"
          type="text"
          id="name"
          name="name"
          placeholder="Find movie..."
        />
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
      font-size: 20px;
      margin: 0 1rem 0 0;
      color: white;
      cursor: pointer;
    }

    * {
      box-sizing: border-box;
    }

    .input {
      margin-left: auto;

      input {
        width: 100px;
        height: 30px;
        padding-left: 15px;
        margin-right: 30px;
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
        @media screen and (max-width: 503px) {
          width: 150px;
        }
      }
    }
  }
}

@media (max-width: 1067px) {
  #navbar-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  h2 {
    font-size: 20px;
  }
}

@media (max-width: 990px) {
  #navbar-wrap {
    position: fixed;
    width: 100%;
    height: 100px;
  }

  h2 {
    font-size: 15px;
  }
}

@media (max-width: 770px) {
  #navbar-wrap {
    position: fixed;
    width: 100%;
    height: 100px;
  }

  h2 {
    font-size: 12px;
  }
}

@media (max-width: 503px) {
  #navbar-wrap {
    position: fixed;
    width: 100%;
    height: 100px;
  }

  h2 {
    font-size: 11px;
  }
}

@media (max-width: 320px) {
  #navbar-wrap {
    position: fixed;
    width: 100%;
    height: 100px;
  }

  h2 {
    font-size: 10px;
  }
}
</style>
