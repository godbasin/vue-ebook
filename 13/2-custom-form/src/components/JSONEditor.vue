<template>
  <div style="height: 600px">
    <div id="jsoneditor"></div>
  </div>
</template>

<script>
import JSONEditor from "jsoneditor/dist/jsoneditor.min.js"

export default {
  data() {
    return {
      editor: null,
      innerValue: null
    };
  },
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    value: null
  },
  watch: {
    options(val) {
      this.setOption(val)
    },
    value(newVal, oldVal) {
      if(JSON.stringify(newVal) !== JSON.stringify(this.innerValue)){
        this.editor.set(newVal)
      }
    }
  },
  mounted(){
    let options = this.isEdit
      ? {
          mode: "code",
          modes: ["code", "form", "tree", "view"],
          onChange: () => {
            try {
              const value = this.editor.get()
              this.setValue(value)
            } catch (e) {}
          },
          onError: err => {
            // 在切换mode的时候会提示
            alert("请输入正确的json格式")
          }
        }
      : {
          mode: "view"
        };
    options = Object.assign(options, this.options)
    this.editor = new JSONEditor(this.$el, options)
    if(this.value) {
      this.editor.set(this.value)
    }
  },
  methods: {
    setValue(val) {
      this.innerValue = val
      this.$emit('change', val)
    }
  }
};
</script>
<style scoped>
@import '~jsoneditor/dist/jsoneditor.min.css';
</style>
