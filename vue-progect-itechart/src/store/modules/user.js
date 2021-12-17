const state = {
  user: "",
  token: null,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

const actions = {
  setToken({ commit }, token) {
    commit("setToken", token);
  },
};

const getters = {
  token(state) {
    return state.token;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
