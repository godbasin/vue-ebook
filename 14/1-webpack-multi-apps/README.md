# vue-multi-pages

> 一个管理多页面的Vue Demo

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build例子
# 打包'src/page1'页面
npm run build page1

# 打包'src/page1'和'src/page2'页面
npm run build page1 page2

# 不输入任何参数，则打包'src/'下所有页面
npm run build
```

## 说明

### 开发环境
1. 整个项目启动一次，多页面共享相同环境。
2. 根据路由来匹配不同页面，路由与`src/`下页面目录一致。
3. 支持热加载

路由为`http://localhost:8080/page1`时，打开`page1`页面。
路由为`http://localhost:8080//page2`时，打开`page2`页面。

### 生产环境
1. 可输入目录名，来只打包对应的页面。
2. 不输入目录名的时候，则将全部页面重新打包。

输入`npm run build page1`时，打包`page1`页面。
输入`npm run build page1 page2`时，打包`page1`和`page2`页面。
输入`npm run build`时，打包所有`page`页面。