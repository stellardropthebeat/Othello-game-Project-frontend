<template>
  <div>
    <game-score :blacks="blacks" :whites="whites" />
    <div class="container">
      <div class="row" v-for="(v, row) in $store.state.board" :key="row">
        <div
          class="cell"
          v-for="(vv, col) in v"
          :key="col"
          @click="put(row, col)"
        >
          <div v-if="black(row, col)" class="b dot"></div>
          <div v-if="white(row, col)" class="w dot"></div>
          <div v-if="isValidMove(row, col)[0] " class="move dot"></div>
        </div>
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
    this.count()
    let response = await Vue.axios.post("/api/post-board", {
      "isBlack": store.state.isBlack,
      "board": store.state.board
    });
    store.state.possibleMoves = response.data.possibleMoves;
  },
  methods: {
    count() {
      this.blacks = 0;
      this.whites = 0;
      for (let r = 0; r < 8; r++) {
        this.blacks += store.state.board[r].filter((disc) => disc === "b").length;
        this.whites += store.state.board[r].filter((disc) => disc === "w").length;
      }
    },
    put(r, c) {
      let move = this.isValidMove(r, c);
      if (move[0] && store.state.board[r][c] === "") {
        store.dispatch("putBoard", { "row": r, "col": c, "move": move[1]});
        this.count();
        this.$forceUpdate();
      }
    },
    black(r, c) {
      return store.state.board[r][c] === "b";
    },
    white(r, c) {
      return store.state.board[r][c] === "w";
    },
    isValidMove(r, c) {
      let ret = [false, ""];
      if (store.state.possibleMoves === undefined) {
          this.count();
          if (this.whites > this.blacks) {
            alert("White won!!")
          } else {
            alert("Black won!!")
          }
          this.$router.push("/");
          store.dispatch("resetBoard");
      }
      else {
        let moves = Object.keys(store.state.possibleMoves);
        moves.forEach((function(elem) {
          // This comes out as string [r, c]
          let p_row = elem[1];
          let p_col = elem[4];
          if (r == p_row && c == p_col) {
            ret = [true, elem];
          }
        }));
        return ret
      }
    },
  }
};
</script>

<style scoped>
.container {
  margin: auto;
  width: fit-content;
  display: grid;
  grid-template-rows: repeat(8, 55px);
  padding: 0 ;
  /*border: black 2px solid;*/
}

.row {
  display: grid;
  grid-template-columns: repeat(8, auto);
  margin: 0;
}
.cell {
  display: inline-block;
  background-color: rgb(216, 216, 216);
  border: solid 1px white;
  padding: 6px;
  width: 55px;
  height: 55px;
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
