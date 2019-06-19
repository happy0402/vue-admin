<template>
    <div>
        <el-row>
            <el-col>
                <h4>
                    单页面高度开发（系统无滚动条）
                </h4>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <vue-code-mirror :code="singlePageHeight"></vue-code-mirror>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        name: 'PageDevelop',
        components:{
            VueCodeMirror
        },
        data(){
            return {
                singlePageHeight: `//默认页面不固定高度
this.$store.dispatch('app/setFixedPage', true) //设置页面定高（窗口高度）
//页面视图组件请根据 框架说明 -> 三方组件 -> 基础 -> 布局容器 开发`
            }
        }
    }
</script>