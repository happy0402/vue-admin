<template>
    <el-container class="ShowConfigCodeContainer">
        <el-header height="auto">
            <slot></slot>
        </el-header>

        <el-main>
            <split-pane :min-percent='20' :default-percent='40' split="vertical">
                <template slot="paneL">
                    <el-container>
                        <el-header height="auto" class="showContainer">
                            <!-- 展示区 -->
                            <template v-if="analyseCode">
                                <component :is="codeAnlyse"></component>
                            </template>
                            <template v-else>
                                <slot name="show"></slot>
                            </template>
                        </el-header>
                        <el-main class="configContainer">
                            <!-- 配置区 -->
                            <slot name="config"></slot>
                        </el-main>
                    </el-container>
                </template>
                <template slot="paneR">
                    <!-- 代码区 -->
                    <textarea ref="codePanel" v-model="code"></textarea>
                </template>
            </split-pane>
        </el-main>
    </el-container>
</template>

<script>
    import SplitPane from 'vue-splitpane'

    import CodeMirror from 'codemirror'
    import 'codemirror/lib/codemirror.css'
    import 'codemirror/theme/monokai.css'
    import 'codemirror/mode/vue/vue'
    import 'codemirror/addon/selection/active-line'
    import 'codemirror/addon/scroll/simplescrollbars.css'
    import 'codemirror/addon/scroll/simplescrollbars'

    export default{
        name: 'ShowConfigCode',
        components:{
            SplitPane,
            CodeMirror
        },
        props:{
            code: {
                type: String,
                default: ''
            },
            analyseCode: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                codeAnlyse: undefined,
                CodeMirrorEditor: undefined
            }
        },
        watch: {
            code(value){
                this.CodeMirrorEditor.setValue(value)
                this.createShow(value)
            }
        },
        methods: {
            createShow(code){
                if(this.analyseCode){
                    this.codeAnlyse = (resolve) => {
                        resolve({
                            template: code
                        })
                    }
                }
            }
        },
        mounted(){
            this.createShow(this.code)

            this.CodeMirrorEditor = CodeMirror.fromTextArea(this.$refs.codePanel, {
                mode:'javascript',//编辑器语言
                theme:'monokai', //编辑器主题
                lineNumbers: true, //显示行号
                scrollbarStyle: 'simple', //滚动条样式
                styleActiveLine: true //高光选中行
            });
        }
    }
</script>

<style scoped="">
    .showContainer{
        max-height: 50%;
        overflow-y: auto;
        margin-bottom: 10px;
    }

    .ShowConfigCodeContainer >>> .CodeMirror {
        height: 100%;
    }
</style>