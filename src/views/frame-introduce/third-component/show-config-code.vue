<template>
    <el-container class="showConfigCodeContainer">
        <el-container style="width: 50%; padding-right: 10px;">
            <el-header height="auto" class="showContainer">
                <slot name="show"></slot>
            </el-header>
            <el-main class="configContainer">
                <slot name="config"></slot>
            </el-main>
        </el-container>
        <el-container style="width: 50%;">
            <el-input
                    class="codePanel"
                    type="textarea"
                    placeholder="代码框"
                    resize="none"
                    v-model="code">
            </el-input>
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
            }
        }
    }
</script>

<style lang="scss">
    .showContainer{
        max-height: 50%;
        overflow-y: auto;
    }

    .codePanel{
        height: 100%;

        textarea{
            height: 100%;
        }
    }
</style>