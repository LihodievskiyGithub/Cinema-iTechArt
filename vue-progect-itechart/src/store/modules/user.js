const state = {
  user: null,
  token: null,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },

  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  setToken({ commit }, token) {
    commit("setToken", token);
  },

  setUser({ commit }, user) {
    commit("setUser", user);
  },
};

const getters = {
  token(state) {
    return state.token;
  },

  user(state) {
    return state.user;
  },

  isAdmin(state) {
    return state.user?.isAdmin;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
