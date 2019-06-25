<!-- 框架介绍 -->
<template>
    <el-container class="introduce-container" v-if="modules.length">
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
            <component :is="currentTabComponent"></component>
        </el-main>
    </el-container>
    <el-container v-else>
        <router-view/>
    </el-container>
</template>

<script>
    import LoadingComponent from '#/components/AsyncComponent/LoadingComponent.vue'
    import ErrorComponent from '#/components/AsyncComponent/ErrorComponent.vue'

    export default {
        created(){
            var matched = this.$route.fullPath.split('/')
            for(let i = 2; i < matched.length; i++){
                this.filePath += matched[i] + '/'
            }

            this.activeModule = this.modules[0]

            this.$store.dispatch('app/setFixedPage', true)
        },
        data(){
            return {
                modules: this.$route.meta.modules || [],
                filePath: '',
                activeModule: '',
                currentTabComponent: undefined
            }
        },
        watch:{
            activeModule(){
                var that = this;
                this.currentTabComponent = () => ({
                    // 需要加载的组件 (应该是一个 `Promise` 对象)
                    component: import('./' + that.filePath + that.activeModule + '.vue'),
                    // 异步组件加载时使用的组件
                    loading: LoadingComponent,
                    // 加载失败时使用的组件
                    error: ErrorComponent,
                    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
                    delay: 200,
                    // 如果提供了超时时间且组件加载也超时了，
                    // 则使用加载失败时使用的组件。默认值是：`Infinity`
                    timeout: 3000
                });
            }
        },
        methods:{
            clickTab(module){
                this.activeModule = module;
            }
        }
    }
</script>

<style lang="scss">
    @import "~#/styles/variables.scss";

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
</style>