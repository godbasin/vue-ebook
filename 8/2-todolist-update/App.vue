<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <!-- 输入备忘，使用 v-model 绑定 newTodo -->
        <!-- 监听 keyup 事件，同时使用修饰器 .enter，按 Enter 键时事件才触发 -->
        <input class="new-todo" placeholder="你接下来要做什么?" v-model="newTodo" v-autofocus @keyup.enter="addTodo">
      </header>
      <section class="main" v-show="todos.length">
        <!-- <input class="toggle-all" type="checkbox" v-model="allDone"> -->
        <transition-group
          name="staggered-fade"
          tag="ul"
          v-bind:css="false"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave" class="todo-list">
          <!-- 查看所有备忘 -->
          <!-- v-for 遍历所有备忘，key 绑定备忘 id，class 绑定样式 -->
          <li v-for="todo in computedTodos" class="todo" :key="todo.id" 
            :class="{ completed: todo.completed }">
            <!-- 使用 todo-item 组件 -->
            <!-- “双向绑定”备忘内容 title 和备忘已完成状态 completed -->
            <!-- 监听 delete 事件 -->
            <todo-item
              v-bind:title.sync="todo.title"
              v-bind:completed.sync="todo.completed"
              @delete="removeTodo(todo)"></todo-item>
          </li>
        </transition-group>
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
import TodoItem from "./TodoItem"
let id = 1;
export default({
  components: {
    "todo-item": TodoItem
  },
  data() {
    return {
      todos: [], // 所有的备忘
      newTodo: "", // 新增的备忘
    }
  },
  // 其他选项省略
  computed: {
    // 计算剩余未完成的备忘
    remaining(){
      // 过滤掉已完成的，获取数量
      return this.todos.filter(x => !x.completed).length
    },
    computedTodos() {
      // 过滤展示匹配的内容
      return this.todos.filter((item) => {
        return item.title.toLowerCase().indexOf(this.newTodo.toLowerCase()) !== -1
      })
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
        completed: false,
        date: ""
      })
      // 添加成功后，清空输入框，方便重新输入
      this.newTodo = ""
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
    },
    // 进入中
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter(el, done) {
      // 设置延时
      var delay = el.dataset.index * 150
      setTimeout(function () {
        // 更新元素样式
        // eslint-disable-next-line
        Velocity(
          el,
          { opacity: 1, height: '58px' },
          { complete: done }
        )
      }, delay)
    },
    // 离开时
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    leave(el, done) {
      // 设置延时
      var delay = el.dataset.index * 150
      setTimeout(function () {
        // 更新元素样式
        // eslint-disable-next-line
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
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
@import "https://unpkg.com/todomvc-app-css@2.1.0/index.css";
</style>