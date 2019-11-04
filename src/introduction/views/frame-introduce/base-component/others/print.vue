<template>
    <div>
        <p style="margin-bottom: 10px;">
            <el-button @click="printTest">打印测试</el-button>
        </p>
        <print ref="print">
            <el-row>
                <el-col>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>日期</th>
                            <th>姓名</th>
                            <th>地址</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(row, index) in tableData" :key="index">
                            <td v-for="(cell, index) in row" :key="index">{{ cell }}</td>
                        </tr>
                        </tbody>
                    </table>
                </el-col>
            </el-row>
        </print>
        <div>
            <vue-code-mirror v-model="code"></vue-code-mirror>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'
    import Print from '#/components/Print';

    export default {
        components:{
            VueCodeMirror,
            Print
        },
        data(){
            return {
                tableData: [],
                code: `<template>
    <print ref="print">
        <!-- 需打印的内容 -->
    </print>
</template>

<script>
    import Print from '#/components/Print';

    export default{
        components:{
            Print
        },
        methods:{
            printTest(){
                this.$refs.print.print(); //调用打印
            }
        }
    }
<\/script>`,
            }
        },
        methods:{
            printTest(){
                this.$refs.print.print();
            }
        },
        created(){
            for(let i = 0; i < 100; i++){
                this.tableData.push({
                    date: '2016-05-01',
                    name: '王小虎' + i,
                    address: '上海市普陀区金沙江路 ' + i + ' 弄'
                });
            }
        }
    }
</script>

<style scoped="">
    .table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }
    .table th, .table td{
        border: 1px solid #bdbdbd;
        padding: 3px 10px;
    }
    .table td:nth-of-type(1){
        white-space: pre;
        text-align: right;
        width: 0;
    }
</style>