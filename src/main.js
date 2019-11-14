//登录校验
import store from '#/store';
import { resetRouter } from '#/router';
import { resetLang } from '#/lang';
import { resetStore } from '#/store';

import Cookies from 'js-cookie';

import { createMocks } from '#/mock';

import { getInfo } from '#/api/user.js' //登录接口
import { getRouters } from '#/router/routes.js'

//根据token获取用户登录信息
var token = Cookies.get('token');
if(token !== '' && token !== undefined){
    //重新设置token
    store.dispatch('user/setToken', token);

    //获取用户信息 /*正式系统待修正部分*/
    getInfo(token).then((result) => {
        //设置全局变量
        store.dispatch('user/setUserInfo', result.user);
        store.dispatch('app/setAppMsg', result.app);

        const routes = getRouters(result.app.appCode, result.user.roles);
        store.dispatch('app/setRoutes', routes);

        //重新初始化系统
        resetRouter(routes);
        resetStore(result.app.appCode);
        resetLang(result.app.appCode);

        //创建虚拟数据
        if(process.env.NODE_ENV === 'development'){
            var { default: mocks } = require('@/' + result.app.appCode + '/mock');
            createMocks(mocks);
        }

        require("./initApp");
    }).catch(() => {
        //无法获取用户登录信息，系统登出
        store.dispatch('user/resetUserInfo');
    });
}else{
    require("./initApp");
}