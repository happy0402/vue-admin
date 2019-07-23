<template>
    <el-tabs tab-position="left">
        <el-tab-pane lazy label="全局引入">
            <el-row>
                <el-col>
                    深度拷贝(array 也可使用此方法进行深度拷贝)
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror code="this.$util.object.copy(object)"></vue-code-mirror>
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