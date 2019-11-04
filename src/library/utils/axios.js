/**
 * Created by zkx on 2019/7/26.
 */
import Axios from 'axios';
import store from '#/store';
import { Message } from 'iview';
import Dialog from '#/components/Dialog';
import i18n from '#/lang/index';

// create an axios instance
const axios = Axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/mock' : '', // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
});

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['X-Token'] = store.getters.token
        }
        return config
    },
    error => {
        // 对请求错误做些什么
        console.log(error) // for debug
        return Promise.reject(error)
    }
);

// response interceptor
axios.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        // 对响应数据做点什么
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
            //请求失败
            Message.error({
                content: res.message || 'error',//提示内容
                duration: 5 * 1000 //自动关闭的延时，单位秒，不关闭可以写 0
            });

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                Dialog.warning({
                    title: i18n.$t('login.confirmLogout'),
                    content: i18n.$t('login.logoutContent'),
                    onOk: () => {
                        store.dispatch('user/resetUserInfo').then(() => {
                            location.reload()
                        });
                    }
                });
            }
            return Promise.reject(res.message || 'error')
        } else {
            //请求成功
            return res.data
        }
    },
    error => {
        // 对响应错误做点什么
        console.log('err' + error) // for debug
        Message.error({
            content: error.message,//提示内容
            duration: 5 * 1000 //自动关闭的延时，单位秒，不关闭可以写 0
        });
        return Promise.reject(error)
    }
);

export default axios;