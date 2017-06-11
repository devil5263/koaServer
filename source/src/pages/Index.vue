<template>
  <div>
    <comp-header title="首页" back=true></comp-header>
    
    <comp-footer></comp-footer>
  </div>
</template>
<script>
  import Header from "src/components/Header"
  import Footer from "src/components/Footer"
  export default {
    name: "Index",
    data () {
      return {
        
      }
    },
    components: {
      "comp-header": Header,
      "comp-footer": Footer
    }
  }
</script>
<style lang="sass">
  @import "../assets/css/common.sass";
  .index-hot-content {
    width: 100%;
    height: auto;
  }
</style>