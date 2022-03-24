<template>
  <v-container class="container">
    <game-board />
  </v-container>
</template>

<script>
import GameBoard from "@/components/game/GameBoard";

export default {
  components: {
    GameBoard
  }
};
</script>

<style>
.container {
  margin-left: 15%;
  margin-right: 15%;
}
</style>