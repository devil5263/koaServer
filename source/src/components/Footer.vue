<template>
  <footer>
    <span v-on:click="switchPage('todo')" :class="selected === 'todo'?'footer-selected':''" class="glyphicon glyphicon-calendar"></span>
    <span v-on:click="switchPage('home')" :class="selected === 'home'?'footer-selected':''" class="glyphicon glyphicon-home"></span>
    <span v-on:click="switchPage('user')" :class="selected === 'user'?'footer-selected':''" class="glyphicon glyphicon-user"></span>
  </footer>
</template>
<script>
  export default {
    name: "Footer",
    data () {
      return {
        selected: "home"
      }
    },
    methods: {
      switchPage: function (page) {
        this.selected = page;
      }
    }
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
  .footer-selected {
    color: #607D8B;
  }
</style>