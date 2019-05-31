<template>
  <div class="sidebar-container" :class="{'collapse-sidebar': collapse}">
    <sidebar-tool :collapse="collapse"></sidebar-tool>

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
              :default-active="activeMenu"
              :collapse="collapse"
              :background-color="variables.menuBg"
              :text-color="variables.menuText"
              :active-text-color="variables.menuActiveText"
              :collapse-transition="false"
              router>

        <sidebar-item v-for="route in validMenu" :key="route.name" :item="route"></sidebar-item>

      </el-menu>
    </el-scrollbar>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarTool from './SidebarTool'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import path from 'path'

export default {
  name: 'Sidebar',
  components: {
      SidebarTool,
      SidebarItem
  },
  computed: {
    ...mapGetters([
      'routes',
      'sidebar'
    ]),
    collapse() {
        return !this.sidebar.opened
    },
    validMenu(){
        //父节点无法显示，提升一级子集
        function itemValid(item){
            if(item.meta){
                return item
            }else{
                if(item.children){
                    for(let i = 0; i < item.children.length; i++){
                        item.children[i].path = path.resolve(item.path, item.children[i].path)
                        return itemValid(item.children[i])
                    }
                }
            }
        }

        return JSON.parse(JSON.stringify(this.routes)).map((item) => {
            return itemValid(item)
        }).filter((item) => {
            return item
        })
    },
    activeMenu() {
//      const { meta, path } = this.$route
      // if set path, the sidebar will highlight the path you set
//      if (meta.activeMenu) {
//        return meta.activeMenu
//      }
      return this.$route.path
    },
    variables() {
      return variables
    }
  }
}
</script>

<style lang="scss">
  @import '~@/styles/sidebar.scss';
</style>
