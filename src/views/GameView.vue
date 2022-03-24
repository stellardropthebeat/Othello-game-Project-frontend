<template>
  <v-container class="container">
    <game-deco />
    <game-board />
  </v-container>
</template>

<script>
import GameBoard from "@/components/game/GameBoard";
import GameDeco from "@/components/game/GameDeco"

export default {
  components: {
    GameBoard,
    GameDeco
  }
};
</script>

<style>
.container {
  /*margin-left: 15%;*/
  /*margin-right: 15%;*/
}
</style>