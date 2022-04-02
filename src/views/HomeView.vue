<template>
  <v-container>

    <v-img
        alt="Vuetify Logo"
        class="homeLogo"
        contain
        src="@/assets/othello-logo.png"
        transition="scale-transition"
        width="500"
    />

    <v-row align="center" justify="space-around">
      <v-col sm="6">
        <div class="button">
          <v-btn large block @click="gotoAbout" color="blue-grey lighten-5">
            HOW TO PLAY OTHELLO
          </v-btn>
        </div>

        <div class="button">
          <v-btn large block @click="gotoLobby" color="blue-grey lighten-5">
            JOIN ROOM
          </v-btn>
        </div>

        <div class="button">
          <v-btn large block color="blue-grey lighten-5" @click="gotoReplay">
            REPLAY LATEST GAME
          </v-btn>
        </div>

        <div class="button">
          <v-btn large block color="blue-grey lighten-5" @click="gotoLeaderboard">
            LEADERBOARD
          </v-btn>
        </div>

        <div class="button">
          <v-btn large block color="blue-grey lighten-5" @click="gotoCredit">
            CREDIT
          </v-btn>
        </div>


      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
export default {
  name: "HomeView",

  components: {},

  methods: {
    gotoAbout() {
      this.$router.push({path: "/about"})
    },
    async gotoLobby() {
      let response = await Vue.axios.post("/api/join-room", {
        "username": this.$store.state.username}
      );
      this.$store.state.roomId = response.data.availableRoom;
      console.log(this.$store.state.roomId);
      await this.$router.push({path: "/waiting"})
    },
    gotoLeaderboard() {
      this.$router.push({path: "/leaderboard"})
    },
    gotoCredit() {
      this.$router.push({path: "/credit"})
    },
    gotoReplay() {
      this.$router.push({path: "/replay"})
    }
  },
};
</script>

<style scoped>
.homeLogo {
  margin: auto;
  padding-bottom: 100px;
}

.button {
  margin: auto;
  padding-bottom: 30px;
}

</style>

