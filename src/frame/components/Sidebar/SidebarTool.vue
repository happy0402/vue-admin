<template>
    <div class="sidebar-tool">
        <el-autocomplete
                v-if="!collapse"
                class="sidebar-search"
                v-model="search"
                value-key="fullTitle"
                value="path"
                :fetch-suggestions="querySearch"
                placeholder="搜索目录..."
                @select="handleSelect"
                highlight-first-item
        >
            <i slot="suffix" @click="cancelSearch" :class="search === ''?'el-icon-search':'el-icon-circle-close'" class="el-input__icon el-icon-search"></i>
        </el-autocomplete>

        <i @click="sidebarToggle" :class="collapse?'el-icon-s-unfold':'el-icon-s-fold'"></i>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default{
        name: 'SidebarTool',
        props: {
            collapse: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                dataSource: '',
                search: ''
            }
        },
        computed: {
            ...mapGetters([
                'searchRoutes',
                'language'
            ])
        },
        watch: {
            language(){
                this.dealDataSource()
            }
        },
        methods:{
            dealDataSource(){
                var that = this
                this.dataSource = JSON.parse(JSON.stringify(this.searchRoutes))
                this.dataSource = this.dataSource.map((item) => {
                    item.title = item.title.map(title => that.$t('menu.' + title))
                    item.fullTitle = item.title.join('>')
                    return item
                })
            },
            querySearch(queryString, callback) {
                var results = queryString ? this.dataSource.filter(this.createFilter(queryString)) : this.dataSource;
                // 调用 callback 返回建议列表的数据
                callback(results);
            },
            createFilter(queryString) {
                return (item) => {
                    return (item.fullTitle.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            sidebarToggle(){
                this.$store.dispatch('app/toggleSidebar')
            },
            handleSelect(item){
                this.$router.push(item.path)
            },
            cancelSearch(){
                this.search = ''
            }
        },
        mounted(){
            this.dealDataSource()
        }
    }
</script>