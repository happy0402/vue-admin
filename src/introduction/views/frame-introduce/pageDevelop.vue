<template>
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="目录配置" name="menuConfig" lazy>
            <el-link
                    href="https://router.vuejs.org/zh/"
                    target="_blank"
                    type="primary"
                    :underline="false">
                Vue Router官方网址<i class="el-icon-view el-icon--right"></i>
            </el-link>

            <vue-code-mirror v-model="menu"></vue-code-mirror>
        </el-tab-pane>
        <el-tab-pane label="页面高度设置" name="SetPageHeight" lazy>
            <vue-code-mirror v-model="singlePageHeight"></vue-code-mirror>
        </el-tab-pane>
        <el-tab-pane label="国际化" name="international" lazy>
            <el-link
                    href="https://kazupon.github.io/vue-i18n/zh/started.html#html"
                    target="_blank"
                    type="primary"
                    :underline="false">
                Vue I18n官方网址<i class="el-icon-view el-icon--right"></i>
            </el-link>
            <el-tag type="danger">注：需翻墙 -_-||</el-tag>

            <vue-code-mirror v-model="international"></vue-code-mirror>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                activeName: 'menuConfig',
                menu: `{
        path: 'parent-menu-path', //目录路径
        component: Frame, //一级目录设置系统框架做组件
        name: 'ParentMenu', //目录名称：不可重复
        children: [
            {
                path: 'child-menu-path',
                component: () => import('#/components/Menu/EmptyMenu.vue'),//具体目录组件所在位置，#/components/Menu/EmptyMenu.vue为空目录，无特殊父级组件时使用
                name: 'ChildMenu',
                meta: {
                    title: 'childMenu', // 目录名称：在lang中配置不同语言环境下的目录名称
                    //icon: 'el-icon-s-home', //目录图标，一级目录必须配置
                    //roles: ['frame', 'developer'], // 配置目录权限，若目录无限制则可省略，与用户的角色有关
                    //affix: true //tagsView 默认设置
                } //若无meta,则目录不显示
            }
        ] //子级目录
    }`,
                singlePageHeight: `//默认页面定高（窗口高度）

    //页面不固定高度
    activated(){
        this.$store.dispatch('app/setFixedPage', false);
    } `,
                international: `// 使用方式：先在 lang 文件夹中进行相应配置
    // 配置时可使用 %s  使用时,使用 this.$util.string.format(i18n.t('menu.index'), []) 解析即可,format函数具体请参考 工具类 -> 字符串

    // HTML
    {{ $t('menu.index') }}

    // VUE
    this.$t('menu.index')

    // JS
    import i18n from '#/lang' // Internationalization
    i18n.t('menu.index')`
            }
        },
        activated(){
            //设置页面定高（窗口高度）：当页面定高时,请根据 框架说明 -> 基础组件 -> 基础 -> 布局容器 开发,请给 <el-container> 添加样式 style="height: 100%"
            this.$store.dispatch('app/setFixedPage', false);
        }
    }
</script>