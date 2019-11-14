<template>
    <el-form
            :model="issue"
            label-width="70px"
            label-position="left"
            :disabled="issue.state == 'close'">

        <el-form-item v-if="type=='insert'" label="标题" prop="input">
            <el-input v-model="issue.title"></el-input>
        </el-form-item>
        <el-form-item label="分配给" prop="assignees">
            <el-select v-model="issue.assignees" placeholder="请选择">
                <el-option label="luguokong" value="1"></el-option>
                <el-option label="iamkun" value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="问题等级" prop="result">
            <el-rate
                    v-model="issue.grade"
                    :max="4"
                    :colors="{ 1:'#30B08F', 2: '#909399', 3: '#FEC171', 4: '#E65D6E' }"
                    show-text
                    :texts="['优化改进', '显示错误', '功能错误','致命错误' ]">
            </el-rate>
        </el-form-item>
        <el-form-item label="问题类型" prop="type">
            <el-select v-model="issue.type" placeholder="请选择">
                <el-option label="代码错误" value="bug"></el-option>
                <el-option label="设计缺陷" value="design"></el-option>
                <el-option label="界面优化" value="optimize"></el-option>
                <el-option label="性能问题" value="capability"></el-option>
                <el-option label="配置相关" value="config"></el-option>
                <el-option label="标准规范" value="standard"></el-option>
                <el-option label="其他" value="others"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="type=='update'" label="处理结果" prop="result">
            <el-select v-model="issue.result" placeholder="请选择">
                <el-option label="已解决" value="fixed"></el-option>
                <el-option label="重复bug" value="repeat"></el-option>
                <el-option label="不是bug" value="notBug"></el-option>
                <el-option label="无法重现" value="noReproduce"></el-option>
                <el-option label="不予解决" value="noSolve"></el-option>
                <el-option label="设计如此" value="byDesign"></el-option>
                <el-option label="延期修改" value="delay"></el-option>
            </el-select>
        </el-form-item>
        <content-editor v-if="type=='insert'" v-model="issue.comment"></content-editor>

        <slot name="footer"></slot>
    </el-form>
</template>

<script>
    import ContentEditor from './issueContentEditor.vue';

    export default{
        components:{
            ContentEditor
        },
        props: {
            value: Object,
            type: {
                type: String,
                default: 'update',
                validator: function (value) {
                    // 这个值必须匹配下列字符串中的一个
                    return ['insert', 'update'].indexOf(value) !== -1
                }
            }
        },
        data(){
            return {
                issue: this.value
            }
        },
        watch:{
            value(newValue){
                this.issue = newValue;
            }
        }
    }
</script>