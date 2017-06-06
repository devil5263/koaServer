<template>
  <footer>
    <!--<img  src="../assets/imges/template/todo.png">
    <img  src="../assets/imges/template/home.png">
    <img  src="../assets/imges/template/user.png">-->
    <span class="glyphicon glyphicon-calendar"></span>
    <span class="glyphicon glyphicon-home"></span>
    <span class="glyphicon glyphicon-user"></span>
  </footer>
</template>
<script>
  export default {
    name: "Footer",
  }
</script>
<style lang="sass">
  @import "../assets/css/common";
  footer {
    position: absolute;
    padding: 8px 10px;
    bottom: 0px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #ffffff;
    display: flex;
    justify-content: space-around;
    background-color: $base-bg;
  }
  footer span {
    font-size: 26px;
    text-align: center
  }
</style>