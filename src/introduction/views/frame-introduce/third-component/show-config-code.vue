<template>
    <el-container class="showConfigCodeContainer">
        <el-header height="auto">
            <slot></slot>
        </el-header>

        <!-- 大展示区 -->
        <!--<el-container v-if="bigShow">-->
            <!--<el-aside width="5stylestyle="padding-right: 10px;">-->
                <!--&lt;!&ndash; 展示区 &ndash;&gt;-->
                <!--<template v-if="analyseCode">-->
                    <!--<component :is="codeAnlyse"></component>-->
                <!--</template>-->
                <!--<template v-else>-->
                    <!--<slot name="show"></slot>-->
                <!--</template>-->
            <!--</el-aside>-->
            <!--<el-contaistylestyle="width: 50%;">-->
                <!--<el-header height="auto" class="showContainer">-->
                    <!--&lt;!&ndash; 配置区 &ndash;&gt;-->
                    <!--<slot name="config"></slot>-->
                <!--</el-header>-->
                <!--<el-main>-->
                    <!--&lt;!&ndash; 代码区 &ndash;&gt;-->
                    <!--<el-input-->
                            <!--class="codePanel"-->
                            <!--type="textarea"-->
                            <!--placeholder="代码框"-->
                            <!--resize="none"-->
                            <!--v-model="code">-->
                    <!--</el-input>-->
                <!--</el-main>-->
            <!--</el-container>-->
        <!--</el-container> v-else-->

        <!-- 小展示区 -->
        <el-container>
            <el-container style="width: 50%; padding-right: 10px;">
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
            <el-main style="width: 50%;">
                <!-- 代码区 -->
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
//            ,
//            bigShow: {
//                type: Boolean,
//                default: false
//            }
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