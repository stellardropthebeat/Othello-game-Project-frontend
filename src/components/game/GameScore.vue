<template>
  <div class="score">
    <h1 class="btext">{{ blacks }}</h1>
    <h1>&nbsp; : &nbsp;</h1>
    <h1 class="wtext">{{ whites }}</h1>
  </div>
</template>

<script>
export default {
  props: ["blacks", "whites"],
};
</script>

<style scoped>
.score {
  margin-bottom: 20px;
  color: rgb(90, 89, 88);
}
h1 {
  display: inline;
}
.btext {
  color: black;
}
.wtext {
  /*color: white;*/
}
</style>
