<template>
    <el-tabs tab-position="left">
        <el-tab-pane lazy label="全局引入">
            <el-row>
                <el-col>
                    <h4>
                        字符串拼接 : {{ $util.string.format('replace %s to the A, replace %s to B.', ['A', 'B']) }}
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror code="this.$util.string.format('replace %s to A, replace %s to B.', ['A', 'B'])"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        模糊匹配
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror :code="fuzzyMatch"></vue-code-mirror>
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
                fuzzyMatch: `/*
* 字符串模糊匹配
* @param    source  String  匹配源
* @param    target  String  匹配目标
* @param    type    [  | 'post' | 'all']    匹配类型 [前后模糊 | 后模糊 | 全局模糊]
* @return   Boolean
*/
this.$util.string.fuzzyMatch(source, target[, type]) // true`
            }
        }
    }
</script>