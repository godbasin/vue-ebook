module.exports = {
    title: '某个前端文档网站', // 首页标题
    shouldPrefetch: () => false, // 关闭预加载，可能导致首页渲染比较慢
    description: 'Just playing around', // 首页描述
    themeConfig: {
        // logo: '/assets/img/logo.png',
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'godbasin/vuepress-demo',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: 'Github',
    
        // 以下为可选的编辑链接选项
    
        // 假如你的文档仓库和项目本身不在一个仓库：
        // docsRepo: 'vuejs/vuepress',
        // 假如文档不是放在仓库的根目录下：
        // 这里我们是放置在docs下的
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        // 这里我们放在一个叫sourcecode的分支下，因为master需要用来放置生成的静态文件
        docsBranch: 'sourcecode',
        // 顶部导航配置
        nav: [
            { text: '概述', link: '/' },
            { text: '基础类文档', link: '/basic/' },
            { text: 'Vue类文档', link: '/vue/' },
            // 我们也可以添加FAQ的
            // { text: 'FAQ', link: '/faq' }
        ],
        // 左侧导航菜单配置
        sidebar: {
            '/basic/': [
                {
                    title: '基础类文档分类1', // 菜单名
                    collapsable: false, // 是否支持折叠菜单
                    children: [
                        '/basic/1/basic-1-1.md',
                        '/basic/1/basic-1-2.md',
                    ]
                }, {
                    title: '基础类文档分类2', // 菜单名
                    collapsable: false, // 是否支持折叠菜单
                    children: [
                        '/basic/2/basic-2-1.md',
                        '/basic/2/basic-2-2.md',
                    ]
                }
            ],     
            '/vue/': [
                {
                    title: 'Vue类文档分类1', // 菜单名
                    collapsable: true, // 是否支持折叠菜单
                    children: [
                        '/vue/1/vue-1-1.md',
                        '/vue/1/vue-1-2.md',
                    ]
                }, {
                    title: 'Vue类文档分类2', // 菜单名
                    collapsable: true, // 是否支持折叠菜单
                    children: [
                        '/vue/2/vue-2-1.md',
                        '/vue/2/vue-2-2.md',
                    ]
                }
            ]
        }
    },

};