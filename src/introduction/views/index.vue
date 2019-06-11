<!-- 首页 -->
<template>
    <div class="indexContainer">
        <vue-code-mirror :code="code"></vue-code-mirror>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        name: 'Index',
        components:{
            VueCodeMirror
        },
        data(){
            return {
                code: `//github 代码提交
    cd d:/ZKX/VueWorkspace/vue-admin
    git add src/introduction
    git stash -u -k //忽略其他文件
    git status //查看状态
    git commit -m '提交文件'
    git push  //推到远端仓库`
            }
        }
    }
</script>