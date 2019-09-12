<template>
  <div :class="{editing: isEdited }">
    <div class="view">
      <!-- 选择某条备忘 -->
      <!-- v-model 绑定是否选中 -->
      <input class="toggle" type="checkbox" @change="updateChecked($event.target.checked)">
      <!-- 双击可操作备忘 -->
      <label @dblclick="editTodo(todo)">{{ title }}</label>
      <!-- 删除某条备忘 -->
      <button class="destroy" @click="removeTodo(todo)"></button>
    </div>
    <!-- 修改备忘的数据，失焦或 Enter 键可更新数据，Esc键取消更新 -->
    <input class="edit" type="text" v-model="editingTitle" v-autofocus v-if="isEdited"
      @blur="doneEdit()"
      @keyup.enter="doneEdit()"
      @keyup.esc="cancelEdit()">
  </div>
</template>
    
<script>
export default({
  data() {
    return {
      isEdited: false, // 是否在编辑中中状态
      editingTitle: "", // 编辑中内容
    }
  },
  props: {
    // 备忘内容
    title: {
      type: String,
      default: ""
    },
    // 备忘勾选（已完成）状态
    completed: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    // 编辑备忘
    editTodo(){
      this.editingTitle = this.title
      this.isEdited = true
    },
    // 确认修改备忘
    doneEdit(){
      // ESC 按键也会触发 blur 事件，故需要判断原有状态是否是编辑中
      if(this.isEdited){
        // 更新绑定的 title
        this.$emit('update:title', this.editingTitle)
        this.isEdited = false
      }
    },
    // 取消修改备忘
    cancelEdit(){
      // 取消编辑中状态
      this.isEdited = false
    },
    // 更新选中状态
    updateChecked(completed){
      // 更新绑定的 completed
      this.$emit('update:completed', completed)
    },
    // 删除备忘
    removeTodo(){
      // 通知父组件删除
      this.$emit("delete")
    }
  },
  directives: {
    autofocus: {
      // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
      inserted: function (el) {
        // el: 指令所绑定的元素，可以用来直接操作 DOM
        el.focus()
      }
    }
  }
})
</script>
<style>
.todo-list li .editing .view{
  display: none;
}
.todo-list li .editing .edit{
  display: block;
    width: 506px;
    padding: 12px 16px;
    margin: 0 0 0 43px;
}
</style>