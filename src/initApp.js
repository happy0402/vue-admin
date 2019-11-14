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
import { hasPermission } from '#/router/routes.js'

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

Vue.mixin({
    beforeRouteEnter (to, from, next) {
        next(() => {
            // 通过 `vm` 访问组件实例
            //页面控件控制
            if(to.meta.controllers){
                let userRoles = store.getters.roles;
                to.meta.controllers.forEach((controller) => {
                    if(hasPermission(userRoles, controller)){
                        let $target = document.querySelector(controller.target);
                        if($target){
                            $target.style.display = 'none';
                        }
                    }
                });
            }
        });
    }
});

Vue.prototype.$util = Util;
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
