<template>
  <div>
    <comp-header title="首页" back=true></comp-header>
    <div class="jumbotron index-text-area">
      <div class="container">
        <ul class="list-group">
          <li class="index-list-hot" v-for="hot in hots"><span style="color:#2196f3">HOTS: </span>{{hot}}</li>
          <li class="index-list-todo" v-for="todo in todos"><span style="color:red">TODOS: </span>{{todo}}</li>
        </ul>
      </div>
    </div>
    <div class="nav-content">
      <comp-navimage  v-for="nav in navs" :src="nav.src" :path="nav.path" :alt="nav.alt"></comp-navimage>
    </div>
    <comp-footer></comp-footer>
  </div>
</template>
<script>
  import Header from "src/components/Header"
  import Footer from "src/components/Footer"
  import NavImage from "src/components/NavImage"
  export default {
    name: "Index",
    data () {
      return {
        navs: [{
          src: require("../assets/imges/template/hot.png"),
          path: "#",
          alt: "微博热门"
        },{
          src: require("../assets/imges/template/work.png"),
          path: "#",
          alt: "拉钩数据"
        },{
          src: require("../assets/imges/template/message.png"),
          path: "#",
          alt: "定时短信"
        },{
          src: require("../assets/imges/template/socket.png"),
          path: "#",
          alt: "在线聊天"
        },{
          src: require("../assets/imges/template/talk.png"),
          path: "#",
          alt: "小黄鸡聊天"
        },{
          src: require("../assets/imges/template/record.png"),
          path: "#",
          alt: "记事本"
        }],
        hots: ["microblog hots 1","microblog hots 2","microblog hots 3"],
        todos: ["you should done some thing today","you should done some thing today"]
      }
    },
    components: {
      "comp-header": Header,
      "comp-footer": Footer,
      "comp-navimage": NavImage
    }
  }
</script>
<style lang="sass">
  @import "../assets/css/common.sass";
  .index-hot-content {
    width: 100%;
    height: auto;
  }
  .index-text-area {
    width: 99%;
    height: 220px;
    margin: 10px 0px 10px 0px;
    border-radius: 5px;
    box-shadow: 0px 5px 5px 0px rgba(134, 125, 125, 0.4);
    padding: 10px 0px 10px 0px;
    li {
      border: 0px;
      border-bottom: 1px solid #ddd;
      padding: 4px 0px;
      color: #9e9e9e;
    }
  }
  .nav-content {
    width: 99%;
    padding: 5px 0px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 5px 5px 0px rgba(134, 125, 125, 0.4);
  }
</style>