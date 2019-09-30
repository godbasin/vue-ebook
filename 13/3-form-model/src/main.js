import Vue from 'vue';
import ElementUI from 'element-ui'; // 引入 element 组件
import 'element-ui/lib/theme-chalk/index.css'; // 加上 element 样式
import App from './App.vue';

Vue.use(ElementUI); // 在 Vue 里使用 Element

// 启动一个 Vue 应用
new Vue({
  el: '#app',
  render: h => h(App)
});