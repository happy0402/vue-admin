<template>
    <textarea ref="codePanel"></textarea>
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
        name: 'VueCodeMirror',
        props: ['value'],
        data(){
            return {
                CodeMirrorEditor: undefined
            }
        },
        watch:{
            value(value){
                this.CodeMirrorEditor && this.CodeMirrorEditor.setValue(value); //设置编辑器内容
            }
        },
        methods:{
            getValue(){
                return this.CodeMirrorEditor.getValue(); //获取编辑器内容
            },
            refresh(){
                this.CodeMirrorEditor.refresh();
            }
        },
        mounted(){
            this.$nextTick(function () {
                var that = this;
                this.CodeMirrorEditor = CodeMirror.fromTextArea(this.$refs.codePanel, {
                    mode:'vue',//编辑器语言
                    theme:'monokai', //编辑器主题
                    lineNumbers: true, //显示行号
                    scrollbarStyle: 'simple', //滚动条样式 | 'layout'
                    styleActiveLine: true //高光选中行
                });

                this.CodeMirrorEditor.setValue(this.value);

                this.CodeMirrorEditor.on("blur",function(codeMirror){
                    //事件触发后执行事件
                    that.$emit('input', codeMirror.getValue());
                });
            });
        }
    }
</script>

<style>
    .CodeMirror {
        height: 100%;
    }
</style>