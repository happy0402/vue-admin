<template>
    <right-panel>
        <h3>系统设置</h3>
        <el-form v-model="systemSettings" label-width="80px" label-position="left">
            <el-form-item label="系统头部">
                <el-radio-group v-model="systemSettings.headerView" size="mini" @change="headerViewChanged">
                    <el-radio-button label="embed">嵌入</el-radio-button>
                    <el-radio-button label="fixed">固定</el-radio-button>
                    <el-radio-button label="hidden">隐藏</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="标签页">
                <el-switch
                        v-model="systemSettings.tagsView"
                        :active-value="true"
                        :inactive-value="false"
                        @change="tagsViewChanged">
                </el-switch>
            </el-form-item>
        </el-form>
    </right-panel>
</template>

<script>
    import RightPanel from './RightPanel.vue'
    import { mapGetters } from 'vuex'
    import variables from '#/styles/variables.scss'

    export default {
        name: 'Settings',
        components: {
            RightPanel
        },
        data(){
            return {
                variables: variables
            }
        },
        computed:{
            ...mapGetters([
                'headerView',
                'tagsView'
            ]),
            systemSettings(){
                return {
                    headerView: this.headerView,
                    tagsView: this.tagsView
                }
            }
        },
        methods:{
            headerViewChanged(){
                this.$store.dispatch('settings/setHeaderView', this.systemSettings.headerView)
            },
            tagsViewChanged(){
                this.$store.dispatch('settings/toggleTagsView')
            }
        }
    }
</script>

<style lang="scss" scoped="">

</style>