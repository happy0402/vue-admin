/**
 * Created by tx on 2019/6/6.
 */
import Vue from 'vue';
import i18n from '#/lang/index'
import '#/iview' //部分引入 iview
import '#/element' //部分引入 element-ui
import '#/self' //部分引入 二方库

// Internationalization
import "babel-polyfill" //ie 10兼容

import App from './App.vue'

import store from '#/store'
import router from '#/router'

//快捷键设置
import { shortcutJS } from 'shortcutjs'
import shortcuts from '#/shortcuts.json'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '#/styles/index.scss' // global css

Vue.config.productionTip = false;

// optional debug param
shortcutJS.loadFromJson(shortcuts, {
    preventDefault: true,
});

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
