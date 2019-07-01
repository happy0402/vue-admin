<template>
    <el-container>
        <el-aside width="40%">
            <el-divider>基础用法</el-divider>
            <p>
                <el-button :plain="true" @click="modal1 = true">显示对话框</el-button>
            </p>
            <self-dialog
                v-model="modal1"
                title="标题"
                :ok="ok"
                :cancel="cancel"
                :close="close">
                <p>Content of dialog</p>
                <p>Content of dialog</p>
                <p>Content of dialog</p>
            </self-dialog>
        </el-aside>
        <el-main>
            <vue-code-mirror :code="code"></vue-code-mirror>
        </el-main>
    </el-container>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                code: '',
                modal1: false,
                modal2: false,
                modal_loading: false
            }
        },
        methods:{
            ok () {
                this.$message.info('Clicked ok');
            },
            cancel () {
                this.$message.info('Clicked cancel');
            },
            close(){
                this.$message.info('Clicked close');
            }
        }
    }
</script>