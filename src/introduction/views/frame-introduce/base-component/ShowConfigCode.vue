<template>
    <el-container class="showConfigCodeContainer">
        <el-header height="auto">
            <slot></slot>
        </el-header>

        <el-main>
            <split-pane :min-percent='20' :default-percent='40' split="vertical">
                <template slot="paneL">
                    <el-container>
                        <el-header height="auto" class="showContainer">
                            <!-- 展示区 -->
                            <template v-if="analyseCode">
                                <component :is="codeAnlyse"></component>
                            </template>
                            <template v-else>
                                <slot name="show"></slot>
                            </template>
                        </el-header>
                        <el-main class="configContainer">
                            <!-- 配置区 -->
                            <slot name="config"></slot>
                        </el-main>
                    </el-container>
                </template>
                <template slot="paneR">
                    <!-- 代码区 -->
                    <vue-code-mirror :code="code"></vue-code-mirror>
                </template>
            </split-pane>
        </el-main>
    </el-container>
</template>

<script>
    import SplitPane from 'vue-splitpane'
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default{
        name: 'ShowConfigCode',
        components:{
            SplitPane,
            VueCodeMirror
        },
        props:{
            code: {
                type: String,
                default: ''
            },
            analyseCode: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                codeAnlyse: undefined,
            }
        },
        watch: {
            code(value){
                this.createShow(value)
            }
        },
        methods: {
            createShow(code){
                if(this.analyseCode){
                    this.codeAnlyse = (resolve) => {
                        resolve({
                            template: code
                        })
                    }
                }
            }
        },
        mounted(){
            this.createShow(this.code)
        }
    }
</script>

<style scoped="">
    .showConfigCodeContainer{
        height: 100%;
    }

    .showContainer{
        max-height: 50%;
        overflow-y: auto;
        margin-bottom: 10px;
    }
</style>