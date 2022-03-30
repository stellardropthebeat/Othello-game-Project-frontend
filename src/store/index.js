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
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "", "", "", "w", "b", "", "", "",
      "", "", "", "b", "w", "", "", "",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", ""
    ],
    possibleMoves: [],
    isBlack: true,

    // (Bam) add the following as a reminder for usage in the future
    turn: -1,
    roomNumber: -1,
    isYourTurn: false
  },
  getters: {
    getIsLoggedIn(state) {
      return state.isLoggedIn;
    }
  },
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
        color = "w";
      }
      state.board[position.i] = color;
      let toFlip = state.possibleMoves[position.move];
      toFlip.forEach((pos) => state.board[pos] = color);
      state.isBlack = !state.isBlack;
      let response = await Vue.axios.post("/api/post-board", { "isBlack": state.isBlack, "board": state.board });
      // if there is no possible move skip a turn
      if (response.data.possibleMoves === undefined) {
        state.isBlack = !state.isBlack;
        response = await Vue.axios.post("/api/post-board", { "isBlack": state.isBlack, "board": state.board });
      }
      state.possibleMoves = response.data.possibleMoves;
    },
    resetBoard(state) {
      state.board = [
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "w", "b", "", "", "",
        "", "", "", "b", "w", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", ""
      ];
      state.isBlack = true;
      state.possibleMoves = [];
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
    },
    resetBoard({ commit }) {
      commit("resetBoard");
    }
  },
  modules: {}
});
