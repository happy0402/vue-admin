<template>
    <el-container class="showConfigCodeContainer">
        <el-header height="auto">
            <slot></slot>
        </el-header>
        <el-container>
            <el-container style="width: 40%; padding-right: 10px;">
                <el-header height="auto" class="showContainer">
                    <template v-if="analyseCode">
                        <component :is="codeAnlyse"></component>
                    </template>
                    <template v-else>
                        <slot name="show"></slot>
                    </template>
                </el-header>
                <el-main class="configContainer">
                    <slot name="config"></slot>
                </el-main>
            </el-container>
            <el-main style="width: 60%;">
                <el-input
                        class="codePanel"
                        type="textarea"
                        placeholder="代码框"
                        resize="none"
                        v-model="code">
                </el-input>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default{
        name: 'ShowConfigCode',
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
                codeAnlyse: undefined
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
        created(){
            this.createShow(this.code)
        }
    }
</script>

<style lang="scss">
    .showContainer{
        max-height: 50%;
        overflow-y: auto;
        margin-bottom: 10px;
    }

    .codePanel{
        height: 100%;

        textarea{
            height: 100%;
        }
    }
</style>