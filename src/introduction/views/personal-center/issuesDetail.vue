<template>
    <el-container>
        <el-header height="auto">
            <div style="text-align: center;">
                <el-tag :type="issue.state == 'open' ? 'danger' : 'success'" style="margin-right: 10px;">
                    <i
                            :class="issue.state == 'open' ? 'sf-icon-baffled' : 'sf-icon-happy'"
                            :style="issue.state == 'open' ? 'color: #E65D6E;':'color: #30B08F;'"
                            style="margin-right: 5px;"
                    ></i>
                    {{ issue.state }}
                </el-tag>

                <h4 style="display: inline-block;">{{ issue.title }}</h4>


                <i style="margin-right: 10px;">#{{ issue.id }}</i>

                <sub>
                    由 {{ issue.author }} 于 {{ $util.moment(issue.createdTime).fromNow() }} 创建
                </sub>
            </div>

            <el-divider></el-divider>
        </el-header>
        <el-container>
            <el-aside width="70%" style="padding-right: 5px;">
                <el-timeline>
                    <el-timeline-item
                            v-for="content in issueContent"
                            :key="content.id"
                            :id="'issuecomment-' + content.id"
                            hide-timestamp
                            placement="top">
                        <i-card :class="[targetComment == '#issuecomment-' + content.id ? 'targetComment':'']">
                            <p slot="title">
                                {{ content.author }} 于 {{ $util.moment(content.createdTime).fromNow() }} 提交
                            </p>
                            <i-dropdown slot="extra" @on-click="handleCommand($event, content)" trigger="click" transfer>
                                <el-link :underline="false"><i class="el-icon-more"></i></el-link>
                                <i-dropdown-menu slot="list">
                                    <i-dropdown-item name="copyLink">复制链接</i-dropdown-item>
                                    <i-dropdown-item name="quoteReply">引用回复</i-dropdown-item>
                                </i-dropdown-menu>
                            </i-dropdown>

                            <div class="markdown-editor-contents" v-html="marked(content.content)"></div>

                        </i-card>
                    </el-timeline-item>
                    <el-timeline-item hide-timestamp placement="top">
                        <markdown-editor ref="markdown" v-model="content">
                            <template v-slot:footer>
                                <el-button type="primary" @click="getContent" style="margin-top: 10px;float: right;">提交</el-button>
                            </template>
                        </markdown-editor>
                    </el-timeline-item>
                </el-timeline>
            </el-aside>
            <el-main>

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import MarkdownEditor from '@/introduction/components/MarkdownEditor'
    import copy from 'copy-to-clipboard';

    import { fetchIssue, fatchContent } from '@/introduction/api/issues.js'

    export default{
        components:{
            MarkdownEditor
        },
        data(){
          return {
              targetComment: this.$route.hash,
              issueId: this.$route.params.issueId,
              issue: {},
              issueContent: [],
              content: '### hello world'
          }
        },
        methods:{
            marked(value){
                return this.$refs.markdown.marked(value);
            },
            getContent(){
                console.log(this.content);
            },
            handleCommand(command, content) {
                switch (command){
                    case 'copyLink':
                        copy(window.location.origin + '/#/personal-center/issues-detail/' + this.issueId + '#issuecomment-' + content.id);
                        break;
                    case 'quoteReply':
                        let comments = content.content.split('\n');
                        for(let i = 0; i < comments.length; i++){
                            this.content += ('\n> ' + comments[i]);
                        }
                        break;
                    default:
                        break;
                }
            }
        },
        created(){
            fetchIssue(this.issueId).then((result) => {
                this.issue = result;
            });

            fatchContent(this.issueId).then((result) => {
//                console.log(result);
                this.issueContent = result;

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