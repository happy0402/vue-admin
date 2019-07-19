<template>
    <vue-code-mirror :code="directiveDrag"></vue-code-mirror>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                directiveDrag: `<template>
    <!-- 若绑定复杂的组件且事件不生效，可使用 .native 关键字。如：@dragStart.native -->
    <component
        v-drag
        @dragStart="dragStart"
        @drag="drag"
        @dragStop="dragStop"></component>
</template>

<script>
    import drag from '#/directive/drag'

    export default {
        directives:{
          drag
        },
        methods:{
            dragStart(params){
                //params.x  拖动开始时的 X 轴坐标
                //params.y  拖动开始时的 Y 轴坐标
                //params.event
            },
            drag(params){
                //params.offsetX  拖动过程中，X 轴的偏移距离
                //params.offsetY  拖动过程中，Y 轴的偏移距离
                //params.x  当前鼠标位置的 X 轴坐标
                //params.y  当前鼠标位置的 Y 轴坐标
                //params.event
            },
            dragStop(){
                //params.offsetX  X 轴的总偏移距离
                //params.offsetY  Y 轴的总偏移距离
                //params.x  当前鼠标位置的 X 轴坐标
                //params.y  当前鼠标位置的 Y 轴坐标
                //params.event
            }
        }
    }
<\/script>`
            }
        }
    }
</script>