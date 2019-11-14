<template>
    <el-container style="height: 100%">
        <el-header height="auto" style="margin-bottom: 10px;">
            <i-back-top></i-back-top>
            <el-row>
                <el-col :span="12" style="height: 32px;line-height: 32px;">
                    <h3>{{ project.appName }}</h3>
                </el-col>
                <el-col :span="12" style="text-align: right;">
                    <el-button
                            type="primary"
                            icon="el-icon-plus"
                            @click="newIssueModal = true"
                            id="insertBtn"
                    >{{ $t('feedback.new') }}</el-button>
                </el-col>
            </el-row>

            <!-- 弹出框 -->
            <sf-dialog
                    v-model="newIssueModal"
                    :title="$t('feedback.new')"
                    @on-ok="insertIssue"
                    :mask-closable="false"
                    width="600">
                <issue-form v-model="newIssue" type="insert"></issue-form>
            </sf-dialog>
        </el-header>
        <el-main>
            <div class="ivu-list ivu-list-default ivu-list-horizontal ivu-list-bordered ivu-list-split">
                <!-- 列表头部 -->
                <div class="ivu-list-header">
                    <el-row>
                        <!-- 开启或关闭 -->
                        <el-col :span="12" style="height: 32px;line-height: 32px;">
                            <el-link
                                    :underline="false"
                                    :style="issueState == 'open' ? 'color: #E65D6E;':'color: #000;'"
                                    @click="issueState = 'open'">
                                <i class="el-icon-warning-outline"></i> {{ $t('feedback.open') }}
                            </el-link>
                            <el-divider direction="vertical"></el-divider>
                            <el-link
                                    :underline="false"
                                    :style="issueState == 'close' ? 'color: #30B08F;':'color: #000;'"
                                    @click="issueState = 'close'">
                                <i class="ivu-icon ivu-icon-md-checkmark-circle-outline"></i> {{ $t('feedback.close') }}
                            </el-link>
                        </el-col>
                        <!-- 过滤和排序 -->
                        <el-col :span="12" style="text-align: right;">
                            <el-radio-group v-model="filterCondition">
                                <el-radio-button label="created">{{ $t('feedback.created') }}</el-radio-button>
                                <el-radio-button label="assinged">{{ $t('feedback.assigned') }}</el-radio-button>
                                <el-radio-button label="mentioned">{{ $t('feedback.mentioned') }}</el-radio-button>
                                <el-radio-button label="total">{{ $t('feedback.total') }}</el-radio-button>
                            </el-radio-group>

                            <el-dropdown
                                    trigger="click"
                                    @command="selectOrder"
                                    style="text-align: left;margin-left: 10px;">
                                <el-link :underline="false">
                                    {{ $t('feedback.sort') }}
                                    <i class="ivu-icon ivu-icon-ios-arrow-down"></i>
                                </el-link>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="newest" :disabled="sortBy == 'newest'">{{ $t('feedback.newest') }}</el-dropdown-item>
                                    <el-dropdown-item command="oldest" :disabled="sortBy == 'oldest'">{{ $t('feedback.oldest') }}</el-dropdown-item>
                                    <el-dropdown-item command="recentlyUpdated" :disabled="sortBy == 'recentlyUpdated'">{{ $t('feedback.recentlyUpdated') }}</el-dropdown-item>
                                    <el-dropdown-item command="leastRecentlyUpdated" :disabled="sortBy == 'leastRecentlyUpdated'">{{ $t('feedback.leastRecentlyUpdated') }}</el-dropdown-item>
                                    <el-dropdown-item command="worst" :disabled="sortBy == 'worst'">{{ $t('feedback.worst') }}</el-dropdown-item>
                                    <el-dropdown-item command="minimal" :disabled="sortBy == 'minimal'">{{ $t('feedback.minimal') }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </div>
                <!-- 列表内容 -->
                <div class="ivu-list-container">
                    <ul class="ivu-list-items">
                        <li class="ivu-list-item"
                            v-for="issue in issues"
                            :key="issue.id"
                            v-show="issue.state == issueState">
                            <!-- 图标 -->
                            <div class="ivu-list-item-meta-avatar">
                                <i
                                        :class="issue.state == 'open' ? 'el-icon-warning-outline' : 'ivu-icon ivu-icon-md-checkmark-circle-outline'"
                                        :style="issue.state == 'open' ? 'color: #E65D6E;':'color: #30B08F;'"
                                        style="font-size: 22px;"
                                ></i>
                            </div>

                            <!-- 主体 -->
                            <div class="ivu-list-item-meta">
                                <div class="ivu-list-item-meta-content">
                                    <!-- 标题 -->
                                    <div class="ivu-list-item-meta-title">
                                        <el-input v-if="issue.id == editIssues.id" v-model="newIssuesTitle" style="width: 450px;">
                                            <el-button slot="append" icon="sf-icon-save" type="primary" @click="saveEdit"></el-button>
                                        </el-input>
                                        <router-link v-else :to="{ name: 'IssuesDetail', params: { issueId: issue.id }}">{{ issue.title }}</router-link>
                                    </div>
                                    <!-- 注释 -->
                                    <div class="ivu-list-item-meta-description">
                                        <el-rate
                                                v-model="issue.grade"
                                                :max="4"
                                                :colors="{ 1:'#30B08F', 2: '#909399', 3: '#FEC171', 4: '#E65D6E' }"
                                                disabled
                                                style="display: inline-block; line-height: 12px;">
                                        </el-rate>
                                        <span>
                                            #{{ issue.id }} 由 {{ issue.owner }} 于
                                            {{ issue.state == 'open' ? $util.moment(issue.createTime).fromNow() + ' 创建' : $util.moment(issue.closedTime).fromNow() + ' 关闭' }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- 操作 -->
                            <ul class="ivu-list-item-action" v-show="issueState == 'open'">
                                <li>
                                    <el-link v-if="issue.id == editIssues.id" @click="cancelEdit">Cancel</el-link>
                                    <el-button
                                            v-else
                                            type="primary"
                                            icon="el-icon-edit"
                                            class="squareBtn"
                                            @click="issueEdit(issue)"
                                    ></el-button>
                                </li>
                                <li>
                                    <el-button
                                            type="primary"
                                            plain
                                            icon="el-icon-delete"
                                            class="squareBtn"
                                            @click="issueDelete(issue)"
                                    ></el-button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import { fetchList as fetchIssuesList } from '@/introduction/api/issues.js'
    import { getInfo as getAppInfo } from '#/api/app.js'

    import IssueForm from './component/issueForm.vue';

    export default {
        components:{
            IssueForm
        },
        data() {
            return {
                //弹出框
                newIssueModal: false,
                newIssue: {},
                //数据源
                project: {},
                issues: [],
                //数据处理条件
                issueState: 'open',
                filterCondition: 'created',
                sortBy: 'newest',
                //数据操作
                editIssues: {},
                newIssuesTitle: ''
            }
        },
        methods:{
            selectOrder(item){
                this.sortBy = item;
            },
            issueEdit(issue){
                this.editIssues = issue;
                this.newIssuesTitle = issue.title;
            },
            cancelEdit(){
                this.editIssues = {};
                this.newIssuesTitle = '';
            },
            saveEdit(){
                this.$message.info('保存成功!');
                this.editIssues = {};
                this.newIssuesTitle = '';
            },
            insertIssue(){
//                console.log(this.newIssue);
                this.$message.info('新增成功!');
            },
            issueDelete(issue){
                this.$modal.confirm({
                    title: '操作确认',
                    content: '是否确认删除此记录?',
                    onOk: () => {
                        this.$message.info('成功删除!  ' + issue.title);
                    }
                });
            }
        },
        created(){
            fetchIssuesList(this.projectCode).then((result) => {
               this.issues = result;
            });

            getAppInfo(this.$route.params.projectCode).then((result) => {
                this.project = result;
            });
        },
        activated(){
            this.$store.dispatch('app/setFixedPage', false);
        }
    }
</script>

<style scoped="">
    .floatLeft{
        display: inline-block;
        float: left;
        height: 32px;
        line-height: 32px;
    }

    .floatRight{
        float: right;
        display: inline-block;
    }

    .squareBtn{
        padding: 6px 7px;
    }
</style>