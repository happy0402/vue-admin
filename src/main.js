import Vue from 'vue';
import './element' //部分引入 element-ui
import i18n from './lang' // Internationalization
import App from './App.vue'

import store from './store'
import router, { resetRouter } from './router'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

Vue.config.productionTip = false

function initVue(){
    //初始化应用
    new Vue({
        router,
        store,
        i18n,
        render: h => h(App),
    }).$mount('#app')
}

/*正式系统代修改部分 获取用户登录信息*/
import { getLoginInfoByToken } from '@/test-data/databaseServer.js'
import { Message } from 'element-ui'
//根据token获取用户登录信息
var token = Cookies.get('token');
if(token !== ''){
    //获取用户信息 /*正式系统代修改部分*/
    getLoginInfoByToken(token).then((result) => {
        if(!result.code){
            //全局变量设置
            store.dispatch('user/setUserInfo', result.data.user) //用户信息
            store.dispatch('app/setAppMsg', result.data.app) //应用类型

            store.dispatch('app/setRoutes', result.data.routes) //路由

            resetRouter(result.data.routes)
        }else{
            Message.warning(result.msg);
            //无法获取用户登录信息，系统登出
            store.dispatch('user/resetUserInfo')
        }

        initVue()
    }).catch((error) => {
        Message.error(error);
    })
}else{
    initVue()
}