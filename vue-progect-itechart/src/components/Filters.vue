<template>
  <div v-if="token">
    <h5>{{ username }}</h5>
    <h5>{{ email }}</h5>
  </div>
  <div id="filters">
    <h3>Filters</h3>
    <div class="icons-0">
      <p
        class="active"
        v-for="(filter, idx) in filters"
        :key="idx"
        @click="applyFilter(filter)"
      >
        {{ filter.name }}
        <!-- <v-icon :name="filter.icon" /> -->
        <!-- <span class="icons"> -->
        <i :class="filter.icon"></i>
        <!-- </span> -->
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  emits: ["sortChanged"],
  props: {
    sort: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      username: "",
      email: "",
      filters: [
        {
          name: "Rating highest",
          key: "rating",
          order: "desc",
          icon: "fas fa-thumbs-up",
        },
        {
          name: "Rating lowest",
          key: "rating",
          order: "asc",
          icon: "fas fa-thumbs-down",
        },
        // {
        //   name: "Year oldest",
        //   key: "year",
        //   order: "desc",
        //   icon: "fas fa-comment"
        // },
        // {
        //   name: "Year newest",
        //   key: "year",
        //   order: "asc",
        //   icon: "fas fa-camera",
        // },
      ],
    };
  },
  // выводим имя и email на фронт
  methods: {
    ...mapActions("user", ["setUser"]),

    // обращаемся к каждому элементу массива из action
    applyFilter(filter) {
      this.$emit("sortChanged", filter);
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.setUser(res.data.user);
        this.username = res.data.user.username;
        this.email = res.data.user.email;
      });
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

<style lang='scss' scoped>
h5 {
  color: white;
}
#filters {
  text-align: center;
  color: rgb(143, 143, 143);
  cursor: pointer;
}

.icons {
  position: relative;
}

i {
  position: absolute;
  top: 25%;
  right: 2px;
}

.active:hover i {
  opacity: 0;
  transition: all 0.6s ease-in-out;
}

// .active:hover {
// 	color: #E6E6FA;
// 	transition: .3s linear;
// 	border-bottom: 1px solid rgb(170, 86, 86);
// }

.active {
  display: block;
  width: 150px;
  height: 35px;
  margin: 10px 0;
  background: #696969;
  border: 1px solid #000;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  text-align: center;

  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  -webkit-transform: translateX(-90%);
  -moz-transform: translateX(-90%);
  -ms-transform: translateX(-90%);
  -o-transform: translateX(-90%);
  transform: translateX(-90%);
}

.active:hover {
  -webkit-transform: translateX(0%);
  -moz-transform: translateX(0%);
  -ms-transform: translateX(0%);
  -o-transform: translateX(0%);
  transform: translateX(0%);
}
</style>