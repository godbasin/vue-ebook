<template>
  <el-container style="border: 1px solid #eee; min-height: 100%;">
    <el-aside style="background-color: #545c64;width:auto;">
      <!-- 使用 Menu 组件，传入变量 isMenuCollapse -->
      <Menu :isMenuCollapse="isMenuCollapse" />
    </el-aside>

    <el-container>
      <el-header>
        <!-- 点击切换收起左侧菜单 -->
        <el-button @click="isMenuCollapse = !isMenuCollapse" style="font-size: 24px;padding: 5px 8px;">
          <i :class="isMenuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
        </el-button>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"><span>欢迎回来，{{username}}</span></i>
          <el-dropdown-menu slot="dropdown">
            <!-- 点击退出登录，el-dropdown-item 中需要加 .native 才能获取到点击事件 -->
            <el-dropdown-item width="100" @click.native="logout()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <!-- 子路由界面 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {getGlobalData, clearGlobalData} from 'utils/globalData';
import Menu from 'components/Menu.vue';

export default {
  name: 'app',
  data:() =>{
    return {
      isMenuCollapse: false, // 是否收起左侧菜单
      username: getGlobalData('username') || '' // 用户名，从 globalData 里取出
    }
  },
  components: {
    Menu
  },
  methods: {
    // 退出登录
    logout(){
      // 清空用户信息，然后退出到 login 登录界面
      clearGlobalData('username');
      this.$router.push({name: 'Login'});
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
.el-header {
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  font-size: 12px;
  background-color: #ededed;
}

.el-aside {
  color: #333;
}
</style>
