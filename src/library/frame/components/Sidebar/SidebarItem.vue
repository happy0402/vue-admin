<template>
    <el-submenu v-if="hasChild" :index="completePath">
        <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ $t('menu.' + item.meta.title) }}</span>
        </template>
        <sidebar-item
                v-for="route in validMenu(item.children)"
                :key="route.name"
                :item="route"
                :parentNode ="node"></sidebar-item>
    </el-submenu>
    <el-menu-item v-else :index="completePath">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ $t('menu.' + item.meta.title) }}</span>
    </el-menu-item>
</template>

<script>
    import SidebarItem from './SidebarItem'
    import path from 'path'

    export default {
        name: 'SidebarItem',
        created(){
            if(!this.hasChild){
                this.$store.dispatch('app/addSearchRoute', this.node)
            }
        },
        components:{
            SidebarItem
        },
        props:{
            item: {
                type: Object,
                required: true
            },
            parentNode: Object
        },
        computed: {
            node(){
                if(!this.parentNode){
                    //此节点为父节点
                    return Object.assign({}, this.item, {
                        path: this.completePath,
                        title: [this.item.meta.title]
                    });
                }else{
                    //此节点为子节点
                    return Object.assign({}, this.item, {
                        path: this.completePath,
                        title: [ ...this.parentNode.title, this.item.meta.title]
                    });
                }
            },
            completePath(){
                return this.parentNode ? path.resolve(this.parentNode.path, this.item.path) : this.item.path;
            },
            hasChild(){
                return this.item.children && this.item.children.some((item) => {
                    return item.meta
                });
            }
        },
        methods: {
            validMenu(routes){
                return routes.filter((item) =>{
                    return item.meta.title
                })
            }
        }
    }
</script>