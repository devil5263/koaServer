<template>
    <div>
        <comp-header title="热门微博" back='true'></comp-header>
        <div class="list-group">
            <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">List group item heading</h4>
                <p class="list-group-item-text">...</p>
            </a>
            <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">List group item heading</h4>
                <p class="list-group-item-text">...</p>
            </a>
            <a href="#" class="list-group-item">
                <h4 class="list-group-item-heading">List group item heading</h4>
                <p class="list-group-item-text">...</p>
            </a>
        </div>
        <comp-footer></comp-footer>
    </div>
</template>
<script>
    import Header from "src/components/Header"
    import Footer from "src/components/Footer"
    export default {
        name: "BlogHot",
        components: {
            "comp-header": Header,
            "comp-footer": Footer
        }
    }
</script>
<style lang="sass">
</style>