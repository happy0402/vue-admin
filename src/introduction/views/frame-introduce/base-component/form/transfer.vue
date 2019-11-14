<template>
    <div>
        <p>
            <el-link
                    href="https://github.com/SortableJS/Vue.Draggable"
                    target="_blank"
                    type="primary"
                    :underline="false">
                Github官方网址<i class="el-icon-view el-icon--right"></i>
            </el-link>
            使用请参照：
            <el-link
                    href="https://sortablejs.github.io/Vue.Draggable/"
                    target="_blank"
                    type="primary"
                    :underline="false">
                Example<i class="el-icon-view el-icon--right"></i>
            </el-link>
        </p>
        <div>
            <vue-code-mirror v-model="code"></vue-code-mirror>
        </div>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'
    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                code: `//此组件未全局引入，使用前请先引入组件
import Draggable from 'vuedraggable';

export default {
    components:{
        Draggable
    }
}`
            }
        }
    }
</script>