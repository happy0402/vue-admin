<template>
    <el-container>
        <el-aside :width="asideWidth">
            <sidebar></sidebar>
        </el-aside>
        <el-container>
            <el-header class="fram-header" :height="headerHeight">
                <div
                        v-show="headerView !== 'hidden'"
                        :class="{'fixed-header': headerView === 'fixed'}"
                        :style="{ 'margin-left': headerView === 'fixed' ? asideWidth : 0 }">
                    <system-info></system-info>
                    <tags-view v-if="tagsView"></tags-view>
                    <settings></settings>
                </div>
            </el-header>
            <el-main></el-main>
        </el-container>
    </el-container>
</template>

<script>
import { Sidebar,SystemInfo,TagsView,Settings } from './components'
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'

export default {
    name: 'Frame',
    components: {
        Sidebar,
        SystemInfo,
        TagsView,
        Settings
    },
    data(){
        return {
            variables: variables
        }
    },
    computed: {
        ...mapGetters([
            'sidebar',
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
    .fram-header{
        padding: 0;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

        .fixed-header{
            position: fixed;
            top: 0px;
            right: 0px;
            left: 0px;

            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
        }
    }
</style>