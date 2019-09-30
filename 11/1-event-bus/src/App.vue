<template>
  <div>
    <!-- 使用 <router-view></router-view> 来渲染最高级路由匹配到的组件 -->
    <router-view></router-view>
    <!-- 动态组件由 vm 实例的 component 控制 -->
    <!-- done 事件绑定用户操作完毕 -->
    <component v-for="(item, index) in items" :key="index" 
      :is="item.component" :dialogInfo="item.dialogInfo"
      @done="doneDialog(index)"
    ></component>
  </div>
</template>

<script>
// 弹窗组件
import ConfirmDialog from "./components/ConfirmDialog"
// 获取 Vue 实例
import eventBus from './utils/eventBus';

export default {
  name: 'app',
  data(){
    return {
      items: []
    }
  },
  mounted() {
    // 如果在这里，首次加载页面的时候，无法正确获取到 Vue 实例
    // DOM 还没有更新
    this.$nextTick(() => {
      // DOM 现在更新了
      eventBus.on("setDialog", (dialogInfo) => {
        // 将弹窗相关信息、弹窗组件添加进 component 数组中
        this.items.push({dialogInfo, component: ConfirmDialog})
      })
    })
  },
  methods: {
    doneDialog(index){
      // 用户已经点击了该弹窗，可以从列表中移除了
      this.items.splice(index, 1);
    }
  },
}
</script>
