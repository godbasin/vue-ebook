import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Todo from "pages/Todo.vue";

Vue.use(VueRouter); // 使用 vue-router

// 配置路由信息
const routes = [
  {path: "/todo", component: Todo,  name: "Todo"},
  // 通配符 * 会匹配所有路径
  {path: '*', redirect: { name: 'Todo' }},
];

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
});

// 启动一个 Vue 应用
export default new Vue({
  el: "#app",
  router, // 传入路由能力
  render: h => h(App)
});