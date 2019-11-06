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
            <vue-code-mirror v-model="code"></vue-code-mirror>
            <h4>Action Name</h4>
            <vue-code-mirror v-model="shortcuts"></vue-code-mirror>
            <h4>Key Map</h4>
            <vue-code-mirror v-model="keyMap"></vue-code-mirror>
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
shortcutJS.subscribe('deleteRow', ev => console.log('ctrl d have been triggered!', ev))`,
                shortcuts: JSON.stringify(shortcuts, null, 2),
                keyMap: `nums: 0 1 2 3 4 5 6 7 8 9
characters: a b c d e f g h i j k l m n o p q r s t u v w x y z
punctuation: , .
special: shift ctrl alt esc escape
navigation: left right up down backspace enter pageup pagedown end home tab
numpad: num0 num1 num2 num3 num4 num5 num6 num7 num8 num9 num* num+ num- num. num/
function keys: f1 f2 f3 f4 f5 f6 f7 f8 f9 f10 f11 f12`
            }
        }
    }
</script>