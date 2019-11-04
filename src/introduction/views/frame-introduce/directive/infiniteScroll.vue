<template>
    <div>
        <vue-code-mirror v-model="directiveInfiniteScroll"></vue-code-mirror>
    </div>
</template>

<script>
    /* eslint-disable */
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                directiveInfiniteScroll: `<template>
    <!-- 若绑定复杂的组件且事件不生效，可使用 .native 关键字。如：@reachEdge.native -->
    <!-- options: 默认目标容器为组件最外层|触发距离为50 @eg. v-infinite-scroll -->
    <!-- options: 可传string类型的 class|id，使用jq元素选择器 @eg. v-infinite-scroll="'.el-table__body-wrapper'" -->
    <!-- options: 可传object类型的配置项，options.target | options.scrollDistance @eg. v-infinite-scroll="options" -->
    <component
        v-infinite-scroll="options"
        @reachEdge.native="reachEdge"></component>
</template>

<script>
    import infiniteScroll from '#/directive/infiniteScroll';

    export default {
        directives:{
            infiniteScroll
        },
        data(){
            return {
                options: {
                    target: '.el-table__body-wrapper',
                    scrollDistance: 100
                }
            }
        },
        methods:{
            reachEdge(position){
                //position  'top'触顶 | 'bottom'触底
            }
        }
    }
<\/script>`
            }
        }
    }
</script>