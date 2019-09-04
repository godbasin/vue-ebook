<template>
  <div>
    <div>Home</div>
    <div>
      id：<input v-model="id" />
      <br />
      <router-link :to="{ name: 'Detail'}" tag="button">新建</router-link>
      <router-link :to="{ name: 'Detail', query: {id: id}}" tag="button">修改</router-link>
    </div>
    <!-- 子路由界面 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data:() =>{
    return {
      id: ""
    }
  },
  methods: {},
}
</script>
