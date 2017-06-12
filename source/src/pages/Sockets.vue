<template>
    <div>
        <comp-header title="在线聊天" back='true'></comp-header>
        
        <comp-footer></comp-footer>
    </div>
</template>
<script>
    import Header from "src/components/Header"
    import Footer from "src/components/Footer"
    export default {
        name: "Sockets",
        components: {
            "comp-header": Header,
            "comp-footer": Footer
        }
    }
</script>
<style lang="sass">
</style>