<!-- 布局 -->
<template>
    <show-config-code :code="codeCreate">
        <p>此处配置为常用配置,所有配置请查看
            <el-link
                    href="https://element.eleme.cn/#/zh-CN/component/layout"
                    target="_blank"
                    type="primary"
                    :underline="false">
                element-ui官方网站<i class="el-icon-view el-icon--right"></i>
            </el-link>
        </p>

        <template v-slot:show>
            <el-row :gutter="Number(paramForm.gutter)">
                <el-col
                        v-for="(col,index) in paramForm.cols"
                        :key="index"
                        :span="Number(col.span || 24)"><div class="grid-content bg-purple-dark"></div></el-col>
            </el-row>
        </template>

        <template v-slot:config>
            <el-form
                    label-position="left"
                    :model="paramForm"
                    label-width="80px">
                <el-divider>Row Attribute</el-divider>
                <el-form-item label="栅格间隔">
                    <el-input v-model="paramForm.gutter"></el-input>
                </el-form-item>
                <el-divider>Col Attribute</el-divider>
                <el-form-item
                        v-for="(col, index) in paramForm.cols"
                        :key="index"
                        label="列">
                    <el-col :span="20">
                        <el-input v-model="col.span" placeholder="栅格占据的列数"></el-input>
                    </el-col>
                    <el-col :span="4" class="alignRight">
                        <el-button @click.prevent="removeCol(index)" type="danger" icon="el-icon-minus" circle></el-button>
                    </el-col>
                </el-form-item>
                <el-form-item class="alignRight">
                    <el-col :span="24" class="alignRight">
                        <el-button @click.prevent="addCol()" type="primary" icon="el-icon-plus" circle></el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </template>
    </show-config-code>
</template>

<script>
    import ShowConfigCode from '../ShowConfigCode.vue'

    export default {
        name: 'Layout',
        components:{
            ShowConfigCode
        },
        data(){
            return {
                paramForm:{
                    gutter: undefined,
                    cols: [
                        {
                            span: undefined
                        }
                    ]
                }
            }
        },
        methods:{
            addCol(){
                this.paramForm.cols.push({
                    span: undefined
                });
            },
            removeCol(index){
//                var index = this.paramForm.cols.indexOf(col)
//                if (index !== -1) {
                    this.paramForm.cols.splice(index, 1)
//                }
            }
        },
        computed: {
            codeCreate(){
                let code = `<el-row${this.paramForm.gutter ? ' :gutter="' + this.paramForm.gutter + '"' : ''}>`

                var cols = this.paramForm.cols
                for(let i = 0; i < cols.length; i++){
                    code += '\n\t<el-col' + (cols[i].span ? ' :span="' + cols[i].span + '"' : '') + '></el-col>'
                }

                code += `
</el-row>`

                return code
            }
        }
    }
</script>

<style scoped="">
    .alignRight{
        text-align: right;
    }

    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>