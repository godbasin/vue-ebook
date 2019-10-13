import Vue from 'vue'
import Router from 'vue-router'

const Todo = () => import(/* webpackChunkName: "Todo" */'@/todo/Index.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: "/(todo)?", component: Todo,  name: "Todo"}
  ]
})
