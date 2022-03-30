<template>
  <div>
    <div class="half-circle left border-left" v-if="this.isBlack"><h3>Your Turn</h3></div>
    <div class="half-circle left" v-else ></div>
    <div class="half-circle right border-right" v-if="!this.isBlack"><h3 >Your Turn</h3></div>
    <div class="half-circle right" v-else></div>
  </div>
</template>

<script>
export default {
  props: ["isBlack"]
}
</script>

<style scoped>
.half-circle {
  display: inline-block;
  position: absolute;
  top: 18%;
  width: 200px;
  height: 400px;
  /*z-index: -100;*/

  filter: alpha(opacity=90);
  -moz-opacity: 0.9;
  opacity: 0.9;

  border: 10px solid #CFD8DC;
}

.left {
  left: 0;
  border-bottom-right-radius: 200px;
  border-top-right-radius: 200px;
  background-color: black;
  border-left: 0;
}

.right {
  right: 0;
  border-bottom-left-radius: 200px;
  border-top-left-radius: 200px;
  background-color: white;
  border-right: 0;
}
.left h3 {
  color: white;
  position: relative;
  top: 50%;
  left: 10%;
}
.right h3 {
  color: #363636;
  position: relative;
  top: 50%;
  left: 50%;
}
.border-left{
  border: 10px solid rgb(90, 245, 248);
  /*border: 10px solid aqua;*/
  border-left: 0;
}
.border-right{
  border: 10px solid rgb(90, 245, 248);
  /*border: 10px solid aqua;*/
  border-right: 0;
}
</style>
