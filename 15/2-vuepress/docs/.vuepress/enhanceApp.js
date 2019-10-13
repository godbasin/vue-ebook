// 引入ElementUI
import ElementUI from "element-ui"
// 全局引入样式
import "element-ui/lib/theme-chalk/index.css"

export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
}) => {
  try {
    // 使用element-ui
    Vue.use(ElementUI);
  } catch (e) {
    console.error(e.message);
  }
}
