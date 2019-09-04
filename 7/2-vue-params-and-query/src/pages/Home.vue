<template>
  <div>
    <div>Home</div>
    <div>
      <input v-model="id" />
      <br />
      <router-link :to="{ name: 'Page1', params: {id: id}}" tag="button">goto Page1</router-link>
      <router-link :to="{ name: 'Page2', query: {id: id}}" tag="button">goto Page2</router-link>
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
