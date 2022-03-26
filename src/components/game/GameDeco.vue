<template>
  <div>
    <div class="half-circle left"></div>
    <div class="half-circle left border-left" v-if="this.$store.state.isBlack"><h3>Your Turn</h3></div>
    <div class="half-circle right"></div>
    <div class="half-circle right border-right" v-if="!this.$store.state.isBlack"><h3 >Your Turn</h3></div>
  </div>
</template>

<style scoped>
.half-circle {
  display: inline-block;
  position: absolute;
  top: 20%;
  width: 200px;
  height: 400px;
  /*z-index: -100;*/

  /*-webkit-box-sizing: border-box;*/
  /*-moz-box-sizing: border-box;*/
  /*box-sizing: border-box;*/

  filter: alpha(opacity=90);
  -moz-opacity: 0.9;
  opacity: 0.9;
}

.left {
  left: 0;
  border-bottom-right-radius: 200px;
  border-top-right-radius: 200px;
  background-color: black;
}

.right {
  right: 0;
  border-bottom-left-radius: 200px;
  border-top-left-radius: 200px;
  background-color: white;
}
.left h3 {
  color: white;
  position: relative;
  top: 50%;
  left: 10%;
}
.right > h3 {
  color: #282828;
  position: relative;
  top: 50%;
  left: 50%;
}
.border-left{
  border: 10px solid aqua;
  border-left: 0;
}
.border-right{
  border: 10px solid aqua;
  border-right: 0;
}
</style>
