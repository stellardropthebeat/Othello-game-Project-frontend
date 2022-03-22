import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null,
    name: null,
    role: "",
  },
  getters: {},
  mutations: {},
  actions: {
    setLoggedInUser(state, payload) {
      state.isLoggedIn = payload.loggedIn;
      state.username = payload.username;
      state.name = payload.name;
      state.role = payload.role;
    },
    clearUser(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.name = null;
      state.role = "";
    },
  },
  modules: {},
});
