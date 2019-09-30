<template>
  <el-form ref="form" :model="formModel" label-width="80px">
    <!-- 遍历 formComponentList，生成表单组件列表 -->
    <!-- 通过 formLabel 配置左侧 label 标签名称 -->
    <el-form-item :label="item.formLabel" v-for="(item, index) in formComponentList" :key="index">
      <!-- 通过 v-if 判断，插入对应的表单组件 -->
      <!-- 每个表单组件都有 v-model 来绑定 value 值，这里调整成 formModel，通过 name 来绑定 formModel 的属性值 -->
      <!-- 同时通过绑定 change 事件，来通知 formModel 更新 -->
      <el-input v-if="item.componentName === 'el-input'" v-model="formModel[item.name]" @change="updateValue"
        :type="item.type" :placeholder="item.placeholder"></el-input>
      <el-select v-if="item.componentName === 'el-select'" v-model="formModel[item.name]" :placeholder="item.placeholder" @change="updateValue">
        <!-- select、checkbox-group、radio-group 等选项组件可通过 options 来配置相应的选项 -->
        <el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value"></el-option>
      </el-select>
      <!-- 日期和时间组件，可通过 valueFormat 配置值的格式 -->
      <el-date-picker v-if="item.componentName === 'el-date-picker'" :type="item.type || 'date'" @change="updateValue"
        :value-format="item.valueFormat" :placeholder="item.placeholder" v-model="formModel[item.name]"></el-date-picker>
      <el-time-picker v-if="item.componentName === 'el-time-picker'" :value-format="item.valueFormat" @change="updateValue"
        :placeholder="item.placeholder" v-model="formModel[item.name]"></el-time-picker>
      <el-switch v-if="item.componentName === 'el-switch'" v-model="formModel[item.name]" @change="updateValue"></el-switch>
      <el-checkbox-group v-if="item.componentName === 'el-checkbox-group'" v-model="formModel[item.name]" @change="updateValue">
        <el-checkbox v-for="option in item.options" :label="option.label" :key="option.label">{{option.text || option.label}}</el-checkbox>
      </el-checkbox-group>
      <el-radio-group v-if="item.componentName === 'el-radio-group'" v-model="formModel[item.name]" @change="updateValue">
        <el-radio v-for="option in item.options" :label="option.label" :key="option.label">{{option.text || option.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- slot 留个性化的内容 -->
    <slot></slot>
  </el-form>
</template>

<script>
// 下面是 Vue 组件
export default {
  props: {
    // 表单组件信息
    formComponentList: {
      type: Array,
      default: () => []
    },
    // 绑定 v-model 的值
    value: null
  },
  // 配置 v-model 的事件和绑定值，分别为 change 和 value
  model: {
    event: 'change',
    prop: 'value'
  },
  data() {
    return {
      // 保存内部值，用于与外部值比较和更新
      formModel: {}
    }
  },
  watch: {
    value(val){
      // 更新内部值
      this.updateFormModel(val)
    }
  },
  methods: {
    updateValue(){
      // 更新外部值，需要变更引用才会生效
      this.$emit('change', {...this.formModel})
    },
    // 更新内部值
    updateFormModel(value){
      let formModelInit = {}
      // 检查是否有 el-checkbox-group 类型组件
      this.formComponentList.forEach(x => {
        if(x.componentName === 'el-checkbox-group') {
          // 该组件需要有初始值，不然会报错
          formModelInit[x.name] = []
        }
      })
      // 合并初始值和传入值
      this.formModel = value ? {...formModelInit, ...value} : {...formModelInit, ...this.formModel}
    }
  },
  created() {
    // 创建的时候，更新内部值
    this.updateFormModel()
  }
};
</script>
