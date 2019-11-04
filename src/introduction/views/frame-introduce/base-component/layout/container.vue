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
            </el-form>
        </template>
    </show-config-code>
</template>

<script>
    import ShowConfigCode from '../ShowConfigCode.vue'

    export default {
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
                }
            }
        },
        computed: {
            codeCreate(){
                if(this.paramForm.direction == 'vertical'){
                    //垂直
                    if(this.paramForm.nest){
                        //嵌套
                        if(this.paramForm.nestWayV === 'top'){
                            return `<el-container>
  <el-header height="auto">
    <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
  </el-header>
  <el-footer height="auto">Footer</el-footer>
</el-container>`
                        }else if(this.paramForm.nestWayV === 'bottom'){
                            return `<el-container>
  <el-header height="auto">Header</el-header>
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
</el-container>`
                        }else{
                            return `<el-container>
  <el-header height="auto">
    <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
  </el-header>
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
</el-container>`
                        }
                    }else{
                        //不嵌套
                        return `<el-container>
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
                            return `<el-container>
    <el-aside width="auto">
        <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
    </el-aside>
    <el-main>Main</el-main>
</el-container>`
                        }else if(this.paramForm.nestWayH === 'right'){
                            return `<el-container>
  <el-aside width="auto">Aside</el-aside>
  <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
</el-container>`
                        }else{
                            return `<el-container>
    <el-aside width="auto">
        <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
    </el-aside>
    <el-container>使用将要嵌套的布局方式来替换此处的Container标签</el-container>
</el-container>`
                        }
                    }else{
                        //不嵌套
                        return `<el-container>
  <el-aside width="auto">Aside</el-aside>
  <el-main>Main</el-main>
</el-container>`
                    }
                }
            }
        }
    }
</script>