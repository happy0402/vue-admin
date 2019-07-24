<!-- 框架介绍 -->
<template>
    <el-container class="introduce-container" style="height: 100%">
        <el-header height="auto">
            <div class="tabs">
                <el-scrollbar ref="scrollbar" viewClass="tabsTitle">
                    <span
                            class="module-item"
                            v-for="module in modules"
                            :key="module"
                            :class="{'active-tab': module === activeModule}"
                            @click="clickTab(module)">
                        {{ $t('tabsTitle.' + module) }}
                    </span>
                </el-scrollbar>
            </div>
        </el-header>
        <el-main style="padding-top: 10px;">
            <router-view :name="activeModule"></router-view>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data(){
            return {
                modules: this.$route.meta.modules || [],
                activeModule: '',
            }
        },
        methods:{
            clickTab(module){
                this.activeModule = module;
            }
        },
        mounted(){
            if(this.modules.length){
                this.activeModule = this.modules[0];
            }
        }
    }
</script>

<style lang="scss">
    @import "~#/styles/variables.scss";

    .introduce-container{
        height: 100%;

        .tabs{
            white-space: nowrap;
            border-bottom: $firstBorder;

            .el-scrollbar{
                margin-bottom: -1px;
            }

            .tabsTitle{
                border: $firstBorder;
                border-bottom: none;
                border-radius: 4px 4px 0 0;
                box-sizing: border-box;
                display: inline-block;

                .active-tab{
                    border-bottom-color: $white;
                    color: $light-blue;
                }
            }

            .module-item{
                padding: 0 15px;
                height: 35px;
                line-height: 35px;
                display: inline-block;
                font-size: 14px;
                font-weight: 500;
                border-bottom: 1px solid transparent;
                border-left: $firstBorder;
                cursor: pointer;
                -webkit-transition: color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1);
                -moz-transition: color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1);
                -ms-transition: color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1);
                -o-transition: color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1);
                transition: color .3s cubic-bezier(.645,.045,.355,1),padding .3s cubic-bezier(.645,.045,.355,1);

                &:first-child{
                    border-left: none;
                }

                &:hover{
                    color: $light-blue;
                }
            }
        }
    }
</style>