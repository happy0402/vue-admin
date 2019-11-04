<template>
    <el-container style="height: 100%;">
        <el-header height="auto" style="padding-bottom: 10px;">
            <el-button @click="showDataSource">查看数据源</el-button>
            <el-button @click="appendData">添加数据</el-button>
            <el-button @click="deleteData">删除数据</el-button>
            <el-button @click="saveData">保存数据</el-button>
            <el-button @click="scrollToError">定位到错误的数据</el-button>
        </el-header>
        <el-main>
            <data-table
                    ref="table"
                    :data="tableData"
                    height="100%"
                    row-key="id"
                    :current-row-key="20">

                <el-table-column
                        prop="date"
                        label="日期">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        :filters="[{ text: '小李', value: '小李' },{ text: '王小虎99', value: '王小虎99' },{ text: '王小虎98', value: '王小虎98' }]"
                        :filter-method="filterMethod">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        sortable>
                    <template slot-scope="{row}">
                        <el-input v-model="row.address" @blur="addressBlur"></el-input>
                    </template>
                </el-table-column>

            </data-table>
        </el-main>
    </el-container>
</template>

<script>
    import DataTable from '#/components/DataTable';

    export default {
        components:{
            DataTable
        },
        data() {
            return {
                tableData: [],
                rules: {
                    address: [
                        { type: 'string', required: true, message: this.$util.valid.message.required('地址') }
                    ]
                },
                validator: undefined
            }
        },
        methods:{
            filterMethod(value, row, column){
                //多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示
                return value == row.name;//false
            },
            createSource(){
                var source = [];
                for(let i = 0; i < 1000; i++){
                    source.push({
                        date: '2016-05-01',
                        id: i,
                        name: '王小虎' + i,
                        address: '上海市普陀区金沙江路 ' + i + ' 弄'
                    });
                }
                return source;
            },
            showDataSource(){
                console.log(this.tableData);
            },
            appendData(){
                this.$refs.table.prependRow({
                    date: '2016-05-01',
                    name: '小李',
                    address: ''
                });
            },
            deleteData(){
                this.$refs.table.delectCurrentRow();
            },
            saveData(){
                var modifiedData = this.$refs.table.getModifiedData();

                var invalidateData = {
                    insert: [],
                    update: [],
                    delete: []
                }
                for(let i = 0; i < modifiedData.insert.length; i++){
                    let data = modifiedData.insert[i];
                    this.validator.validateAllRules( data, (errors) => {
                        if(errors){
                            invalidateData.insert.push({
                                data: data,
                                msg: errors[0].message
                            });
                        }
                    } );
                }
                for(let i = 0; i < modifiedData.update.length; i++){
                    let data = modifiedData.update[i].new;
                    this.validator.validateAllRules( data, (errors) => {
                        if(errors){
                            invalidateData.update.push({
                                data: data,
                                msg: errors[0].message
                            });
                        }
                    } );
                }
                this.tableData = this.createSource();
                this.$refs.table.refreshTable(this.tableData);
                this.$refs.table.setErrorData(invalidateData);
            },
            scrollToError(){
                this.$refs.table.scrollToError();
            },
            addressBlur(event){
                this.validator.validateSingleProp( { address: event.target.value} ).catch((errors) => {
                    !errors || this.$message.warning(errors[0].message);
                });
            }
        },
        created(){
            this.tableData = this.createSource();

            this.validator = this.$util.valid.createValidator(this.rules);
        }
    }
</script>