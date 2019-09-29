<template>
  <div>
    <el-container>
      <el-header>配置化表单</el-header>

      <el-main>
        <el-row :gutter="50">
          <el-col :span="12">
            <DynamicForm :formComponentList="formComponentList">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </DynamicForm>
          </el-col>
          <el-col :span="12">
            <JSONEditor v-model="formComponentList"></JSONEditor>
          </el-col>
        </el-row>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import DynamicForm from './components/DynamicForm.vue'
import JSONEditor from './components/JSONEditor.vue'

export default {
  name: 'app',
  components: {
    DynamicForm, JSONEditor
  },
  data() {
    return {
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
  mounted() {
    setTimeout(() => {
      this.formComponentList = [
        {
          componentName: 'el-input',
          formLabel: '活动名称'
        }
      ]
    }, 3000)
  },
  methods: {
    onSubmit(){
      console.log({formComponentList: this.formComponentList })
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
</style>
