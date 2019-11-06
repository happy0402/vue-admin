<template>
    <el-container>
        <el-header height="auto">
            <el-row>
                <el-col :span="4">
                    <el-input placeholder="请输入内容" v-model="content">
                        <el-button slot="append" icon="el-icon-document-copy" @click="copyContent"></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <el-divider></el-divider>
        </el-header>
        <el-main>
            <vue-code-mirror v-model="code"></vue-code-mirror>
        </el-main>
    </el-container>
</template>

<script>
    import copy from 'copy-to-clipboard';
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default{
        components:{
            VueCodeMirror
        },
        data(){
            return {
                content: 'copy content',
            }
        },
        computed:{
            code(){
                return `import copy from 'copy-to-clipboard';

copy('${this.content}');`;
            }
        },
        methods:{
            copyContent(){
                copy(this.content);
            }
        }
    }
</script>