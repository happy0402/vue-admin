<template>
    <el-tabs tab-position="left">
        <el-tab-pane lazy label="全局引入">
            <el-row>
                <el-col>
                    字符串拼接 : {{ $util.string.format('replace %s to the A, replace %s to B.', ['A', 'B']) }}
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror code="this.$util.string.format('replace %s to A, replace %s to B.', ['A', 'B'])"></vue-code-mirror>
                </el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default{
        components: {
            VueCodeMirror
        }
    }
</script>