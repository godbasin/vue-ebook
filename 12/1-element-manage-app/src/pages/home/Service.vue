<template>
<div>
    <el-row>
      <el-col :span="24">
        <!-- 删除过程中，不允许其他操作 -->
        <el-button v-if="!showDeleteCheckbox" type="primary" @click="dialogFormVisible = true;form = {};">新增</el-button>
        <el-button v-if="!showDeleteCheckbox" @click="showDeleteCheckbox = true;" type="danger">删除</el-button>
        <!-- 删除过程中，只出现确认删除按钮 -->
        <el-button v-if="showDeleteCheckbox" @click="deleteTableItem(chosenItem);showDeleteCheckbox = false;chosenItem = [];" type="danger">确认删除</el-button>
        <el-button v-if="showDeleteCheckbox" @click="showDeleteCheckbox = false;">取消</el-button>
      </el-col>
    </el-row>
    <el-table stripe :data="tableData" style="border: 1px solid #ebebeb;border-radius: 3px;margin-top: 10px;">
      <el-table-column prop="id" label="id" width="100">
        <template slot-scope="scope">
          <!-- el-checkbox 多选框，checked 绑定是否选中，click 绑定点击事件 -->
          <el-checkbox v-if="showDeleteCheckbox" :checked="chosenItem.indexOf(scope.row.id) > -1" @change="toggleChosenItem(scope.row.id)" style="margin-right: 5px;"></el-checkbox>
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="200"></el-table-column>
      <el-table-column prop="name" label="姓名" width="200"></el-table-column>
      <el-table-column prop="phone" label="电话" width="200"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <!-- 删除过程中，禁用其他操作 -->
          <el-button :disabled="showDeleteCheckbox" @click="form = {...scope.row};dialogFormVisible = true;" type="info" size="small">编辑</el-button>
          <el-button :disabled="showDeleteCheckbox" @click="deleteTableItem([scope.row.id])" type="danger" size="small">删除</el-button>
          <el-button :disabled="showDeleteCheckbox" @click="moveTableItem(scope.row.id, 'up')" size="small">上移</el-button>
          <el-button :disabled="showDeleteCheckbox" @click="moveTableItem(scope.row.id, 'down')" size="small">下移</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Form -->
    <!-- el-dialog 是弹窗样式，title 绑定弹窗的标题内容，visible 绑定弹窗是否展示 -->
    <el-dialog title="新增" :visible.sync="dialogFormVisible">
      <!-- model 绑定表单对象，rules 绑定表单规则，ref 用来校验规则 -->
      <el-form :model="form" :rules="formRules" ref="form">
        <!-- el-form-item 绑定表单样式，label 表单的名称，formLabelWidth 设置 label 的宽度, 设置 prop 来进行规则校验 -->
        <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
          <!-- 里面装载表单元素，这里装了个选择日期的组件，v-model 绑定选择值，value-format设置绑定值的格式，type 设置选择的范围，这里 date 表示到天 -->
          <el-date-picker v-model="form.date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" type="tel"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 点击取消的时候，设置弹窗不可见 -->
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- 点击确定的时候，设置弹窗不可见，同时添加一项内容 -->
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {checkPhoneValidator} from 'utils/validator';
const tableItem = {
  date: "2019-05-20", // 日期
  name: "被删", // 姓名
  phone: "13888888888", // 电话
  address: "深圳市南山区滨海大道 888 号" // 地址
};
// 此处先以 tableItem 为数据源，拷贝生成 20 个数据，然后再根据索引 index 添加上 id
const tableData = Array(20).fill(tableItem).map((x, i) => {return {id: i + 1, ...x};});

// 下面是 Vue 组件
export default {
  data() {
    return {
      tableData, // tableData: tableData 的简写
      dialogFormVisible: false, // 弹窗是否出现
      form: {}, // 用作表单绑定的内容
      formLabelWidth: '120px', // 表单 label 的宽度
      showDeleteCheckbox: false, // 是否批量删除
      chosenItem: [], // 选中的选项
      formRules: {
        date: [
          { type: 'string', required: true, message: '请选择日期', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入名字', trigger: 'change' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkPhoneValidator, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 新增/修改一个数据
    updateTableItem(item = {}){
      // 检查是否有 id，有则更新，没有则新增
      if(item.id !== undefined){
        // 更新值
        let itemIndex = this.tableData.findIndex(x => x.id === item.id);
        if(itemIndex > -1){
          // Vue 中数组更新不能直接使用 array[index] = xxx; 的方式，可以参考https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9
          this.tableData.splice(itemIndex, 1, {...item});
        }
      }else{
        // 添加到列表中，同时自增 id 
        this.tableData.push({...item, id: this.tableData.length + 1});
      }
    },
    // 删除一个数据
    deleteTableItem(idArray){
      // 查找到对应的索引，然后过滤掉
      const tableData = this.tableData.filter(x => idArray.indexOf(x.id) === -1);
      // 再重新赋值
      this.tableData = tableData;
    },
    // 移动一个数据
    moveTableItem(id, direction){
      const dataLength = this.tableData.length;
      // 查找到对应的索引，然后取出，再插入
      const index = this.tableData.findIndex(x => x.id === id);
      switch(direction){
        // 上移
        case 'up':
          if(index > 0) {
            // 第一个不进行上移
            const item = this.tableData.splice(index, 1)[0];
            this.tableData.splice(index - 1, 0, item);
          }
          break;
        // 下移
        case 'down':
          if(index < dataLength - 1) {
            // 最后一个不进行下移
            const item = this.tableData.splice(index, 1)[0];
            this.tableData.splice(index + 1, 0, item);
          }
          break;
      }
    },
    // 切换选中的选项
    toggleChosenItem(id){
      const index = this.chosenItem.findIndex(x => x.id === id);
      if(index > -1){
        // 有该选项则删除
        this.chosenItem.splice(index, 1);
      }else{
        // 无该选项则添加
        this.chosenItem.push(id);
      }
    },
    // 提交新增/修改表单
    submitForm(){
      // 校验表单
      // Element 表单校验规则配置，请查看https://element.eleme.cn/#/zh-CN/component/form
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 校验通过
          this.dialogFormVisible = false; 
          this.updateTableItem(this.form);
        } else {
          // 校验失败
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
