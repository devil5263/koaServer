<template>
  <header>
    <span v-on:click="backHandle" :class="back === 'false'?'back-hidden':''" class="glyphicon glyphicon-menu-left back"></span>
    <span>{{title}}</span>
  </header>
</template>
<script>
  export default {
    name: "Header",
    props: ["title", "back"],
    methods: {
      backHandle: function() {
        window.history.go(-1)
      }
    }
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
    .back {
      float: left;
      transform: translate(10px, 10px)
    }
    .back-hidden {
      display: none;
    }
  }
</style>