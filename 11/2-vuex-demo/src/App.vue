<template>
  <div>
    <!-- 使用 <router-view></router-view> 来渲染最高级路由匹配到的组件 -->
    <router-view></router-view>
    <!-- 动态组件由 vm 实例的 component 控制 -->
    <!-- done 事件绑定用户操作完毕 -->
    <component v-for="(dialogInfo, index) in dialogList" :key="index" 
      :is="ConfirmDialog" :dialogInfo="dialogInfo" :index="index"
    ></component>
  </div>
</template>

<script>
// 弹窗组件
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog.vue'
import dialogStore from './components/ConfirmDialog/dialogStore'

export default {
  name: 'app',
  computed: {
    dialogList() {
      return dialogStore.state.dialogList;
    }
  },
  data(){
    return {
      ConfirmDialog
    }
  },
}
</script>
