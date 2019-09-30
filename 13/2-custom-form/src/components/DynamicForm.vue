<template>
  <el-form ref="form" label-width="80px">
    <!-- 遍历 formComponentList，生成表单组件列表 -->
    <!-- 通过 formLabel 配置左侧 label 标签名称 -->
    <el-form-item :label="item.formLabel" v-for="(item, index) in formComponentList" :key="index">
      <!-- 通过 v-if 判断，插入对应的表单组件 -->
      <!-- 每个表单组件都有 v-model 来绑定 value 值 -->
      <el-input v-if="item.componentName === 'el-input'" v-model="item.value" :type="item.type" :placeholder="item.placeholder"></el-input>
      <el-select v-if="item.componentName === 'el-select'" v-model="item.value" :placeholder="item.placeholder">
        <!-- select、checkbox-group、radio-group 等选项组件可通过 options 来配置相应的选项 -->
        <el-option v-for="option in item.options" :label="option.label" :value="option.value" :key="option.value"></el-option>
      </el-select>
      <!-- 日期和时间组件，可通过 valueFormat 配置值的格式 -->
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
    <!-- slot 留个性化的内容 -->
    <slot></slot>
  </el-form>
</template>

<script>
// 下面是 Vue 组件
export default {
  // 传入选项
  props: {
    // 表单组件信息
    formComponentList: {
      type: Array,
      default: () => []
    }
  }
};
</script>
