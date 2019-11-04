import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

import store from '#/store';

import Cookies from 'js-cookie';

Vue.use(Router);

const createRouter = (routes) => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes,
    // scrollBehavior:
    // - only available in html5 history mode
    // - defaults to no scroll behavior
    // - return false to prevent scroll
    // - https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js
    // scrollBehavior (to, from, savedPosition) {
    //     if (savedPosition) {
    //         // savedPosition is only available for popstate navigations.
    //         return savedPosition
    //     } else {
    //         const position = {}
    //
    //         // scroll to anchor by returning the selector
    //         if (to.hash) {
    //             position.selector = to.hash
    //
    //             // specify offset of the element
    //             // if (to.hash === '#anchor2') {
    //             //     position.offset = { y: 100 }
    //             // }
    //
    //             // bypass #1number check
    //             if (/^#\d/.test(to.hash) || document.querySelector(to.hash)) {
    //                 return position
    //             }
    //
    //             // if the returned position is falsy or an empty object,
    //             // will retain current scroll position.
    //             return false
    //         }
    //
    //         return new Promise(resolve => {
    //             // check if any matched route config has meta that requires scrolling to top
    //             if (to.matched.some(m => m.meta.scrollToTop)) {
    //                 // coords will be used if no selector is provided,
    //                 // or if the selector didn't match any element.
    //                 position.x = 0
    //                 position.y = 0
    //             }
    //
    //             // wait for the out transition to complete (if necessary)
    //             this.app.$root.$once('triggerScroll', () => {
    //                 // if the resolved position is falsy or an empty object,
    //                 // will retain current scroll position.
    //                 resolve(position)
    //             })
    //         })
    //     }
    // }
});

const router = createRouter(routes);

router.beforeEach((to, from, next) => {
    Vue.prototype.$loadingBar.start();

    var token = Cookies.get('token');
    if(!token && to.path !== '/login'){
        //未登陆
        next(`/login?redirect=${window.location.hash.slice(1)}`);
    }

    if(token && to.path === '/login'){
        //已登陆
        next('/index');
    }

    store.dispatch('app/resetFixedPage') //页面高度初始化
    next();

    Vue.prototype.$loadingBar.finish();
});

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter(routes) {
    const newRouter = createRouter(routes);
    router.matcher = newRouter.matcher; // reset router
}

export default router;