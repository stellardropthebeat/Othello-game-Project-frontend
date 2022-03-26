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
    isBlack: true,
    possibleMoves: []
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
    async putBoard(state, position) {
      let color = "";
      if (state.isBlack) {
        color = "b";
      } else {
        color = "w"
      }
        state.board[position.row][position.col] = color;
        let toFlip = state.possibleMoves[position.move];
        toFlip.forEach((pos) => state.board[pos[0]][pos[1]] = color);
      state.isBlack = !state.isBlack;
      let response = await Vue.axios.post("/api/post-board", {"isBlack": state.isBlack, "board":state.board})
      state.possibleMoves = response.data.possibleMoves;
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
