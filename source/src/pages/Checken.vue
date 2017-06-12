<template>
    <div>
        <comp-header title="小黄鸡" back='true'></comp-header>
        
        <comp-footer></comp-footer>
    </div>
</template>
<script>
    import Header from "src/components/Header"
    import Footer from "src/components/Footer"
    export default {
        name: "Checken",
        components: {
            "comp-header": Header,
            "comp-footer": Footer
        }
    }
</script>
<style lang="sass">
</style>