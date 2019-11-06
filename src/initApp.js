/**
 * Created by zkx on 2019/6/6.
 */
import Vue from 'vue';
import i18n from '#/lang/index'

import '#/iview' //部分引入 iview
import '#/element' //部分引入 element-ui
import '#/self' //部分引入 二方库

import App from './App.vue'

import store from '#/store'
import router from '#/router'

//工具类导入
import Util from '#/utils'

//快捷键文件导入
import { shortcutJS } from 'shortcutjs'
import shortcuts from '#/shortcuts.json'

//全局样式导入
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '#/styles/index.scss' // global css

Vue.config.productionTip = false;

//快捷键设置
// optional debug param
shortcutJS.loadFromJson(shortcuts, {
    debug: false, // Prints debug notes in the console
    preventDefault: false, // Automatically calls ev.preventDefault() when an action is matched
    onlyStateCombos: false, // Only process combos which includes any state key (cmd, ctrl, alt, shift)
});

Vue.prototype.$util = Util;
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
