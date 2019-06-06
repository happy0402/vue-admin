/**
 * Created by tx on 2019/6/6.
 */
import Vue from 'vue';
import i18n from './lang'
import './element' //部分引入 element-ui

// Internationalization
import App from '@/App.vue'

import store from './store'
import router from './router'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './styles/index.scss' // global css

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
