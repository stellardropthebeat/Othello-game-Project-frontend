import Vue from "vue";
import Vuex from "vuex";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null,
    name: null,
    role: "",

    // (Bam) add the following as a reminder for usage in the future
    roomId: 1,
    color: "",
    player1: null,
    player2: null,
    connected: false
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
    connect(state) {
      state.socket = new SockJS("http://localhost:8081/waiting-room-socket");
      state.stompClient = Stomp.over(state.socket);
      state.stompClient.connect(
        {},
        frame => {
          state.connected = true;
          console.log(frame);
          state.stompClient.subscribe("/topic/wait/" + state.roomId, tick => {
            console.log("ffffffffffffffffffffffffffffffffff")
            console.log(tick.body);
            state.player1 = JSON.parse(tick.body)["player1"];
            state.player2 = JSON.parse(tick.body)["player2"];
            // if(state.player1===undefined && state.player2===undefined){
            //   this.$router.push({path: "/"})
            // }
          });
        },
        error => {
          console.log(error);
          state.connected = false;
        }
      );
    },
    send(state) {
      if (state.stompClient && state.stompClient.connected) {
        const obj = {roomId: state.roomId};
        state.stompClient.send("/app/room/" + state.roomId, JSON.stringify(obj), {});
        console.log(state.player1)
      }
    },
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
    connect({commit}){
      commit("connect");
    },
    send({commit}){
      commit("send")
    }
  },
  modules: {}
});
