/**
 * 配置参考：https://github.com/wechat-miniprogram/kbone/blob/develop/docs/miniprogram.config.js
 */

module.exports = {
    // 页面 origin，默认是 https://miniprogram.default
    origin: 'https://test.miniprogram.com',
    // 入口页面路由，默认是 /
    entry: '/',
    // 页面路由，用于页面间跳转
    router: {
        // 路由可以是多个值，支持动态路由
        todo: [
            '/(todo)?',
            '/index.html'
        ]
    },
    // 特殊路由跳转
    redirect: {
        // 跳转遇到同一个 origin 但是不在 router 里的页面时处理方式，支持的值：webview - 使用 web-view 组件打开；error - 抛出异常；none - 默认值；什么都不做，router 配置项中的 key
        notFound: 'todo',
        // 跳转到 origin 之外的页面时处理方式，值同 notFound
        accessDenied: 'todo',
    },
    // app 配置，同 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window
    app: {
        backgroundTextStyle: 'dark',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: 'kbone',
    },
    // 全局配置
    global: {
        share: true, // 是否支持分享，若支持，会展示分享按钮并调用 app 的 onShareAppMessage 按钮
        windowScroll: false, // 是否需要 window scroll 事件，会影响性能
        backgroundColor: '#F7F7F7', // page 的背景色
    },
    // 页面配置，可以为单个页面做个性化处理，覆盖全局配置
    pages: {},
    // 项目配置，会被合并到 project.config.json
    projectConfig: {
        projectname: 'kbone-template-vue',
        appid: '',
    },
}
