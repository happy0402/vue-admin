<!-- 首页 -->
<template>
    <div class="indexContainer">
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
                code: `npm run build --modern //构建现代打包代码模式，项目打包后系统介绍子应用部分功能因异步组件内的动态路径无法访问`
            }
        }
    }
</script>