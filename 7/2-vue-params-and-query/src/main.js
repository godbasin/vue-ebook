import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Home from "pages/Home.vue";
import Page1 from "pages/Page1.vue";
import Page2 from "pages/Page2.vue";

Vue.use(VueRouter); // 使用 vue-router

/**
 * 路由关系：
 * 
 * /home/page1                /home/page2             
 * +------------------+       +-----------------+ 
 * | Home             |       | Home            | 
 * | +--------------+ |       | +-------------+ | 
 * | | Page1        | |       | | Page2       | | 
 * | |              | |       | |             | | 
 * | |              | |  +--) | |             | | 
 * | |              | |       | |             | | 
 * | |              | |       | |             | | 
 * | +--------------+ |       | +-------------+ | 
 * +------------------+       +-----------------+ 
 */

// 配置路由信息
const routes = [
  {path: "/home", component: Home,  name: "Home",
    children: [
      {path: "page1/:id", component: Page1,  name: "Page1"},
      {path: "page2", component: Page2,  name: "Page2"},
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
