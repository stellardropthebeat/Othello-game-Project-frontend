<template>
  <div class="container">
    <game-score :blacks="blacks" :whites="whites" />
    <div class="grid">
      <div class="cell" v-for="i in 64" :key="i" @click="put(i)">
        <div v-if="black(i)" class="b dot"></div>
        <div v-if="white(i)" class="w dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GameScore from "./GameScore.vue";

export default {
  components: { GameScore },
  data() {
    return {
      isBlack: true,
      board: Array(64),
      blacks: 2,
      whites: 2
    };
  },
  mounted() {
    this.board[28] = "w";
    this.board[29] = "b";
    this.board[36] = "b";
    this.board[37] = "w";
    this.$forceUpdate();
  },
  methods: {
    count() {
      this.blacks = this.board.filter((disc) => disc === "b").length;
      this.whites = this.board.filter((disc) => disc === "w").length;
    },
    put(i) {
      console.log(i);
      if (this.board[i] === undefined) {
        if (this.isBlack) {
          this.board[i] = "b";
        } else {
          this.board[i] = "w";
        }
        this.isBlack = !this.isBlack;
        this.count();
        this.$forceUpdate();
      }
    },
    black(i) {
      return this.board[i] === "b";
    },
    white(i) {
      return this.board[i] === "w";
    }
  }
};
</script>

<style scoped>
.grid {
  display: inline-grid;
  grid-template-columns: repeat(8, 55px);
  grid-template-rows: repeat(8, 55px);
  border: 4px solid black;
}

.cell {
  display: inline-block;
  background-color: rgb(216, 216, 216);
  border: solid 1px white;
  padding: 5px;
}

.dot {
  display: inline-block;
  border-radius: 50%;
  margin: auto;
  align-content: center;
  height: 40px;
  width: 40px;
  box-shadow: 0.5px 0.5px;
}

.b {
  background-color: black;
}

.w {
  background-color: white;
}
</style>
