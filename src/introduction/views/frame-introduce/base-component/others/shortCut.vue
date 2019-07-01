<template>
    <div>
        <p>
            <el-link
                    href="https://github.com/coosto/ShortcutJS"
                    target="_blank"
                    type="primary"
                    :underline="false">
                Github官方网址<i class="el-icon-view el-icon--right"></i>
            </el-link>
        </p>
        <div>
            <h4>How to use?</h4>
            <vue-code-mirror :code="code"></vue-code-mirror>
            <h4>Action Name</h4>
            <vue-code-mirror :code="shortcuts"></vue-code-mirror>
        </div>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'
    import shortcuts from '#/shortcuts.json'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                code: `// --> yourComponent.js (any other file)
import { shortcutJS } from 'shortcutjs'

// Subscribe to the action created from the json
shortcutJS.subscribe('selectAll', ev => console.log('ctrl a have been triggered!', ev))`,
                shortcuts: JSON.stringify(shortcuts, null, 2)
            }
        }
    }
</script>