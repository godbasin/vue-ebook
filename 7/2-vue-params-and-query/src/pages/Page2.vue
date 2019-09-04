<template>
  <div>
    <div>Page2</div>
    <div>id: {{$route.query.id}}</div>
  </div>
</template>

<script>
// 下面是 Vue 组件
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(this.$route.query)
  },
};
</script>

<style>
</style>
