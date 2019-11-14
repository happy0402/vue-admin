<template>
    <markdown-editor v-model="comment">
        <template v-slot:options>
            <el-divider direction="vertical"></el-divider>
            <el-dropdown slot="extra" @command="callUser($event)" trigger="click">
                <el-link :underline="false"><i class="sf-icon-user"></i></el-link>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">luguokong</el-dropdown-item>
                    <el-dropdown-item command="2">element-bot</el-dropdown-item>
                    <el-dropdown-item command="3">iamkun</el-dropdown-item>
                    <el-dropdown-item command="4">matjaz</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-link :underline="false"><i class="sf-icon-pushpin"></i></el-link>
        </template>

        <template v-slot:footer>
            <slot name="footer"></slot>
        </template>
    </markdown-editor>
</template>

<script>
    import MarkdownEditor from '@/introduction/components/MarkdownEditor';

    export default{
        props: ['value'],
        components:{
            MarkdownEditor
        },
        data(){
            return {
                comment: this.value,
            }
        },
        watch:{
            comment(newValue){
                this.$emit('input', newValue);
            }
        },
        methods: {
            callUser(userId){
                this.mentionedUsers.push(userId);
            }
        }
    }
</script>