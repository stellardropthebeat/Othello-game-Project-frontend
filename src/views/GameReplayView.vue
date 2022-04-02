<template>
  <div class="container">
    <game-score :blacks="blacks" :whites="whites" />
    <div class="grid">
      <div class="cell" v-for="(n, i) in 64" :key="i" @click="put(i)">
        <div v-if="black(i)" class="b dot"></div>
        <div v-if="white(i)" class="w dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import GameScore from "@/components/game/GameScore";

export default {
  name: "GameReplayView",
  components: { GameScore },
  data() {
    return {
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
      blacks: 0,
      whites: 0,
      finished: false
    };
  },
  async mounted() {
    let turn = 1;
    while (!this.finished) {
      await this.sleep(500);
      let response = await Vue.axios.post("/api/replay", { "turn": turn, "username": this.$store.state.username });
      this.board = response.data.board;
      this.finished = response.data.finished;
      this.$forceUpdate();
      this.count();
      turn++;
    }
    alert("End of Game")
  },
  methods: {
    count() {
      this.blacks = this.board.filter((disc) => disc === "b").length;
      this.whites = this.board.filter((disc) => disc === "w").length;
    },
    black(i) {
      return this.board[i] === "b";
    },
    white(i) {
      return this.board[i] === "w";
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(8, 55px);
  grid-template-rows: repeat(8, 55px);
  margin: auto;
  width: fit-content;
}

.cell {
  display: inline-block;
  background-color: rgb(216, 216, 216);
  border: solid 1px white;
  padding: 6px;
  overflow: hidden;
}

.dot {
  display: inline-block;
  border-radius: 50%;
  margin: auto;
  align-content: center;
  height: 40px;
  width: 40px;
  box-shadow: 1px 1px;
}

.b {
  background-color: black;
}

.w {
  background-color: white;
}
</style>