/**
 * Created by Administrator on 2019/5/12.
 */
import Frame from '@/frame'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const frontRoutes = [
    {
        path: '/',
        component: Frame,
        redirect: '/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views'),
                name: 'Index',
                meta: {
                    title: 'index',
                    icon: 'el-icon-s-home',
                    affix: true //tagsView default set
                }
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/frame/login')
    }
]

const behindRoutes = [
    {
        path: '*',
        component: Frame,
        redirect: '404',
        children: [
            {
                path: '404',
                component: () => import('@/frame/error-page/404')
            }
        ]
    }
]

export function getRouters(loginInfo){
    var allRoutes = frontRoutes.concat(behindRoutes);

    let { default: routes } = require('./modules/' + loginInfo.app.appCode)
    let appRoute = filterAsyncRoutes(routes, loginInfo.user.roles);
    allRoutes = frontRoutes.concat(appRoute, behindRoutes);

    return allRoutes
}

export default frontRoutes.concat()