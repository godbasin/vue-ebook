<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <!-- 输入备忘，使用 v-model 绑定 newTodo -->
        <!-- 监听 keyup 事件，同时使用修饰器 .enter，按 Enter 键时事件才触发 -->
        <input class="new-todo" placeholder="你接下来要做什么?" v-model="newTodo" @keyup.enter="addTodo">
      </header>
      <section class="main" v-show="todos.length">
        <!-- <input class="toggle-all" type="checkbox" v-model="allDone"> -->
        <ul class="todo-list">
          <!-- 查看所有备忘 -->
          <!-- v-for 遍历所有备忘，key 绑定备忘 id，class 绑定样式 -->
          <li v-for="todo in todos" class="todo" :key="todo.id" 
            :class="{ completed: todo.completed, editing: todo.id == editedTodo.id }">
            <div class="view">
              <!-- 选择某条备忘 -->
              <!-- v-model 绑定是否选中 -->
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <!-- 双击可操作备忘 -->
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <!-- 删除某条备忘 -->
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <!-- 修改备忘的数据，失焦或 Enter 键可更新数据，Esc键取消更新 -->
            <input class="edit" type="text" v-model="editedTodo.title"
              @blur="doneEdit(editedTodo)"
              @keyup.enter="doneEdit(editedTodo)"
              @keyup.esc="cancelEdit()">
          </li>
        </ul>
        <footer class="footer" v-show="todos.length">
          <span class="todo-count">
            <!-- remaining 计算剩余的未完成的数量，pluralize 用来过滤单位是否要负数 -->
            <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
          </span>
          <!-- 当有已完成的备忘时，一键移除已完成按钮出现 -->
          <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
            Clear completed
          </button>
        </footer>
      </section>
    </section>
  </div>
</template>
    
<script>
let id = 1;
export default({
  data() {
    return {
      todos: [], // 所有的备忘
      newTodo: "", // 新增的备忘
      editedTodo: {}, // 修改中的备忘
    }
  },
  // 其他选项省略
  computed: {
    // 计算剩余未完成的备忘
    remaining(){
      // 过滤掉已完成的，获取数量
      return this.todos.filter(x => !x.completed).length
    }
  },
  filters: {
    // 计算单位
    pluralize(num){
      // 如果是多个，则加复数
      return num > 1 ? 'items' : 'item'
    }
  },
  methods: {
    // 新增备忘
    addTodo(){
      // 内容为空则不处理
      if(!this.newTodo) {return}
      // 往备忘列表中新增一条
      // 最后新增的备忘插在最前面，所以使用 unshift 而不是 push
      this.todos.unshift({
        id: id++, // id 自增
        title: this.newTodo,
        completed: false
      })
      // 添加成功后，清空输入框，方便重新输入
      this.newTodo = ""
    },
    // 编辑备忘
    editTodo(todo){
      // 将待编辑的内容填充到修改的内容中
      // 使用 ... 解构，相当于使用 Object.assign，属于浅拷贝
      // 此处对象只有一层，浅拷贝足矣
      this.editedTodo = {...todo}
    },
    // 确认修改备忘
    doneEdit(todo){
      // 将编辑中内容更新到列表中
      this.todos = this.todos.map(x => {
        return todo.id == x.id ? {...todo} : {...x}
      })
      // 清空编辑对象
      this.editedTodo = {}
    },
    // 取消修改备忘
    cancelEdit(){
      this.editedTodo = {}
    },
    // 删除备忘
    removeTodo(todo){
      // 匹配 id 找出该备忘，然后移除
      const index = this.todos.findIndex(x => x.id === todo.id)
      this.todos.splice(index, 1)
    },
    // 删除已完成的备忘
    removeCompleted() {
      this.todos = this.todos.filter(x => !x.completed)
    }
  }
})
</script>
<style>
@import "https://unpkg.com/todomvc-app-css@2.1.0/index.css";
</style>