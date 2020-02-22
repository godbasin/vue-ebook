module.exports = {
    title: '深入理解Vue.js实战',
    base: '/vue-ebook/',
    shouldPrefetch: () => false,
    description: '作者：被删',
    themeConfig: {
        // logo: '/assets/img/logo.png',
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'godbasin/vue-ebook',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: 'Github',
    
        // 以下为可选的编辑链接选项
    
        // 假如你的文档仓库和项目本身不在一个仓库：
        // docsRepo: 'vuejs/vuepress',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'ebook-sourcecode',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '帮阿猪改善此页面！',
        nav: [
            { text: '概述', link: '/' },
            { text: '内容', link: '/vue-ebook/' },
        ],
        sidebar: {
            '/vue-ebook/': [
                {
                    title: '前言',
                    collapsable: false,
                    children: [
                        '/vue-ebook/0.md'
                    ]
                }, {
                    title: '第一部分 Vue快速入门',
                    collapsable: false,
                    children: [
                        '/vue-ebook/1.md',
                        '/vue-ebook/2.md',
                        '/vue-ebook/3.md',
                        '/vue-ebook/4.md',
                        '/vue-ebook/5.md',
                        '/vue-ebook/6.md',
                        '/vue-ebook/7.md',
                        '/vue-ebook/8.md',
                    ]
                }, {
                    title: '第二部分 Vue的正确使用方式',
                    collapsable: false,
                    children: [
                        '/vue-ebook/9.md',
                        '/vue-ebook/10.md',
                        '/vue-ebook/11.md',
                        '/vue-ebook/12.md',
                        '/vue-ebook/13.md',
                        '/vue-ebook/14.md',
                        '/vue-ebook/15.md',
                        '/vue-ebook/16.md',
                    ]
                }, {
                    title: '后记',
                    collapsable: false,
                    children: [
                        '/vue-ebook/99.md',
                    ]
                }
            ],     
        }
    },

};