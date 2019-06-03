<!-- 布局 -->
<template>
    <show-config-code :code="codeCreate">
        <template v-slot:config>
            <el-form
                    label-position="left"
                    :model="paramForm"
                    label-width="100px">
                <el-form-item label="排列方向">
                    <el-radio v-model="paramForm.direction" label="horizontal">水平</el-radio>
                    <el-radio v-model="paramForm.direction" label="vertical">垂直</el-radio>
                </el-form-item>
                <el-form-item label="是否嵌套布局">
                    <el-radio v-model="paramForm.nest" :label="false">否</el-radio>
                    <el-radio v-model="paramForm.nest" :label="true">是</el-radio>
                </el-form-item>
                <template v-if="paramForm.nest">
                    <el-form-item label="嵌套方式" v-if="paramForm.direction === 'horizontal'">
                        <el-radio v-model="paramForm.nestWayH" label="left">左边嵌套</el-radio>
                        <el-radio v-model="paramForm.nestWayH" label="right">右边嵌套</el-radio>
                        <el-radio v-model="paramForm.nestWayH" label="both">两边嵌套</el-radio>
                    </el-form-item>
                    <el-form-item label="嵌套方式" v-else>
                        <el-radio v-model="paramForm.nestWayV" label="top">上层嵌套</el-radio>
                        <el-radio v-model="paramForm.nestWayV" label="bottom">下层嵌套</el-radio>
                        <el-radio v-model="paramForm.nestWayV" label="both">上下嵌套</el-radio>
                    </el-form-item>
                </template>
                <el-form-item class="alignRight">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </template>
    </show-config-code>
</template>

<script>
    import ShowConfigCode from '../show-config-code.vue'

    export default {
        name: 'Container',
        components:{
            ShowConfigCode
        },
        data(){
            return {
                paramForm:{
                    direction: 'horizontal',
                    nest: false,
                    nestWayH: 'left',
                    nestWayV: 'top'
                },
                codeCreate: ''
            }
        },
        methods:{
            onSubmit(){
                if(this.paramForm.direction == 'vertical'){
                    //垂直
                    if(this.paramForm.nest){
                        //嵌套
                        if(this.paramForm.nestWayV === 'top'){
                            this.codeCreate = `<el-container>
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
  <el-footer height="auto">Footer</el-footer>
</el-container>`
                        }else if(this.paramForm.nestWayV === 'bottom'){
                            this.codeCreate = `<el-container>
  <el-header height="auto">Header</el-header>
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
</el-container>`
                        }else{
                            this.codeCreate = `<el-container direction="vertical">
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
</el-container>`
                        }
                    }else{
                        //不嵌套
                        this.codeCreate = `<el-container>
  <el-header height="auto">Header</el-header>
  <el-main>Main</el-main>
  <el-footer height="auto">Footer</el-footer>
</el-container>`
                    }
                }else{
                    //水平
                    if(this.paramForm.nest){
                        //嵌套
                        if(this.paramForm.nestWayH === 'left'){
                            this.codeCreate = `<el-container>
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
  <el-main>Main</el-main>
</el-container>`
                        }else if(this.paramForm.nestWayH === 'right'){
                            this.codeCreate = `<el-container>
  <el-aside width="auto">Aside</el-aside>
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
</el-container>`
                        }else{
                            this.codeCreate = `<el-container>
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
</el-container>`
                        }
                    }else{
                        //不嵌套
                        this.codeCreate = `<el-container>
  <el-aside width="auto">Aside</el-aside>
  <el-main>Main</el-main>
</el-container>`
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped="">
    .alignRight{
        text-align: right;
    }

    .showContainer{
        max-height: 50%;
        overflow-y: auto;

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
    }
</style>