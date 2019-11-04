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
                typeList: ['print'],
                form: {
                    type: '',
                }
            }
        },
        computed:{
            code(){
                switch (this.form.type){
                    case 'print':
                        return `$("#print_box").jqprint({
    debug: false, //如果是true则可以显示iframe查看效果（iframe默认高和宽都很小，可以再源码中调大），默认是false
    importCSS: true, //true表示引进原来的页面的css，默认是true。（如果是true，先会找$("link[media=print]")，若没有会去找$("link")中的css文件）
    printContainer: true, //表示如果原来选择的对象必须被纳入打印（注意：设置为false可能会打破你的CSS规则）。
    operaSupport: false//表示如果插件也必须支持歌opera浏览器，在这种情况下，它提供了建立一个临时的打印选项卡。默认是true
});`;
                    default:
                        break;
                }
            }
        }
    }
</script>