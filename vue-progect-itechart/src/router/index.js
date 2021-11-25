import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import MoviePreview from '../views/MoviePreview.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/movie-preview/:id',
        name: 'moviePreview',
        component: () => import('../views/MoviePreview'),
         // когда мы хотим передать некоторые свойства нашим компонентам, мы должны сказать, что мы хотим передать свойства
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router