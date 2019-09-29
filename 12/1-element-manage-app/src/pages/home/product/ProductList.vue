<template>
<div>
    <el-row>
      <el-col :span="24">
        <!-- 删除过程中，不允许其他操作 -->
        <el-button v-if="!showDeleteCheckbox" type="primary" @click="updateTableItem()">新增</el-button>
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
          <el-button :disabled="showDeleteCheckbox" @click="updateTableItem(scope.row.id)" type="info" size="small">编辑</el-button>
          <el-button :disabled="showDeleteCheckbox" @click="deleteTableItem([scope.row.id])" type="danger" size="small">删除</el-button>
          <el-button :disabled="showDeleteCheckbox" @click="moveTableItem(scope.row.id, 'up')" size="small">上移</el-button>
          <el-button :disabled="showDeleteCheckbox" @click="moveTableItem(scope.row.id, 'down')" size="small">下移</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import tableData from './data';

// 下面是 Vue 组件
export default {
  data() {
    return {
      tableData, // tableData: tableData 的简写
      dialogFormVisible: false, // 弹窗是否出现
      showDeleteCheckbox: false, // 是否批量删除
      chosenItem: [], // 选中的选项
    };
  },
  methods: {
    // 新增/修改一个数据
    updateTableItem(id = 0){
      // 跳转到编辑页面，新增则传id为0，否则为编辑
      if(id !== 0){
        this.$router.push({name: 'ProductEdit', params: {id}})
      }else{
        this.$router.push({name: 'ProductAdd'})
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
