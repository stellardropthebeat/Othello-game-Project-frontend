<template>
  <v-container>
     <h1>
       How to play Othello
     </h1>
    <v-divider></v-divider>
    <v-card-text>
      Othello is a strategy board game for two players (Black and White), played on an 8 by 8 board. The game traditionally begins with four discs placed in the middle of the board as shown below. Black moves first.
    </v-card-text>
    <v-img
        alt="Vuetify Logo"
        class="logo"
        contain
        src="@/assets/othello1.png"
        transition="scale-transition"
        width="350"
    />
    <v-card-text>
      Black must place a black disc on the board, in such a way that there is at least one straight (horizontal, vertical, or diagonal) occupied line between the new disc and another black disc, with one or more contiguous white pieces between them. In the starting position, Black has the following 4 options indicated by translucent discs
    </v-card-text>

    <v-divider>
    </v-divider>

    <v-card-text>
      After placing the disc, Black flips all white discs lying on a straight line between the new disc and any existing black discs. All flipped discs are now black. If Black decides to place a disc in the topmost location, one white disc gets flipped, and the board now looks like this
    </v-card-text>
    <v-img
        alt="Vuetify Logo"
        class="logo"
        contain
        src="@/assets/othello2.png"
        transition="scale-transition"
        width="350"
    />
    <v-card-text>
      Now White plays. This player operates under the same rules, with the roles reversed. White lays down a white disc, causing black discs to flip. Possibilities at this time would be as shown in the image above.
    </v-card-text>

    <v-divider>
    </v-divider>

    <v-card-text>
      If White plays the bottom left option and flips one disc.
    </v-card-text>
    <v-img
        alt="Vuetify Logo"
        class="logo"
        contain
        src="@/assets/othello3.png"
        transition="scale-transition"
        width="350"
    />
    <v-card-text>
      Players alternate taking turns. If a player does not have any valid moves, play passes back to the other player. When neither player can move, the game ends. A game of Othello may end before the board is completely filled.

      The player with the most discs on the board at the end of the game wins. If both players have the same number of discs, then the game is a draw.
    </v-card-text>

    <v-divider></v-divider>

    <v-row align="center" justify="space-around">
      <v-col sm="6">
        <div class="button">
          <v-btn large block color="blue-grey lighten-5" href="https://en.wikipedia.org/wiki/Reversi">
            WIKI
          </v-btn>
        </div>

        <div class="button">
          <v-btn large block color="blue-grey lighten-5" @click="gotoMenu">
            Back to Menu
          </v-btn>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>


<script>
export default {
  components: {},

  methods: {
    gotoMenu() {
      this.$router.push({path: "/"})
    },
  },
};
</script>

<style scoped>
.logo {
  margin: auto;
  padding-bottom: 50px;
}

.button {
  margin: auto;
  padding-bottom: 20px;
  padding-top: 20px;
}

</style>
