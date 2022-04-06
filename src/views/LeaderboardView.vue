<template>
  <div class="container mt-10 pb-10">
    <v-img
      alt="leaderboard logo"
      contain
      class="mt-5"
      src="@/assets/leaderboard.png"
      transition="scale-transition"
      width="550"
    />
    <table class="table mt-3 box">
      <thead>
      <tr>
        <th scope="col" class="column">#</th>
        <th scope="col" class="column">Name</th>
        <th scope="col" class="column">Score</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(entry, i) in allScores" :key="i">
        <th scope="row" class="text-center">{{ ++i }}</th>
        <td class="text-center">{{ entry[0] }}</td>
        <td class="text-center">{{ entry[1] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  data: () => ({ name: "", score: "", allScores: [] }),
  computed: {},
  async mounted() {
    let response = await Vue.axios.get("/api/leaderboard");
    this.allScores = response.data.userList;
    console.log(response.data.userList);
  },
  methods: {
    async onEntry() {
      let response = await Vue.axios.get("/api/leaderboard");
      this.allScores = response.data.userList;
      console.log(response.data.userList);
    }
  }
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

div {
  margin: auto;
  background-color: #eeeeee;
  width: 75%;
  border-radius: 50px;
  padding-bottom: 5px;
}

</style>