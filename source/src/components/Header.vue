<template>
  <header>
    <span v-if="back == true" class="glyphicon glyphicon-menu-left"></span>
    <span>{{title}}</span>
  </header>
</template>
<script>
  export default {
    name: "Header",
    props: ["title", "back"]
  }
</script>
<style lang="sass">
  @import "../assets/css/common";
  header {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #ffffff;
    background-color: $base-bg;
  }
</style>