<template>
    <el-container>
        <el-header height="auto">
            <markdown-editor v-model="content">
                <template v-slot:options>
                    <el-divider direction="vertical"></el-divider>
                    <el-link :underline="false"><i class="sf-icon-user"></i></el-link>
                    <el-link :underline="false"><i class="sf-icon-pushpin"></i></el-link>
                </template>

                <template v-slot:footer>
                    <el-button type="primary" style="margin-top: 10px;float: right;">提交</el-button>
                </template>
            </markdown-editor>
        </el-header>
        <el-main>
            <vue-code-mirror v-model="code"></vue-code-mirror>
        </el-main>
    </el-container>
</template>

<script>
    import MarkdownEditor from '@/introduction/components/MarkdownEditor';
    import VueCodeMirror from '@/introduction/components/VueCodeMirror';

    export default{
        components:{
            VueCodeMirror,
            MarkdownEditor
        },
        data(){
            return {
                content: '### hello world',
                code: `<template>
    <markdown-editor v-model="content">
        <template v-slot:options>
            <el-divider direction="vertical"></el-divider>
            <el-link :underline="false"><i class="sf-icon-user"></i></el-link>
            <el-link :underline="false"><i class="sf-icon-pushpin"></i></el-link>
        </template>

        <template v-slot:footer>
            <el-button type="primary" style="margin-top: 10px;float: right;">提交</el-button>
        </template>
    </markdown-editor>
</template>

<script>
    import MarkdownEditor from '@/introduction/components/MarkdownEditor';

    export default{
        components:{
            MarkdownEditor
        },
        data(){
            return {
                content: '### hello world'
            }
        }
    }
<\/script>`
            }
        },
    }
</script>