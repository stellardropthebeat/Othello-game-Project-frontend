<template>
  <div>
    <div class="half-circle left"><h3>Your Turn</h3></div>
    <div class="half-circle right"></div>
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

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  filter: alpha(opacity=80);
  -moz-opacity: 0.8;
  opacity: 0.8;
}

.left {
  left: 0;
  border-bottom-right-radius: 200px;
  border-top-right-radius: 200px;
  /*border-left: 0;*/
  background-color: black;
  border: 10px solid rgb(97, 210, 214);
  border-left: 0;
}

.right {
  right: 0;
  border-bottom-left-radius: 200px;
  border-top-left-radius: 200px;
  border-right: 0;
  background-color: white;
}
.left h3 {
  color: white;
  position: relative;
  top: 50%;
}
</style>
