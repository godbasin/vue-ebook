<template>
  <!-- 顺便调整了下颜色 -->
  <!-- 此处有个 default-active 属性需要注意，是用来设置菜单的选中样式，我们需要根据当前路由情况来选中 -->
  <el-menu :collapse="isMenuCollapse"
    :default-openeds="['0', '1']"
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 遍历生成父菜单选项 -->
    <template v-for="menu in menus">
      <!-- 有子菜单的时候，就用 el-submenu，再绑个序号 index -->
      <el-submenu
        v-if="menu.subMenus && menu.subMenus.length"
        :index="menu.index"
        :key="menu.index"
      >
        <template slot="title">
          <!-- 绑个父菜单的 icon -->
          <i :class="menu.icon"></i>
          <!-- 再绑个父菜单的名称 text -->
          <!-- slot 其实类似于占位符，可以去 Vue 官方文档了解一下插槽 -->
          <span slot="title">{{menu.text}}</span>
        </template>
        <el-menu-item-group>
          <!-- 子菜单也要遍历，同时绑上子菜单名称 text，也要绑个序号 index -->
          <!-- 使用 router-link 组件来导航. -->
          <!-- 通过传入 `to` 属性指定链接. -->
          <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
          <router-link tag="div"
            v-for="subMenu in menu.subMenus"
            :key="subMenu.index" :to="{name: subMenu.routerName}">
          <el-menu-item
            :index="subMenu.index"
          >{{subMenu.text}}</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <!-- 只有单个父菜单的时候，也要给这个父菜单添加路由，同样的 to 指向要去的地方 -->
      <router-link v-else :index="menu.index" :key="menu.index" tag="div" :to="{name: menu.routerName}">
        <!-- 没子菜单的时候，就用 el-menu-item，也要绑个序号 index -->
        <el-menu-item>
          <!-- 绑个父菜单的 icon -->
          <i :class="menu.icon"></i>
          <!-- 再绑个父菜单的名称 text -->
          <span slot="title">{{menu.text}}</span>
        </el-menu-item>
      </router-link>
    </template>
  </el-menu>
</template>

<script>
// 对应的，我们需要在 menus 里加上 routerName，用来跳转
// routerName 为对应的路由的路由名称
const menus = [
  {
    text: "服务管理", // 父菜单名字
    icon: "el-icon-setting", // 父菜单图标
    subMenus: [{ text: "服务信息", routerName: 'Service' }]  // 子菜单列表
  },
  {
    text: "产品管理",
    icon: "el-icon-menu",
    subMenus: [{ text: "产品信息", routerName: 'ProductList' }, { text: "新增", routerName: 'ProductAdd' }]
  },
  {
    text: "日志信息",
    icon: "el-icon-message", 
    routerName: '' // 日志信息这里为空，则不会进行跳转
  }
].map((x, i) => {
  // 添加 index，可用于默认展开 default-openeds 属性，和激活状态 efault-active 属性的设置
  return {
    ...x,
    // 子菜单就拼接${父菜单index}-${子菜单index}
    subMenus: (x.subMenus || []).map((y, j) => {
      return { ...y, index: `${i}-${j}` };
    }),
    // 父菜单就把 index 加上好了
    index: `${i}`
  };
});

// 下面是 Vue 组件
export default {
  data() {
    return {
      menus, // menus: menus 的简写
      activeIndex: ''
    };
  },
  watch: {
    // 为了设置 el-menu 的 default-active 属性，需要获取到路由状态
    '$route' (to) {
      // 对路由变化作出响应...
      let activeIndex;
      // 找到匹配的 routerName
      this.menus.forEach(x => {
        if(x.routerName === to.name){
          activeIndex = x.index;
        }else{
          const subMenuItem = x.subMenus.find(y => y.routerName === to.name);
          if(subMenuItem){ activeIndex = subMenuItem.index; }
        }
      });
      // 并将 activeIndex 设置为对应的 菜单 index
      if(activeIndex){
        this.activeIndex = activeIndex;
      }
    }
  },
  props:{
    isMenuCollapse: Boolean
  },
  methods: {
    
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}
</style>
