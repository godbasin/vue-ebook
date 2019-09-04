<template>
  <div>
    <div>Detail</div>
    <div>{{$route.query.id ? '修改' : '新建'}}</div>
    <div>name: <input v-model="detail.name" /></div>
    <div>text: <input v-model="detail.text" /></div>
  </div>
</template>

<script>
// 下面是 Vue 组件
export default {
  data() {
    return {
      detail: {
        name: "",
        text: ""
      }
    };
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应
      console.log({to, from})
      if(to.query.id !== from.query.id) {
        this.updateDetail()
      }
    }
  },
  methods: {
    updateDetail(){
      const id = this.$route.query.id;
      if(id) {
        // 传入 id 则意味着修改，需要获取并录入原先内容
        this.detail = {
          name: `name-${id}`,
          text: `text-${id}`
        }
      } else {
        // 未传入 id 则意味着新建，需要重置原有内容
        this.detail = {
          name: '',
          text: ''
        }
      }
    }
  }
};
</script>

<style>
</style>
