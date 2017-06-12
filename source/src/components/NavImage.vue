<template>
    <div class="nav-image">
        <router-link :to="path">
            <img :src="src" :alt="alt" class="img-rounded nav-img"><br/>
            <span>{{alt}}</span>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: "NavImage",
        props: ["path", "alt", "src"]
    }
</script>
<style lang="sass">
    @import "../assets/css/common";
    .nav-image {
        width: 33%;
        height: 99%;
        text-align: center;
        font-size: 16px;
        display: inline-block;
        padding: 10px 14px;
        a {
            color: #9e9e9e;
        }
        img {
            width: 70px;
            height: 70px;
        }
    }
</style>