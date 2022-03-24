import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null,
    name: null,
    role: "",
    board: [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "w", "b", "", "", ""],
      ["", "", "", "b", "w", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""]
    ],
    isBlack: true
  },
  getters: {},
  mutations: {
    setIsLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setName(state, name) {
      state.name = name;
    },
    setRole(state, role) {
      state.role = role;
    },
    putBoard(state, position) {
      if (state.isBlack) {
        state.board[position.row][position.col] = "b";
      } else {
        state.board[position.row][position.col] = "w";
      }
      state.isBlack = !state.isBlack;
    }
  },
  actions: {
    setLoggedInUser({ commit }, payload) {
      commit("setIsLoggedIn", payload.loggedIn);
      commit("setUsername", payload.username);
      commit("setName", payload.name);
      commit("setRole", payload.role);
    },
    clearUser({ commit }) {
      commit("setIsLoggedIn", false);
      commit("setUsername", null);
      commit("setName", null);
      commit("setRole", "");
    },
    putBoard({ commit }, position) {
      commit("putBoard", position);
    }
  },
  modules: {}
});
