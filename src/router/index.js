import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Cookies from 'js-cookie'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

Vue.use(Router)

const createRouter = (routes) => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
})

const router = createRouter(routes)

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
    NProgress.start()

    var token = Cookies.get('token')

    if(token === ''){
        //未登陆
        if(to.path === '/login'){
            next()
        }else{
            next(`/login?redirect=${to.path}`)
        }
    }else{
        //已登陆
        if(to.path === '/login'){
            next('/')
        }else{
            next()
        }
    }
    NProgress.done()
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter(routes) {
    const newRouter = createRouter(routes)
    router.matcher = newRouter.matcher // reset router
}

export default router