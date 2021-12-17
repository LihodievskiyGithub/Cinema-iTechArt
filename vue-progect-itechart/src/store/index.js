import { createStore } from 'vuex'
import movies from './modules/movies'
import user from './modules/user'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    user,
  },
});
