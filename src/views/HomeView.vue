<template>
  <v-container>
    <h2>Home Page</h2>
    <ul>
      <li>
        <router-link to="/">Go to Home</router-link>
      </li>
      <li>
        <router-link to="/about">Go to About</router-link>
      </li>
      <li>
        <router-link to="/game">Go to Game</router-link>
      </li>
      <li>
        <router-link to="/login">Go to login</router-link>
      </li>
      <li>
        <router-link to="/lobby">Go to lobby</router-link>
      </li>
    </ul>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",

  components: {},
};
</script>
