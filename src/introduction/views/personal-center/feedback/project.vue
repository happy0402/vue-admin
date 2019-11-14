<template>
    <el-row :gutter="10">
        <el-col :span="6" v-for="app in apps" :key="app.appCode">
            <i-card :to="{ name: 'Issues', params: { projectCode: app.appCode }}">
                <p>
                    {{ app.appName }}
                </p>
                <p class="appDescription">
                    {{ app.description }}
                </p>

                <el-link
                        slot="extra"
                        type="primary"
                        :underline="false"
                        @click="configProject($event)"
                        style="font-size: 16px;">
                    <i class="el-icon-setting"></i>
                </el-link>
            </i-card>
        </el-col>
    </el-row>
</template>

<script>
    import { fetchList as fetchAppsList } from '#/api/app.js'

    export default{
        data(){
            return {
                apps: []
            }
        },
        methods:{
            configProject($event){
                $event.stopPropagation();
            }
        },
        created(){
            fetchAppsList().then((result) => {
                this.apps = result;
            });
        },
    }
</script>

<style lang="scss" scoped="">
    @import "~#/styles/variables.scss";

    .appDescription{
        margin-top: 10px;
        color: $grey;
    }
</style>