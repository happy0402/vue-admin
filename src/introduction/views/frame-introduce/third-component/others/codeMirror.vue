<!-- 布局 -->
<template>
    <el-container class="CodeMirrorContainer">
        <el-header>
            <p>此处为默认使用方法,具体文档请查看
                <el-link
                        href="https://codemirror.net/"
                        target="_blank"
                        type="primary"
                        :underline="false">
                    Code Mirror官方网站<i class="el-icon-view el-icon--right"></i>
                </el-link>
                <el-link
                        href="https://blog.csdn.net/jlu_lei/article/details/80259697"
                        target="_blank"
                        type="primary"
                        :underline="false">
                    Code Mirror使用博客<i class="el-icon-view el-icon--right"></i>
                </el-link>
            </p>
        </el-header>
        <el-main>
            <textarea ref="codePanel" v-model="code"></textarea>
        </el-main>
    </el-container>
</template>

<script>
    import CodeMirror from 'codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/monokai.css'
    import 'codemirror/mode/vue/vue'
    import 'codemirror/addon/selection/active-line'
    import 'codemirror/addon/scroll/simplescrollbars.css'
    import 'codemirror/addon/scroll/simplescrollbars'

    export default {
        name: 'CodeMirror',
        components:{
            CodeMirror
        },
        data(){
          return {
              CodeMirrorEditor: undefined,
              code: ''
          }
        },
        mounted(){
            this.CodeMirrorEditor = CodeMirror.fromTextArea(this.$refs.codePanel, {
                mode:'javascript',//编辑器语言
                theme:'monokai', //编辑器主题
                lineNumbers: true, //显示行号
                scrollbarStyle: 'simple', //滚动条样式
                styleActiveLine: true //高光选中行
            });

            this.CodeMirrorEditor.setValue(this.code)
        }
    }
</script>

<style scoped="">
    .CodeMirrorContainer >>> .CodeMirror{
        height: 100%;
    }
</style>