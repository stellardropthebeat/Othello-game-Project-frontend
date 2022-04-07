<template>
  <div>
    <v-img
      alt="Waiting room Logo"
      contain
      class="mt-5"
      src="@/assets/waiting-room.png"
      transition="scale-transition"
      width="500"
    />
    <p class="text1">
      Player1: {{ player1 }} <!-- Player1-->
    </p>
    <p class="text2">
      Waiting for Player2 ... {{ player2 }} <!-- Player2-->
    </p>
    <p class="text2" v-if="player2!= null">Game Starting ...</p>

    <v-row align="center">
      <div class="button">
        <v-btn small block @click="leave" color="blue-grey lighten-5">
          Leave Room
        </v-btn>
      </div>
    </v-row>
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
      connected: false,
      gameStart: false
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
    await this.sleep(1000);
    this.send();
  },
  methods: {
    async leave() {
      await Vue.axios.post("/api/leave-room", {
        "username": this.$store.state.username,
        "roomId": this.$store.state.roomId
      });
      //await this.$router.push({path: "/"});
      this.send();
    },
    start() {
      this.send();
    },
    checkPlayerDisabledButton() {
      return this.player1 === undefined || this.player2 === undefined;
    },
    connect() {
      this.socket = new SockJS("/api/waiting-room-socket");
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          console.log(frame);
          this.stompClient.subscribe("/topic/wait/" + this.$store.state.roomId, async tick => {
            console.log(tick.body);
            this.player1 = JSON.parse(tick.body)["player1"];
            this.player2 = JSON.parse(tick.body)["player2"];
            this.gameStart = JSON.parse(tick.body)["canStart"];
            console.log(this.player1);
            console.log(this.player2);
            if (this.player1 == null && this.player2 == null) {
              this.$router.push({ path: "/" });
            }
            if (this.gameStart) {
              // await this.sleep(2000)
              this.$router.push({ path: "/game" });
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
    }
  }

};
</script>

<style scoped>

.button {
  margin: auto;
  padding-top: 50px;
}

div {
  width: fit-content;
  margin: auto;
}

p {
  font-family: 'Bebas Neue', cursive;
  font-family: 'Kanit', sans-serif;
  font-size: 40px;
  font-weight: bold
}

.text2 {
  font-weight: bolder;
  color: violet
}
</style>