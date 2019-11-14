/**
 * Created by ZKX on 2019/5/12.
 * 若目录权限配置转移到数据库中,可能包括(推荐目录做加法,控件做减法): 1.目录控件表 2.用户表 3.角色表 4.角色-目录控件表 5.用户-角色表 6.用户-目录控件表
 */
import Frame from '#/frame'

/**
 * 判断当前用户是否有目录或控件的权限
 * @param userRoles
 * @param route
 */
export function hasPermission(userRoles, route) {
    if(route.roles){
        return userRoles.some(role => route.roles.includes(role))
    }

    return true;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes(routes, userRoles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (!tmp.meta || hasPermission(userRoles, tmp.meta)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, userRoles)
            }
            res.push(tmp)
        }
    });

    return res
}

const frontRoutes = [
    {
        path: '/login',
        component: () => import('#/frame/login')
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
                component: () => import('#/frame/error-page/404')
            }
        ]
    }
]

export function getRouters(appCode, userRoles){
    const { default: routes } = require('@/' + appCode + '/router');
    //页面路由过滤
    const appRoute = filterAsyncRoutes(routes, userRoles);
    const allRoutes = frontRoutes.concat(appRoute, behindRoutes);

    return allRoutes;
}

export default frontRoutes.concat(behindRoutes)