<template>
    <el-container style="height: 100%">
        <el-header height="auto" style="margin-bottom: 10px;">
            <el-button
                    type="primary"
                    icon="el-icon-plus"
            >新建</el-button>
        </el-header>
        <el-main>
            <el-table
                    :data="tableData"
                    height="100%"
                    border
                    stripe
                    highlight-current-row
                    row-key="id"
                    :current-row-key="1"
                    @row-dblclick="rowDblclick">

                <el-table-column
                        label="标题"
                        prop="title"
                        :filters="[{ text: '处理中', value: 'open' },{ text: '已关闭', value: 'close' }]"
                        :filter-method="filterState"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <!-- scope = { row, column, $index } -->
                        <i
                                :class="scope.row['state'] == 'open' ? 'sf-icon-baffled' : 'sf-icon-happy'"
                                :style="scope.row['state'] == 'open' ? 'color: #E65D6E;':'color: #30B08F;'"
                                style="margin-right: 5px;"
                        ></i>
                        {{ scope.row['title'] }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="项目"
                        prop="project"
                        :filters="apps"
                        :filter-method="filterHandle"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <!-- scope = { row, column, $index } -->
                        {{ appMap.get(scope.row['project']) }}
                    </template>
                </el-table-column>
                <el-table-column
                        label="创建者"
                        prop="author"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="createdTime"
                        sortable
                        show-overflow-tooltip>
                </el-table-column>

            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    import { fetchList as fetchIssuesList } from '@/introduction/api/issues.js'
    import { fetchList as fetchAppsList } from '#/api/app.js'

    export default {
        data() {
            return {
                tableData: [],
                apps: [],
                appMap: this.$util.array.toMap(),
                issueState: 'open'
            }
        },
        methods:{
            filterHandle(value, row, column){
                const property = column['property'];
                return row[property] === value;
            },
            filterState(value, row, column){
                return row['state'] === value;
            },
            rowDblclick(row, column, event) {
                this.$router.push('issues-detail/' + row.id);
            }
        },
        created(){
            fetchIssuesList().then((result) => {
               this.tableData = result;
            });

            fetchAppsList().then((result) => {
                this.appMap = this.$util.array.toMap(result, 'appCode', 'appName');

                for(var i = 0; i < result.length; i++){
                    this.apps.push({
                        text: result[i].appName,
                        value: result[i].appCode
                    })
                }
            })
        }
    }
</script>