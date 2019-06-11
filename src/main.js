//登录校验
import store from '#/store'
import { resetRouter } from '#/router'
import { resetLang } from '#/lang'
import { resetStore } from '#/store'

import Cookies from 'js-cookie'
import { Message } from 'element-ui'

/*正式系统代修改部分 获取用户登录信息*/
import { getLoginInfoByToken } from '#/test-data/databaseServer.js'
//根据token获取用户登录信息
var token = Cookies.get('token');
if(token !== ''){
    //获取用户信息 /*正式系统代修改部分*/
    getLoginInfoByToken(token).then((result) => {
        if(!result.code){
            //设置全局变量
            store.dispatch('user/setUserInfo', result.data.user) //用户信息
            store.dispatch('app/setAppMsg', result.data.app) //应用类型
            store.dispatch('app/setRoutes', result.data.routes) //路由

            //初始化系统
            resetRouter(result.data.routes)
            resetLang(result.data.app.appCode)
            resetStore(result.data.app.appCode)
        }else{
            Message.warning(result.msg);
            //无法获取用户登录信息，系统登出
            store.dispatch('user/resetUserInfo')
        }

        require("./initApp");
    }).catch((error) => {
        Message.error(error);
    })
}else{
    require("./initApp");
}