<template>
  <v-container>
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-col>
          <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="Username"
              required
              filled
              rounded
              dense
          ></v-text-field>

          <v-text-field
              type="paswword"
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
              filled
              rounded
              dense
          ></v-text-field>
        </v-col>


        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
        > Login
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset</v-btn>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  data: () => ({
    valid: true,
    username: "",
    password: "",
    usernameRules: [v => !!v || "Username is required"],
    passwordRules: [v => !!v || "Password is required"],
  }),

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        //submit to backend to authenticate
        let formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);

        let response = await Vue.axios.post("/api/login", formData);
        if (response.data.success) {
          this.$router.push({ path: "/"})
        }
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
