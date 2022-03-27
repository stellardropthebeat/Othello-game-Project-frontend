<template>
  <div class="container">
    <game-score :blacks="blacks" :whites="whites" />
    <div class="grid">
      <div class="cell" v-for="(n, i) in 64" :key="i" @click="put(i)">
        <div v-if="black(i)" class="b dot"></div>
        <div v-if="white(i)" class="w dot"></div>
        <div v-if="isValidMove(i)[0] " class="move dot"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GameScore from "./GameScore.vue";
import store from "@/store";
import Vue from "vue";

export default {
  components: { GameScore },
  data() {
    return {
      isBlack: true,
      blacks: 0,
      whites: 0
    };
  },
  async mounted() {
    this.count();
    let response = await Vue.axios.post("/api/post-board", {
      "isBlack": store.state.isBlack,
      "board": store.state.board
    });
    store.state.possibleMoves = response.data.possibleMoves;
  },
  methods: {
    count() {
      this.blacks = store.state.board.filter((disc) => disc === "b").length;
      this.whites = store.state.board.filter((disc) => disc === "w").length;
    },
    put(i) {
      let move = this.isValidMove(i);
      if (move[0] && store.state.board[i] === "") {
        store.dispatch("putBoard", { "i": i, "move": move[1] });
        this.count();
        this.$forceUpdate();
      }
    },
    black(i) {
      return store.state.board[i] === "b";
    },
    white(i) {
      return store.state.board[i] === "w";
    },
    isValidMove(i) {
      this.isGameOver()
      let ret = [false, ""];
      let moves = Object.keys(store.state.possibleMoves);
      moves.forEach((function(move) {
        // move is key of map(String)
        if (i == move) {
          ret = [true, move];
        }
      }));
      return ret;
    },
      isGameOver() {
        if (store.state.possibleMoves === undefined) {
          this.count();
          if (this.whites > this.blacks) {
            alert("White won!!");
          } else {
            alert("Black won!!");
          }
          this.$router.push("/");
          store.dispatch("resetBoard");
        }
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

.move {
  border: #807d7d solid 1px;
  box-shadow: 0 0;
}

.b {
  background-color: black;
}

.w {
  background-color: white;
}
</style>
