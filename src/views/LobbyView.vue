<template>
  <v-container>
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="playerName"
          :rules="playerNameRules"
          label="Username"
          required
          ></v-text-field>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="apply"
        > apply
        </v-btn>
      </v-form>
    </template>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    playerName: "",
    playerNameRules: [v => !!v || "Player Name is required"],
  }),

  methods:{
    async apply() {

    }
  }
}
</script>

<style scoped>

</style>