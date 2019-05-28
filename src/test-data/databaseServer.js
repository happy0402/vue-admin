/**
 * Created by Administrator on 2019/5/16.
 */
//前端类库
import Cookies from 'js-cookie'

//前端方法
import { getRouters } from '@/router/routes.js'

//后端数据
import users from '@/test-data/user.js' //获取系统所有用户
import apps from '@/test-data/apps.js' //获取系统所有应用
//虚拟登录接口
export function userLogin (loginForm) {
    return new Promise((resolve) => {
        let loginResult = users.filter((item) => {
            return loginForm.userName === item.userName
        });

        if(loginResult.length){
            Cookies.set(loginResult[0].token, loginForm.app.appCode)

            let loginInfo = {
                user: loginResult[0],
                app: loginForm.app
            }
            let routes = getRouters(loginInfo)

            loginInfo.routes = routes

            resolve({
                code: 0,
                data: loginInfo
            })
        }else{
            resolve({
                code: -1,
                msg: '用户名不存在'
            })
        }
    })
}

export function getLoginInfoByToken(token){
    var appCode = Cookies.get(token)
    return new Promise((resolve) => {
        let user = users.filter((item) => {
            return item.token === token
        });
        let app = apps.filter((item) => {
            return item.appCode === appCode
        })

        if(user.length && app.length){
            let loginInfo = {
                user: user[0],
                app: app[0]
            }
            let routes = getRouters(loginInfo)

            loginInfo.routes = routes

            resolve({
                code: 0,
                data: loginInfo
            })
        }else{
            resolve({
                code: -1,
                msg: '无登陆信息'
            })
        }
    })
}
