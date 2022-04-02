<template>
  <div class="container">
    <h1 class="mt-4 text-center">Leaderboard</h1>
    <table class="table mt-5 box">
      <thead>
      <tr>
        <th scope="col" class="column">#</th>
        <th scope="col" class="column">Name</th>
        <th scope="col" class="column">Score</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(entry, i) in allScores" :key="i">
        <th scope="row">{{ ++i }}</th>
        <td>{{ entry[0] }}</td>
        <td>{{ entry[1] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data: () => ({ name: "", score: "", allScores: [] }),
  computed: {
  },
  async mounted() {
    let response = await Vue.axios.get("/api/leaderboard");
    this.allScores = response.data.userList
    console.log(response.data.userList)
  },
  methods: {
    async onEntry() {
      let response = await Vue.axios.get("/api/leaderboard");
      this.allScores=response.data.userList
      console.log(response.data.userList)
    },
  },
};
</script>

<style scoped>
.column {
  margin: auto;
  padding: 50px;
}
.box {
  margin: auto;
}


</style>