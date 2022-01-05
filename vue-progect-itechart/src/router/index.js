import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../components/Signup'
import Login from "../components/Login";
import CinemaHall from "../components/CinemaHall.vue";
import SeatsPrice from "../components/Prices/SeatsPrice.vue";
import Reservation from "../views/Reservation";
// import MoviePreview from '../views/MoviePreview.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie-preview/:id",
    name: "moviePreview",
    component: () => import("../views/MoviePreview"),
    // когда мы хотим передать некоторые свойства нашим компонентам, мы должны сказать, что мы хотим передать свойства
    props: true,
  },
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/CinemaHall/:id",
    name: "CinemaHall",
    component: CinemaHall,
    props: true,
  },
  {
    path: "/SeatsPrice",
    name: "SeatsPrice",
    component: SeatsPrice,
    props: true,
  },
  {
    path: "/Reservation/:id",
    name: "Reservation",
    component: Reservation,
    props: true,
  },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router