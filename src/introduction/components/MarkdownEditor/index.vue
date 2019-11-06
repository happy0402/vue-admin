<template>
    <div class="markdownEditorContainer">
        <div class="markdownHeader">
            <span
                    class="headerItem"
                    :class="{'activeItem': activeModule === 'editor'}"
                    @click="clickTab('editor')">
                    编辑
            </span>
            <span
                    class="headerItem"
                    :class="{'activeItem': activeModule === 'preview'}"
                    @click="clickTab('preview')">
                    预览
            </span>
            <span v-show="activeModule === 'editor'" class="headerItem" style="float: right">
                <el-link :underline="false" @click="insertContent('### ')"><i class="sf-icon-font-size"></i></el-link>
                <el-link :underline="false" @click="insertContent('**', '**')"><i class="sf-icon-bold"></i></el-link>
                <el-link :underline="false" @click="insertContent('_', '_')"><i class="sf-icon-italic"></i></el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link :underline="false" @click="insertContent('\n\n> ', '\n\n')"><i class="sf-icon-quote-left"></i></el-link>
                <el-link :underline="false" @click="insertContent('\n```\n', '\n```\n')"><i class="sf-icon-embed"></i></el-link>
                <el-link :underline="false" @click="insertContent('[', '](url)')"><i class="sf-icon-link"></i></el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link :underline="false" @click="insertContent('\n\n- ','\n\n')"><i class="sf-icon-list"></i></el-link>
                <el-link :underline="false" @click="insertContent('\n\n1. ','\n\n')"><i class="sf-icon-list-number"></i></el-link>
                <el-link :underline="false" @click="insertContent('\n\n- [ ] ','\n\n')"><i class="sf-icon-list-check"></i></el-link>

                <slot name="options"></slot>
            </span>
        </div>

        <div class="markdownContent">
            <div v-show="activeModule === 'editor'" class="pane">
                <el-input
                        ref="editArea"
                        type="textarea"
                        v-model="markContent"
                        @input="$emit('input', markContent)"
                        :autosize="{ minRows: 7, maxRows: 14}"
                ></el-input>
            </div>
            <div v-show="activeModule === 'preview'" class="pane">
                <div class="markdown-editor-contents" v-html="marked(value)"></div>
            </div>

            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    import marked from 'marked'

    export default {
        name: 'MarddownEditor',
        props: ['value'],
        data(){
            return {
                markContent: this.value,
                activeModule: 'editor'
            }
        },
        watch:{
            value(newValue, oldValue){
                this.markContent = newValue;
            }
        },
        methods: {
            marked(value){
                return marked(value);
            },
            clickTab(pane){
                this.activeModule = pane;
            },
            insertContent(startContent = '', endContent = ''){
                let textArea = this.$refs.editArea.$refs.textarea;

                textArea.focus();
                if (document.selection) {
                    let sel = document.selection.createRange();
                    sel.text = startContent + endContent;
                } else if (typeof textArea.selectionStart === 'number' &&
                    typeof textArea.selectionEnd === 'number') {
                    let startPos = textArea.selectionStart,
                        endPos = textArea.selectionEnd,
                        cursorStart = startPos + startContent.length,
                        cursorEnd = endPos + startContent.length;

                    if(startPos === endPos){
                        startPos = this.markContent.lastIndexOf('\n',startPos);
                        endPos = this.markContent.indexOf('\n',endPos);

                        startPos = (startPos === -1 ? 0 : startPos);
                        endPos = (endPos === -1 ? this.markContent.length : endPos);
                    }

                    this.markContent = this.markContent.substring(0, startPos) + startContent +
                        this.markContent.substring(startPos, endPos) + endContent +
                        this.markContent.substring(endPos, this.markContent.length);

                    this.$nextTick(function () {
                        textArea.selectionStart = cursorStart;
                        textArea.selectionEnd = cursorEnd;
                    });
                } else {
                    this.markContent += startContent + endContent;
                }

                this.$emit('input', this.markContent);
            }
        }
    }
</script>

<style lang="scss" scoped="">
    @import "~#/styles/variables.scss";
    @import "~@/introduction/components/MarkdownEditor/markdown-editor-contents.css";

    .markdownEditorContainer{
        white-space: nowrap;
        border: $firstBorder;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        background-color: $white;

        .markdownHeader{
            background-color: #f5f7fa;
            border-bottom: 1px solid #e4e7ed;

            .headerItem{
                padding: 0 20px;
                height: 40px;
                box-sizing: border-box;
                line-height: 40px;
                display: inline-block;
                list-style: none;
                font-size: 14px;
                font-weight: 500;
                position: relative;
                transition: all .3s cubic-bezier(.645,.045,.355,1);
                border: 1px solid transparent;
                color: $grey;

                margin-top: -1px;

                &:first-child{
                    margin-left: -1px;
                }

                &:hover{
                    color: $light-blue;
                    cursor: pointer;
                }

                .el-link{
                    width: 20px;
                }
            }

            .activeItem{
                color: #409eff;
                background-color: #fff;
                border-right-color: #dcdfe6;
                border-left-color: #dcdfe6;
                position: relative;
                top:1px;
            }
        }

        .markdownContent{
            padding: 15px;

            overflow: hidden;
            position: relative;
        }
    }
</style>