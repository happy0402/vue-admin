<!-- 布局 -->
<template>
    <el-container class="CodeMirrorContainer">
        <el-header height="auto">
            <el-tag type="danger">
                此处为基于codeMirror二次封装组件，组件位于introduction子应用中，不建议其他子应用使用。
            </el-tag>
            <el-tag type="danger">
                若其他系统中需要二次封装codeMirror插件，请通知相关人员移交代码到类库。
            </el-tag>
        </el-header>
        <el-main>
            <vue-code-mirror v-model="code"></vue-code-mirror>
        </el-main>
    </el-container>
</template>

<script>
    /* eslint-disable */
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
          return {
              code: `<template>
    <vue-code-mirror v-model="code"></vue-code-mirror>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
              code: ''
            }
        }
    }
<\/script>`
          }
        }
    }
</script>