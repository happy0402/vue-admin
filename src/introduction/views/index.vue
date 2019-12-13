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
                code: `npm run build --modern //构建现代打包代码模式`
            }
        }
    }
</script>