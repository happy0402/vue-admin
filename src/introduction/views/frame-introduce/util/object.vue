<template>
    <el-tabs tab-position="left">
        <el-tab-pane lazy label="全局引入">
            <el-row>
                <el-col>
                    <h4>
                        深度拷贝<el-tag type="danger">array 也可使用此方法进行深度拷贝</el-tag>
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="deepCopy"></vue-code-mirror>
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
        },
        data(){
            return {
                deepCopy: `this.$util.object.copy(object)`
            }
        }
    }
</script>