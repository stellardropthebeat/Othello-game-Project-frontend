<template>
  <v-data-table
      :headers="headers"
      :items="details"
      :items-per-page="5"
      class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'Lobby Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Host Name', value: 'host_name' },
      ],
      details: [
        {
          name: 'Player 1 lobby',
          host_name: "Player 1",
        },
        {
          name: 'Player 2 lobby',
          host_name: "Player 2",
        },
        {
          name: 'Player 3 lobby',
          host_name: "Player 3",
        },
        {
          name: 'Player 4 lobby',
          host_name: "Player 4",
        },
        {
          name: 'Player 5 lobby',
          host_name: "Player 5",
        },
        {
          name: 'Player 6 lobby',
          host_name: "Player 6",
        },
        {
          name: 'Player 7 lobby',
          host_name: "Player 7",
        },
        {
          name: 'Player 8 lobby',
          host_name: "Player 8",
        },
        {
          name: 'Player 9 lobby',
          host_name: "Player 9",
        },
        {
          name: 'Player 10 lobby',
          host_name: "Player 10",
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>