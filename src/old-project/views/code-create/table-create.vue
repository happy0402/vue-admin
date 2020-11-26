<template>
    <div class="csCreate-container" style="height: 100%;">
        <el-row :gutter="10" style="height: 100%;">
            <el-col :span="8">
                <el-form label-position="left" :model="tableForm" label-width="20px">
                    <el-form-item
                            v-for="(col, index) in tableForm.cols"
                            :key="index"
                            label="列">
                        <el-col :span="10">
                            <el-input v-model="col.width" placeholder="列宽"></el-input>
                        </el-col>
                        <el-col :span="10">
                            <el-input v-model="col.title" placeholder="列名(回车添加行)" @keyup.enter.native="addCol()" class="colName"></el-input>
                        </el-col>
                        <el-col :span="4" class="alignRight">
                            <el-button @click.prevent="removeCol(index)" type="danger" icon="el-icon-minus" circle></el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="alignRight">
                        <el-col :span="24" class="alignRight">
                            <el-button @click="addCol()" type="primary" icon="el-icon-plus" circle></el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="16" style="height: 100%;">
                <vue-code-mirror v-model="code"></vue-code-mirror>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                tableForm: {
                    cols: [
                        {
                            width: '140px',
                            title: ''
                        }
                    ]
                },
            }
        },
        methods:{
            addCol(){
                this.tableForm.cols.push({
                    width: '140px',
                    title: ''
                });

                this.$nextTick(function () {
                    var nodes = document.querySelectorAll('.colName input');
                    setTimeout(function(){
                        nodes[nodes.length - 1].focus();
                    }, 100);
                });
            },
            removeCol(index){
                this.tableForm.cols.splice(index, 1)
            }
        },
        computed:{
            code(){
                var cols = this.tableForm.cols;

                var tableCode = `<div style="overflow-y: auto;height: 100%;width: 100%;">
    <table id="dataTable" border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
        <thead>
            <tr>
                <th>
                    <table class="topTable tableMainHead" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                        <colgroup>`

                    for(let i = 0; i < cols.length; i++){
                        tableCode += '\n\t\t\t\t\t\t\t<col width="' + cols[i].width + '"/>';
                    }

                    tableCode += `
                        </colgroup>
                        <tbody>
                            <tr>`

                    for(let i = 0; i < cols.length; i++){
                        tableCode += '\n\t\t\t\t\t\t\t\t<td>' + cols[i].title + '</td>';
                    }

                    tableCode += `
                            </tr>
                        </tbody>
                    </table>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td align="left" valign="top">
                    <div class="tableContainer" style="height: 100%; overflow-y: auto;">
                        <table class="contentTable tableMain" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                            <colgroup>`;

                    for(let i = 0; i < cols.length; i++){
                        tableCode += '\n\t\t\t\t\t\t\t\t<col width="' + cols[i].width + '"/>';
                    }

                    tableCode += `
                            </colgroup>
                            <tbody>
                                <tr>`;

                    for(let i = 0; i < cols.length; i++){
                        tableCode += '\n\t\t\t\t\t\t\t\t\t<td>' + cols[i].title + '</td>';
                    }

                    tableCode += `
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<script>
     initTable($('#dataTable'), `
                var columns = [];
                for(let i = 0; i < cols.length; i++){
                    columns.push(`{
            title: '${cols[i].title}',
            field: '',
            width: '${cols[i].width}',
        }`);
                }
                tableCode += '[' + columns.join(',') + '], {});';

                return tableCode;
            }
        }
    }
</script>