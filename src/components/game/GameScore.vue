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
  color: rgb(90, 89, 88);
  width: fit-content;
  position: relative;
  left: 46.5%;
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
