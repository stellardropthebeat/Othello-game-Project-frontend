<template>
  <div>
    {{ player1 }} <!-- Player1-->
    {{ player2 }} <!-- Player2-->
    <button type="button" @click="start">Start Game</button>
    <button id="leave" class="btn btn-primary" type="button" @click="leave">Leave Lobby</button>
  </div>
</template>

<script>
import Vue from "vue";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export default {
  name: "WaitingView",
  data() {
    return {
      player1: null,
      player2: null,
      send_message: null,
      connected: false
    };
  },
  async created() {
    let response = await Vue.axios.post("/api/post-room", {
      "roomId": this.$store.state.roomId
    });

    this.player1 = response.data.player1;
    this.player2 = response.data.player2;
    console.log(this.player1);
    console.log(this.player2);
    this.connect();
    await this.sleep(50);
    this.send();
  },
  methods: {
    async leave() {
      await Vue.axios.post("/api/leave-room", {
        "username": this.$store.state.username,
        "roomId": this.$store.state.roomId
      });
      await this.$router.push({path: "/"});
      this.send();
    },
    start() {
      this.$router.push({ path: "/game" });
    },
    checkPlayerDisabledButton() {
      return this.player1 === undefined || this.player2 === undefined;
    },
    connect() {
      this.socket = new SockJS("http://localhost:8081/waiting-room-socket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          console.log(frame);
          this.stompClient.subscribe("/topic/wait/" + this.$store.state.roomId, tick => {
            console.log(tick.body);
            this.player1 = JSON.parse(tick.body)["player1"];
            this.player2 = JSON.parse(tick.body)["player2"];
            if(this.player1==null && this.player2==null){
              this.$router.push({path: "/"})
            }
          });
        },
        error => {
          console.log(error);
          this.connected = false;
        }
      );
    },
    send() {
      if (this.stompClient && this.stompClient.connected) {
        const obj = { roomId: this.$store.state.roomId };
        this.stompClient.send("/app/room/" + this.$store.state.roomId, JSON.stringify(obj), {});
      }
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  }

};
</script>

<style scoped>
button {
  margin: 5px;
  padding: 5px;
  color: white;
  background-color: cadetblue;
}
</style>