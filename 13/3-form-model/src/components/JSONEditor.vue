<template>
  <!-- 可配置外层高度，jsoneditor 会根据外层高度来初始化 -->
  <div :style="{height: height}">
    <!-- 提供一个绑定 id 的元素进行初始化 -->
    <div id="jsoneditor"></div>
  </div>
</template>

<script>
// 引入 jsoneditor 方法
import JSONEditor from "jsoneditor/dist/jsoneditor.min.js"

export default {
  data() {
    return {
      editor: null, // 保存 jsoneditor 实例
      innerValue: null, // 保存内部值，用于与外部值比较和更新
    };
  },
  // 配置 v-model 的事件和绑定值，分别为 change 和 value
  model: {
    event: 'change',
    prop: 'value'
  },
  // 配置 Prop 属性
  props: {
    // 高度可配置
    height: {
      type: String,
      default: ''
    },
    // 传入配置项，可用于更新配置
    options: {
      type: Object,
      default: () => {}
    },
    // 是否只读状态，默认可编辑
    isReadonly: {
      type: Boolean,
      default: false
    },
    // 绑定 v-model 的值
    value: null
  },
  watch: {
    // 监听 options 选项，用于更新
    options(val) {
      this.setOption(val)
    },
    // 监听 value 值，用于更新 jsoneditor 的值
    value(newVal, oldVal) {
      // 这里由于是对象或数组类型，所以使用 JSON.stringify 进行比较
      if(JSON.stringify(newVal) !== JSON.stringify(this.innerValue)){
        // 如果更新的值与内部的值不相等，则更新
        this.editor.set(newVal)
      }
    }
  },
  mounted(){
    // 初始化选项，传入是否可编辑相关的一些配置
    let options = this.isReadonly
      ? {
          mode: "view"
        } : {
          mode: "code",
          modes: ["code", "form", "tree", "view"],
          onChange: () => {
            // 编辑模式下，onChange 即编辑内容有变更
            try {
              // 此时需要获取编辑内容
              const value = this.editor.get()
              // 然后更新
              this.setValue(value)
            } catch (e) {}
          }
        }
    // 将初始化选项与传入选项合并
    options = Object.assign(options, this.options)
    // 初始化 jsoneditor，传入选项信息
    this.editor = new JSONEditor(this.$el, options)
    // 如果有默认传入值，则设置进去
    if(this.value) {
      this.editor.set(this.value)
    }
  },
  methods: {
    setValue(val) {
      // 更新内部值
      this.innerValue = val
      // 通过 $emit 触发 change 事件，将 val 值更新到 v-model
      this.$emit('change', val)
    }
  }
};
</script>
<style scoped>
/* 局部引入 jsoneditor 样式 */
@import '~jsoneditor/dist/jsoneditor.min.css';
</style>
