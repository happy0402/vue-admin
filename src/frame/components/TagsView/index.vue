 <template>
    <div class="tags-view-container">
        <el-scrollbar ref="scrollbar" view-style="display: inline-block;">
            <router-link
                    ref="tag"
                    class="tags-view-item"
                    v-for="view in visitedViews"
                    :key="view.path"
                    :to="{ path: view.path, query: view.query, fullPath: view.fullPath }"
                    tag="span"
                    active-class="active-view"
                    @dblclick.left.prevent.native="closeTag(view)"
                    @click.right.prevent.native="openMenu(view, $event)">
                {{ $t('menu.' + view.title) }}
                <i v-if="!view.meta.affix" class="el-icon-close" @click.stop="closeTag(view)"></i>
            </router-link>
        </el-scrollbar>
        <ul
            v-show="showContextMemu"
            :style="'top:'+ contextMenuTop + 'px;left:'+ contextMenuLeft + 'px;'"
            class="context-menu">
            <li @click.left="closeOthersTags">{{ $t('tagsView.closeOthersTags') }}</li>
            <li @click.left="closeAllTags">{{ $t('tagsView.closeAllTags') }}</li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'TagsView',
        data(){
          return {
              showContextMemu: false,
              contextMenuTop: 0,
              contextMenuLeft: 0,
              selectedView: undefined
          }
        },
        computed: {
            ...mapGetters([
                'visitedViews',
                'searchRoutes'
            ])
        },
        watch: {
            $route(){
                var route = this.$route
                var that = this

                if (!this.visitedViews.some((view, index, array) => {
                    if(view.path === route.path){
                        //选中项定位
                        let tagPosition = index > (array.length / 2) ? that.$refs.tag[index].$el.offsetLeft + that.$refs.tag[index].$el.clientWidth : that.$refs.tag[index].$el.offsetLeft;
                        that.$refs.scrollbar.wrap.scrollLeft = tagPosition / that.$refs.scrollbar.$refs.resize.clientWidth * that.$refs.scrollbar.wrap.clientWidth
                        return true
                    }
                    return false
                })){
                    //添加新tag
                    this.$store.dispatch('tagsView/addVisitedView', route)

                    //新tag定位
                    this.$nextTick(function () {
                        this.$refs.scrollbar.wrap.scrollLeft = this.$refs.scrollbar.wrap.clientWidth
                    })
                }
            },
            showContextMemu(value) {
                if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                    document.body.removeEventListener('click', this.closeMenu)
                }
            }
        },
        methods:{
            initTags(){
                this.searchRoutes.forEach((item) => {
                    if(item.meta.affix){
                        this.$store.dispatch('tagsView/addVisitedView', Object.assign({},item,{
                            fullPath: item.path,
                        }))
                    }
                })
            },
            closeTag(view){
                this.$store.dispatch('tagsView/delVisitedView', view)
            },
            openMenu(view, $event){
                this.showContextMemu = true
                this.contextMenuTop = $event.y
                this.contextMenuLeft = $event.x
                this.selectedView = view
            },
            closeMenu(){
                this.showContextMemu = false
            },
            closeOthersTags(){
                this.$store.dispatch('tagsView/clearViews')
                this.initTags()
                this.$store.dispatch('tagsView/addVisitedView', this.selectedView)
            },
            closeAllTags(){
                this.$store.dispatch('tagsView/clearViews')
                this.initTags()
            }
        },
        mounted(){
            this.initTags()
            this.$store.dispatch('tagsView/addVisitedView', this.$route)
        }
    }
</script>

<style lang="scss">
    @import "~@/styles/variables.scss";

    .tags-view-container{
        padding: 0 13px;
        white-space: nowrap;

        .tags-view-item{
            display: inline-block;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            padding: 0 8px;
            font-size: 12px;
            margin: 5px 2px 5px;
            border: $firstBorder;

            .el-icon-close {
                width: 16px;
                height: 16px;
                vertical-align: 3px;
                border-radius: 50%;
                text-align: center;
                transition: all .3s cubic-bezier(.645, .045, .355, 1);
                transform-origin: 100% 50%;
                margin-right: -4px;

                &:before {
                    transform: scale(.6);
                    display: inline-block;
                    vertical-align: -3px;
                }

                &:hover {
                    background-color: $light-blue;
                    color: $white;
                }
            }
        }

        .active-view{
            background-color: $light-blue;
            color: $white;
            border: none;

            .el-icon-close:hover{
                background-color: $blue;
                color: $white;
            }
        }

        .context-menu{
            position: fixed;
            margin: 0;
            background: $white;
            z-index: 3000;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

            li {
                margin: 0;
                padding: 7px 16px;
                cursor: pointer;
                &:hover {
                    color: $tiffany;
                }
            }
        }
    }
</style>