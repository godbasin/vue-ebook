<template>
  <div>
    <el-container>
      <el-header>配置化表单</el-header>
      <el-main>
        <el-row :gutter="50">
          <!-- 左侧为表单展示相关 -->
          <el-col :span="12">
            <!-- 上方为表单展示 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>表单展示</span>
              </div>
              <!-- 传入 formComponentList 配置数据 -->
              <!-- v-model 绑定表单值 -->
              <DynamicForm :formComponentList="formComponentList" v-model="formModel">
                <!-- 中间的内容会替换掉 slot -->
                <!-- 这里传入了创建和取消的按钮 -->
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </DynamicForm>
            </el-card>
            <!-- 下方为表单值 -->
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>表单数据</span>
              </div>
              <JSONEditor v-model="formModel"></JSONEditor>
            </el-card>
          </el-col>
          <!-- 右侧为 jsoneditor 编辑器 -->
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>表单配置</span>
              </div>
              <!-- v-model 绑定 formComponentList -->
              <JSONEditor v-model="formComponentList" height="600px"></JSONEditor>
            </el-card>
          </el-col>
        </el-row>
        </el-main>
    </el-container>
  </div>
</template>

<script>
// 引入动态表单组件
import DynamicForm from './components/DynamicForm.vue'
// 引入 jsoneditor 组件
import JSONEditor from './components/JSONEditor.vue'


export default {
  name: 'app',
  components: {
    // 使用组件
    DynamicForm, JSONEditor
  },
  data() {
    return {
      // 表单值
      formModel: {},
      // 配置表单相关的属性和数据
      formComponentList: [
        {
          componentName: 'el-input',
          formLabel: '活动名称',
          name: 'name'
        }, {
          componentName: 'el-select',
          formLabel: '活动区域',
          name: 'area',
          options: [
            {label: "区域一", value: 'shanghai'},
            {label: "区域二", value: 'beijing'},
          ],
          placeholder: '请选择活动区域'
        }, {
          componentName: 'el-date-picker',
          formLabel: '活动时间',
          name: 'date',
          type: 'date',
          valueFormat: "yyyy-MM-dd",
          placeholder: '选择日期'
        }, {
          componentName: 'el-time-picker',
          name: 'time',
          valueFormat: "HH:mm:ss",
          placeholder: '选择时间'
        }, {
          componentName: 'el-switch',
          name: 'immediately',
          formLabel: '即时配送',
        }, {
          componentName: 'el-checkbox-group',
          formLabel: '活动性质',
          name: 'type',
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
          name: 'resource',
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
      // 点击提交的时候，打印值
      console.log('formComponentList', this.formComponentList )
      console.log('formModel', this.formModel)
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
</style>
