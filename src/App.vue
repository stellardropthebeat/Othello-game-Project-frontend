<template>
  <v-app>
    <v-app-bar app color="gray" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        OTHELLO

<!--        <v-img-->
<!--          alt="Vuetify Name"-->
<!--          class="shrink mt-1 hidden-sm-and-down"-->
<!--          contain-->
<!--          min-width="100"-->
<!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"-->
<!--          width="100"-->
<!--        />-->
      </div>

      <v-spacer></v-spacer>

      <v-btn tile color="grey darken-1" @click="logout">
        <v-icon left>mdi-logout</v-icon>
        LOGOUT
      </v-btn>

    </v-app-bar>

    <v-main class="blue-grey lighten-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";

export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    async logout () {
      let response = await Vue.axios.get("/api/logout");
      if (response.data.success) {
      this.$router.push({ path: "/LoginView"})
      }
    },
  },
};
</script>

