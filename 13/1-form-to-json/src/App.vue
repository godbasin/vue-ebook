<template>
  <el-container>
    <el-header>配置化表单</el-header>
    <el-main>
      <!-- 传入 formComponentList 配置数据 -->
      <DynamicForm :formComponentList="formComponentList">
        <!-- 中间的内容会替换掉 slot -->
        <!-- 这里传入了创建和取消的按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </DynamicForm>
      </el-main>
  </el-container>
</template>

<script>
// 引入动态表单组件
import DynamicForm from './components/DynamicForm.vue'

export default {
  name: 'app',
  components: {
    // 使用动态表单组件
    DynamicForm
  },
  data() {
    return {
      // 配置表单相关的属性和数据
      formComponentList: [
        {
          componentName: 'el-input',
          formLabel: '活动名称'
        }, {
          componentName: 'el-select',
          formLabel: '活动区域',
          options: [
            {label: "区域一", value: 'shanghai'},
            {label: "区域二", value: 'beijing'},
          ],
          placeholder: '请选择活动区域'
        }, {
          componentName: 'el-date-picker',
          formLabel: '活动时间',
          type: 'date',
          valueFormat: "yyyy-MM-dd",
          placeholder: '选择日期'
        }, {
          componentName: 'el-time-picker',
          valueFormat: "HH:mm:ss",
          placeholder: '选择时间'
        }, {
          componentName: 'el-switch',
          formLabel: '即时配送',
        }, {
          componentName: 'el-checkbox-group',
          formLabel: '活动性质',
          options: [
            {label: "美食/餐厅线上活动"},
            {label: "地推活动"},
            {label: "线下主题活动"},
            {label: "单纯品牌曝光"},
          ],
          value: []
        }, {
          componentName: 'el-radio-group',
          formLabel: '特殊资源',
          options: [
            {label: "线上品牌商赞助"},
            {label: "线下场地免费"},
          ],
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    onSubmit(){
      // 点击提交的时候，将值筛选出来
      const formValueList = this.formComponentList.map(x => x.value)
      console.log({formValueList})
    }
  },
}
</script>