<template>
    <el-container>
        <!-- 头部问题说明 -->
        <el-header height="auto">
            <div style="text-align: center;">
                <el-tag :type="issue.state == 'open' ? 'danger' : 'success'" style="margin-right: 10px;">
                    <i
                            :class="issue.state == 'open' ? 'el-icon-warning-outline' : 'ivu-icon ivu-icon-md-checkmark-circle-outline'"
                            :style="issue.state == 'open' ? 'color: #E65D6E;':'color: #30B08F;'"
                            style="margin-right: 5px;"
                    ></i>
                    {{ issue.state }}
                </el-tag>

                <h4 style="display: inline-block;">{{ issue.title }}</h4>


                <i style="margin-right: 10px;">#{{ issue.id }}</i>

                <sub>
                    由 {{ issue.owner }} 于 {{ $util.moment(issue.createTime).fromNow() }} 创建
                </sub>
            </div>

            <el-divider></el-divider>
        </el-header>
        <el-container>
            <!-- 左侧时间线 -->
            <el-aside width="70%" style="padding-right: 20px;">
                <el-timeline>
                    <el-timeline-item
                            v-for="content in issueContents"
                            :key="content.id"
                            :id="'issuecomment-' + content.id"
                            hide-timestamp
                            placement="top">
                        <i-card :class="[targetComment == '#issuecomment-' + content.id ? 'targetComment':'']">
                            <p slot="title">
                                {{ content.modifier }} 于 {{ $util.moment(content.modifyTime).fromNow() }} 提交
                            </p>
                            <el-dropdown slot="extra" @command="handleCommand($event, content)" trigger="click">
                                <el-link :underline="false"><i class="el-icon-more"></i></el-link>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="copyLink">复制链接</el-dropdown-item>
                                    <el-dropdown-item command="quoteReply">引用回复</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>

                            <div class="markdown-editor-contents" v-html="marked(content.content)"></div>

                        </i-card>
                    </el-timeline-item>
                    <!-- markdownEditor编辑器 -->
                    <el-timeline-item hide-timestamp placement="top" v-if="issue.state == 'open'">
                        <content-editor v-model="comment">
                            <template v-slot:footer>
                                <el-button type="primary" @click="submitComment" style="margin-top: 10px;float: right;">提交</el-button>
                            </template>
                        </content-editor>
                    </el-timeline-item>
                </el-timeline>
            </el-aside>
            <!-- 右侧表单 -->
            <el-main style="padding: 0 20px;">
                <issue-form v-model="issue">
                    <template v-slot:footer>
                        <el-form-item class="alignRight">
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                            <el-button type="danger" @click="closeIssue" id="closeBtn">关闭Bug</el-button>
                        </el-form-item>
                    </template>
                </issue-form>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import marked from 'marked';
    import copy from 'copy-to-clipboard';

    import { fetchIssue, fatchContent } from '@/introduction/api/issues.js';

    import ContentEditor from './component/issueContentEditor.vue';
    import IssueForm from './component/issueForm.vue';

    export default{
        components:{
            ContentEditor,
            IssueForm
        },
        data(){
          return {
              targetComment: this.$route.hash,
              issueId: this.$route.params.issueId,
              issue: {},
              issueContents: [],
              comment: '',
              mentionedUsers: []
          }
        },
        methods:{
            marked(value){
                return marked(value);
            },
            submitComment(){
//                console.log(this.comment);
                this.$message.info('提交成功!');
            },
            handleCommand(command, content) {
                function quoteReply(){
                    let comments = content.content.split('\n');
                    for(let i = 0; i < comments.length; i++){
                        this.content += ('\n> ' + comments[i]);
                    }
                }

                switch (command){
                    case 'copyLink':
                        copy(window.location.origin + '/#/personal-center/issues-detail/' + this.issueId + '#issuecomment-' + content.id);
                        break;
                    case 'quoteReply':
                        quoteReply();
                        break;
                    default:
                        break;
                }
            },
            onSubmit(){
                this.$message.success('保存成功!');
            },
            closeIssue(){
                this.$modal.confirm({
                    title: '操作确认',
                    content: '是否确认关闭此问题?',
                    onOk: () => {
                        this.$message.info('成功关闭此问题!');
                    }
                });
            }
        },
        created(){
            fetchIssue(this.issueId).then((result) => {
                this.issue = result;
            });

            fatchContent(this.issueId).then((result) => {
//                console.log(result);
                this.issueContents = result;

                this.$nextTick(function () {
                    // Code that will run only after the
                    // entire view has been rendered
                    if(this.targetComment){
                        document.querySelector('#PageContainer').scrollTop = document.querySelector(this.targetComment).offsetTop - 200;
                    }
                });
            });
        }
    }
</script>

<style lang="scss" scoped="">
    @import "~#/styles/variables.scss";
    @import "~@/introduction/components/MarkdownEditor/markdown-editor-contents.css";

    .targetComment{
        -webkit-box-shadow: 0px 0px 5px $light-blue;
        box-shadow: 0px 0px 5px $light-blue;
    }
</style>