import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Home from "pages/Home.vue";
import Detail from "pages/Detail.vue";

Vue.use(VueRouter); // 使用 vue-router

// 配置路由信息
const routes = [
  {path: "/home", component: Home,  name: "Home",
    children: [
      {path: "detail", component: Detail,  name: "Detail"}
    ]
  },
  // 通配符 * 会匹配所有路径
  {path: '*', redirect: { name: 'Home' }},
];

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

// 启动一个 Vue 应用
new Vue({
  el: "#app",
  router, // 传入路由能力
  render: h => h(App)
});
