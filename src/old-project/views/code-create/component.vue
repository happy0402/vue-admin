<template>
    <div class="csCreate-container">
        <el-row :gutter="10">
            <el-col :span="9">
                <el-form label-position="left" label-width="70px">
                    <el-form-item label="组件类型">
                        <el-select v-model="componentType" placeholder="请选择">
                            <el-option
                                    v-for="type in typeList"
                                    :key="type"
                                    :label="type"
                                    :value="type">
                            </el-option>
                        </el-select>
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
                typeList: ['tab'],
                componentType: '',
                code: ''
            }
        },
        watch: {
            componentType: function(newValue){
                switch(newValue){
                    case 'tab':
                        this.code = `<style>
    .tabDiv {
        height: 34px;
        line-height: 34px;
    }
    .tabDiv > div {
        font-size: 16px;
        float: left;
        letter-spacing: -0.9px;
    }
    .tabDiv .btn {
        color:#2f94ed;
        background-color:#fff;
        padding:7.5px 17px;
        cursor:pointer;
        border:1px solid #2f94ed;
        font-size:16px;
    }
    .tabDiv >div:first-child .btn{
        border-radius:3px 0 0 3px;
    }
    .tabDiv >div:last-child .btn{
        border-radius:0 3px 3px 0;
    }
    .tabDiv .btn.btn-active {
        color: #fff;
        background-color: #2f94ed;
    }
    .tabCon {
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 34px;
        bottom: 30px;
        display: none;
    }
</style>

<div class="tabDiv">
    <div><a class ="btn btn-active" onclick="changeTab(this, 'allItems')">全部项目</a></div>
    <div><a class="btn" onclick="changeTab(this, 'otherItems')">其他项目</a></div>
</div>
<div class="tabContent">
    <div id="allItems" class="tabCon" style="display: block;">

    </div>
    <div id="otherItems" class="tabCon">

    </div>
</div>

<script>
    function changeTab(e, tabName) {
        $(".tabDiv>div .btn").removeClass("btn-active");
        $(e).addClass("btn-active");
        $(".tabContent .form").css("display", "none");
        $("#" + tabName).css("display", "block");

        //tabName
    }
<\/script>`;
                        break;
                    default:
                        this.code = '';
                }
            }
        }
    }
</script>