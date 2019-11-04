<!-- 布局 -->
<template>
    <div class="fileIntroduceContainer" style="height: 100%;">
        <vue-code-mirror v-model="code"></vue-code-mirror>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                code: `vue-admin
        |- dist
        |- node_modules //第三方插件库
        |- src
        |   |- empty //具体项目目录-空项目(新建项目复制源)
        |   |   |- api //系统数据接口
        |   |   |- lang //项目多国语言支持文件
        |   |   |   |- en.js
        |   |   |   |- zh.js
        |   |   |- mock
        |   |   |   |-modules //系统测试数据
        |   |   |   |- index.js
        |   |   |- router //项目路由配置
        |   |   |   |- index.js
        |   |   |- store //项目全局变量配置
        |   |   |   |- index.js
        |   |- introduction //具体项目目录-系统介绍
        |   |   |- api //系统数据接口
        |   |   |- assets //项目资源
        |   |   |- components //项目组件库
        |   |   |- lang //项目多国语言支持文件
        |   |   |- mock //项目测试数据
        |   |   |- router //项目路由配置
        |   |   |- store //项目全局变量配置
        |   |   |- styles //项目样式
        |   |   |- views //项目页面
        |   |- libarary //第二方代码库
        |   |   |- api //系统数据接口
        |   |   |- assets //系统资源
        |   |   |- components //第二方组件库
        |   |   |- directive //第二方指令库
        |   |   |- frame //系统框架代码
        |   |   |- lang //系统框架多国语言支持文件
        |   |   |- mock //系统测试数据
        |   |   |- router //系统路由加载
        |   |   |- store //系统全局变量加载
        |   |   |- styles //系统统一样式
        |   |   |- utils //系统工具
        |   |   |- element.js //element-ui 组件加载文件
        |   |- App.vue //系统入口文件
        |   |- initApp.js //系统初始化文件
        |   |- main.js //系统入口文件
        |   |- settings.js //系统配置文件
        |- .babelrc //babel配置文件 element-ui 相关
        |- .gitignore
        |- babel.config.js
        |- package.json //版本管理文件
        |- package-lock.json
        |- README.md
        |- vue.config.js //vue配置参数`
            }
        }
    }
</script>