<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="breadItem in breadList" :key="breadItem">{{ $t('menu.' + breadItem) }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default{
        name: 'Breadcrumb',
        data(){
            return {
                breadList: []
            }
        },
        computed: {
            ...mapGetters([
                'searchRoutes'
            ])
        },
        watch: {
            $route(){
                this.getBreadList()
            }
        },
        methods: {
            getBreadList(){
                if(this.$route.path !== '/index'){
                    let route = this.searchRoutes.filter((item) => {
                        return item.path === this.$route.path
                    })
                    this.breadList = route[0] ? route[0].title : []
                }else{
                    this.breadList = []
                }
            }
        },
        mounted(){
            this.getBreadList()
        }
    }
</script>