<template>
  <v-container>
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
