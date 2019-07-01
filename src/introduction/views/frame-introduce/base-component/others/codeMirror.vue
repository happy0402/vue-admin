<!-- 布局 -->
<template>
    <el-container class="CodeMirrorContainer">
        <el-aside width="50%" style="margin-right: 10px;">
            <el-container>
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
                    <vue-code-mirror :code="code"></vue-code-mirror>
                </el-main>
            </el-container>
        </el-aside>
        <el-container>
            <el-header height="auto">
                <p>
                    此处为基于codeMirror二次封装组件，组件位于introduction子应用中，不建议其他子应用使用。
                </p>
                <p>
                    若其他系统中需要二次封装codeMirror插件，请通知相关人员移交代码到类库。
                </p>
            </el-header>
            <el-main>
                <vue-code-mirror :code="secondCode"></vue-code-mirror>
            </el-main>
        </el-container>
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
    <textarea ref="codePanel" v-model="code"></textarea>
</template>

<script>
    import CodeMirror from 'codemirror'
    import 'codemirror/lib/codemirror.css' //核心样式
    import 'codemirror/theme/monokai.css' //主题样式 - 'codemirror/theme'目录下可选择
    import 'codemirror/mode/vue/vue' //代码类型
    import 'codemirror/addon/selection/active-line' //高光选中行
    import 'codemirror/addon/scroll/simplescrollbars.css' //滚动条样式
    import 'codemirror/addon/scroll/simplescrollbars' //滚动条组件

    export default {
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
                scrollbarStyle: 'simple', //滚动条样式 | 'layout'
                styleActiveLine: true //高光选中行
            });

            //this.CodeMirrorEditor.setValue(“Hello Kitty”)：设置编辑器内容
            //this.CodeMirrorEditor.getValue()：获取编辑器内容
        }
    }
<\/script>`,
              secondCode: `<template>
    <vue-code-mirror :code="code"></vue-code-mirror>
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