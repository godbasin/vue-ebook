<template>
  <div>
    <div>Page1</div>
    <div>id: {{$route.params.id}}</div>
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
    console.log(this.$route.params)
  },
};
</script>

<style>
</style>
