<template>
  <div>
    <comp-header title="首页" back=true></comp-header>
    <ul class="list-group index-hot-content">
      <li class="list-group-item">Cras justo odio</li>
      <li class="list-group-item">Dapibus ac facilisis in</li>
      <li class="list-group-item">Morbi leo risus</li>
      <li class="list-group-item">Porta ac consectetur ac</li>
      <li class="list-group-item">Vestibulum at eros</li>
    </ul>
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