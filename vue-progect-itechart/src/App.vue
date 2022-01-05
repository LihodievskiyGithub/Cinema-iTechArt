<template>
  <router-view />
</template>

<script>
import {mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('user', ['setToken'])
  },
  created() {
    // достаем токен из хранилища и передаем в vuex
   const token = localStorage.getItem('token')
   this.setToken(token)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');

body {
  background-color: #222b31;
  margin: 0;
}

.m-0 {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  font-family: 'Montserrat', sans-serif;
}
// .card-shadow {
//   -webkit-box-shadow: 0px 5px 5px 0px rgba(8, 8, 8, 0.5);
//   -moz-box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.5);
//   box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.5);
// }
</style>
