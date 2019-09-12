<template>
  <!-- 强制出现 display: block -->
  <div class="modal" tabindex="-1" role="dialog" style="display: block">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <!-- 弹窗标题 -->
        <h4 class="modal-title">{{dialogInfo.title || '提示'}}</h4>
      </div>
      <div class="modal-body">
        <!-- 弹窗内容 -->
        <p>{{dialogInfo.text}}</p>
      </div>
      <div class="modal-footer">
        <!-- 取消按钮，点击取消，cancelText 可设置按钮文案 -->
        <button type="button" class="btn btn-default" @click="cancel()">{{dialogInfo.cancelText || '取消'}}</button>
        <!-- 确认按钮，点击确认，confirmText 可设置按钮文案 -->
        <button type="button" class="btn btn-primary" @click="confirm()">{{dialogInfo.confirmText || '确认'}}</button>
      </div>
    </div>
  </div>
</div>
</template>
    
<script>
import vm from "../main"
export default({
  props: {
    // 弹窗相关信息
    dialogInfo: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 点击取消
    cancel(){
      // 要先判断下 reject 方法在不在
      if(this.dialogInfo.reject){
        // 取消就 reject 掉呀
        this.dialogInfo.reject();
        this.$emit("done")
      }
    },
    // 点击确认
    confirm(){
      // 要先判断下 resolve 方法在不在
      if(this.dialogInfo.resolve){
        // 确认就 resolve 掉
        this.dialogInfo.resolve();
        this.$emit("done")
      }
    },
  }
})
</script>
<style scoped>
/* scoped：该组件中局部引入 bootstrap 样式，不影响全局样式 */
@import "https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css";
</style>