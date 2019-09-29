## Project setup
```
# 安装依赖
npm run install

# 本地启动项目
npm run serve

# 打包构建
npm run build

# lint 检查和处理
npm run lint
```

## 目录结构
```
├─dist                      // 编译之后的项目文件
├─src                       // 开发目录
│  ├─assets                 // 静态资源
│     ├─less		        // 公共less
│     ├─img					// 图片资源
│  ├─components             // 组件
│  ├─pages                  // 页面，根据路由结构划分
│  ├─utils                  // 工具库
│  ├─App.vue                // 启动页面，最外层容器组件
│  ├─main.js                // 入口脚本
│  babel.config.js          // babel 配置文件
│  vue.config.js            // vue 自定义配置，与 webpack 配置相关
│  package.json             // 项目配置
│  README.md                // 项目说明
```