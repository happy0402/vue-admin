<template>
    <el-container>
        <el-aside :width="asideWidth">
            <sidebar></sidebar>
        </el-aside>
        <!-- 兼容ie -->
        <el-container :style="'width: calc(100vw - ' + asideWidth + ')'">
            <el-header :height="headerHeight">
                <div
                        class="fram-header"
                        v-show="headerView !== 'hidden'"
                        :class="{ 'fixed-header': headerView === 'fixed'}"
                        :style="{ 'margin-left': headerView === 'fixed' ? asideWidth : 0 }">
                    <system-info>
                        <router-view name="headInfo" key="headInfo"/>
                    </system-info>
                    <tags-view v-if="tagsView"></tags-view>
                    <!-- 右边栏 -->
                    <settings></settings>
                </div>
            </el-header>
            <!-- 兼容ie -->
            <el-main id="PageContainer" :style="fixedPage ? 'height: calc(100vh - ' + headerHeight + ')' : 'height: auto;'" style="padding: 10px;">
                <app-main></app-main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { Sidebar,SystemInfo,TagsView,Settings,AppMain } from './components'
import { mapGetters } from 'vuex'
import variables from '#/styles/variables.scss'

export default {
    name: 'Frame',
    components: {
        Sidebar,
        SystemInfo,
        TagsView,
        Settings,
        AppMain
    },
    data(){
        return {
            variables: variables
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
            'fixedPage',
            'headerView',
            'tagsView'
        ]),
        asideWidth(){
            return this.sidebar.opened ? this.variables.sidebarWidth : this.variables.collapseSidebarWidth
        },
        headerHeight(){
            return this.headerView === 'hidden' ? '0' :
                (this.tagsView ? '76px' : '40px')
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~#/styles/variables.scss";

    .fram-header{
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        background-color: $white;
        transition: width 0.28s ease 0s;
    }

    .fixed-header{
        position: fixed;
        top: 0px;
        right: 0px;
        left: 0px;
        z-index: 9;

        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    }
</style>