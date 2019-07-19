<template>
    <div>
        <el-divider>页面高度设置（页面是否不定高）</el-divider>
        <el-row>
            <el-col>
                <vue-code-mirror :code="singlePageHeight"></vue-code-mirror>
            </el-col>
        </el-row>

        <el-divider>国际化</el-divider>
        <el-row>
            <el-col>
                <vue-code-mirror :code="international"></vue-code-mirror>
            </el-col>
        </el-row>
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
                singlePageHeight: `//默认页面定高（窗口高度）

    //页面不固定高度
    activated(){
        this.$store.dispatch('app/setFixedPage', false);
    } `,
                international: `// 基于vue I18n. 官方网址：https://kazupon.github.io/vue-i18n/zh/started.html#html (需翻墙 -_-||)

    // 使用方式：先在 lang 文件夹中进行相应配置
    // 配置时可使用 %s。在使用时，使用 this.$util.string.format(i18n.t('menu.index'), []) 解析即可,format函数具体请参考 工具类 -> 字符串

    // HTML
    {{ $t('menu.index') }}

    // VUE
    this.$t('menu.index')

    // js
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