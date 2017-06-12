import Vue from "vue";
import Router from "vue-router";
import Error from "src/pages/Error";
import Index from "src/pages/Index";
import BlogHot from "src/pages/BlogHot";
import Message from "src/pages/Message";
import Sockets from "src/pages/Sockets";
import Checken from "src/pages/Checken";
import Record from "src/pages/Record";
import Todo from "src/pages/Todo";
import User from "src/pages/User";
import Lagou from "src/pages/Lagou";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/",
      name: "Error",
      component: Error
    },
    {
      path: "/bloghot",
      name: "BlogHot",
      component: BlogHot
    },
    {
      path: "/message",
      name: "Message",
      component: Message
    },
    {
      path: "/socket",
      name: "Socket",
      component: Sockets
    },
    {
      path: "/checken",
      name: "Checken",
      component: Checken
    },
    {
      path: "/record",
      name: "Record",
      component: Record
    },
    {
      path: "/todo",
      name: "Todo",
      component: Todo
    },
    {
      path: "/user",
      name: "User",
      component: User
    },
    {
      path: "/lagou",
      name: "Lagou",
      component: Lagou
    }
  ]
});
