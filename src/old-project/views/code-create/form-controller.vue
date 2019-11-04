<template>
    <div class="csCreate-container">
        <el-row :gutter="10">
            <el-col :span="9">
                <el-form label-position="left" :model="form" label-width="70px">
                    <el-form-item label="控件类型">
                        <el-radio-group v-model="form.type">
                            <el-radio
                                    v-for="type in typeList"
                                    :key="type"
                                    :label="type"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="form.title" @keyup.enter.native="controllerPlus"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="controllerPlus">添加</el-button>
                        <el-button @click="clear">清空</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="15">
                <el-row>
                    <el-col :span="24">
                        <vue-code-mirror v-model="code"></vue-code-mirror>
                    </el-col>
                </el-row>
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
                typeList: ['text', 'radio','checkbox','input','select','dataTime','button'],
                form: {
                    type: '',
                    title: '标题:'
                },
                code: `<div style="height: 30px;">
`
            }
        },
        methods: {
            clear(){
              this.code = '<div style="height: 30px;">\n';
            },
            controllerPlus(){
                switch (this.form.type){
                    case 'text':
                        this.code += `    <div class="fleft">
        <label>${this.form.title}</label>
        <span></span>
    </div>
`;
                        break;
                    case 'radio':
                        this.code += `    <div class="fleft">
        <label>${this.form.title}</label>
        <span onclick="clickEvent(this, 1)" class="check-span" onselectstart="return false;">
            <input type="radio" name="radio" value="0" checked/>
            <span class="check-span check"></span>选项一
        </span>
        <span onclick="clickEvent(this, 2)" class="check-span" onselectstart="return false;">
            <input type="radio" name="radio" value="1" />
            <span class="check-span check"></span>选项二
        </span>
    </div>
`;
                        break;
                    case 'checkbox':
                        this.code += `    <div class="fleft">
        <label>${this.form.title}</label>
        <span onclick="clickEvent(this, 1)" class="check-span checkbox" onselectstart="return false;">
            <input type="checkbox" checked>
            <span class="check-span check" ></span>
            选项一
        </span>
        <span onclick="clickEvent(this, 2)" class="check-span checkbox" onselectstart="return false;">
            <input type="checkbox">
            <span class="check-span check" ></span>
            选项二
        </span>
    </div>
`;
                        break;
                    case 'input':
                        this.code += `    <div class="fleft">
        <label>${this.form.title}</label>
        <input type="text" class="input_text" />
    </div>
`;
                        break;
                    case 'select':
                        this.code += `    <div class="fleft">
        <label class="fleft">${this.form.title}</label>
        <select onchange="changeEvent(this)">
            <option value="0">选项一</option>
            <option value="1">选项二</option>
            <option value="2">选项三</option>
        </select>
    </div>
`;
                        break;
                    case 'dataTime':
                        this.code += `    <div class="fleft">
        <label>${this.form.title}</label>
        <input class="laydate-icon" type="text" onclick="laydate({istime: false, format: 'YYYY-MM-DD'})">
    </div>
`;
                        break;
                    case 'button':
                        this.code += `    <div class="fleft">
        <a class="a_btn " onclick="clickEvent()">${this.form.title}</a>
    </div>
`;
                        break;
                    default:
                        break;
                }
            }
        }
    }
</script>