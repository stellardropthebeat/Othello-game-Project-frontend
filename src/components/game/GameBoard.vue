<template>
  <div>
    <game-score :blacks="blacks" :whites="whites" />
    <div class="container">
      <div class="row" v-for="(v, row) in board" :key="row">
        <div
          class="cell"
          v-for="(vv, col) in v"
          :key="col"
          @click="put(row, col)"
        >
                    <div v-if="black(row, col)" class="b dot"></div>
                    <div v-if="white(row, col)" class="w dot"></div>
        </div>
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
      board: [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""]
      ],
      blacks: 2,
      whites: 2
    };
  },
  mounted() {
    this.board[3][3] = "w";
    this.board[3][4] = "b";
    this.board[4][3] = "b";
    this.board[4][4] = "w";
    this.$forceUpdate();
  },
  methods: {
    count() {
      this.blacks = 0;
      this.whites = 0;
      for (let r = 0; r < 8; r++) {
        this.blacks += this.board[r].filter((disc) => disc === "b").length;
        this.whites += this.board[r].filter((disc) => disc === "w").length;
      }
    },
    put(r, c) {
      console.log(r, c);
      if (this.board[r][c] === "") {
        if (this.isBlack) {
          this.board[r][c] = "b";
        } else {
          this.board[r][c] = "w";
        }
        this.isBlack = !this.isBlack;
        this.count();
        this.$forceUpdate();
      }
    },
    black(r, c) {
      return this.board[r][c] === "b";
    },
    white(r, c) {
      return this.board[r][c] === "w";
    }
  }
};
</script>

<style scoped>
.cell {
  display: inline-block;
  background-color: rgb(216, 216, 216);
  border: solid 1px white;
  padding: 5px;
  width: 60px;
  height: 60px;
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

.container {
  margin: auto;
  width: 500px;
}

.row {
  display: grid;
  grid-template-columns: repeat(8, auto);
  margin: 0;
}
</style>
