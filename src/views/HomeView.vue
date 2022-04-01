<template>
  <v-container>

    <v-img
        alt="Vuetify Logo"
        class="logo"
        contain
        src="@/assets/othello-logo.png"
        transition="scale-transition"
        width="500"
    />

    <v-row align="center" justify="space-around">
      <v-col sm="6">
        <div class="button">
          <v-btn large block @click="gotoAbout" color="blue-grey lighten-5">
            ABOUT
          </v-btn>
        </div>

        <div class="button">
          <v-btn large block @click="gotoLobby" color="blue-grey lighten-5">
            JOIN ROOM
          </v-btn>
        </div>


      </v-col>
    </v-row>



    <ul>

      <li>
        <router-link to="/game">Go to Game</router-link>
      </li>

    </ul>



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
      this.$router.push({path: "/waiting"})
    },
  },
};
</script>

<style scoped>
.logo {
  margin: auto;
  padding-bottom: 100px;
}

.button {
  margin: auto;
  padding-bottom: 30px;
}

</style>

