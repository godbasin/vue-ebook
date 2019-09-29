<template>
  <el-form ref="form" label-width="80px">
    <el-form-item :label="item.formLabel" v-for="(item, index) in formComponentList" :key="index">
      <el-input v-if="item.componentName === 'el-input'" v-model="item.value" :type="item.type" :placeholder="item.placeholder"></el-input>
      <el-select v-if="item.componentName === 'el-select'" v-model="item.value" :placeholder="item.placeholder">
        <el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value"></el-option>
      </el-select>
      <el-date-picker v-if="item.componentName === 'el-date-picker'" :type="item.type || 'date'" :value-format="item.valueFormat" :placeholder="item.placeholder" v-model="item.value"></el-date-picker>
      <el-time-picker v-if="item.componentName === 'el-time-picker'" :value-format="item.valueFormat" :placeholder="item.placeholder" v-model="item.value"></el-time-picker>
      <el-switch v-if="item.componentName === 'el-switch'" v-model="item.value"></el-switch>
      <el-checkbox-group v-if="item.componentName === 'el-checkbox-group'" v-model="item.value">
        <el-checkbox v-for="option in item.options" :label="option.label" :key="option.label">{{option.text || option.label}}</el-checkbox>
      </el-checkbox-group>
      <el-radio-group v-if="item.componentName === 'el-radio-group'" v-model="item.value">
        <el-radio v-for="option in item.options" :label="option.label" :key="option.label">{{option.text || option.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
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
    }
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {}
};
</script>
