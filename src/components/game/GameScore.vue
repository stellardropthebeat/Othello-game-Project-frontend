<template>
  <div class="score">
    <h1 class="b">{{ blacks }}</h1>
    <h1>&nbsp; : &nbsp;</h1>
    <h1 class="w">{{ whites }}</h1>
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
  margin: auto;
  padding: 5px;
}
h1 {
  display: inline;
}
.b {
  color: black;
}
.w {
  color: white;
}
</style>
