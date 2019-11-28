import Frame from '#/frame';
// import EmptyMenu from '#/components/Menu/EmptyMenu.vue';
// import EmptyPage from '#/components/Menu/EmptyPage.vue'; //#/components/Menu/EmptyPage.vue为空白页

// const FrameViews = {
//     default: () => EmptyMenu,//具体目录组件所在位置，#/components/Menu/EmptyMenu.vue为空目录，无特殊父级组件时使用
//     headInfo: ()=> import('@/empty/views/headInfo.vue') //Frame框架提供的slot配置项
// };
//The name has to be unique
export default [
    {
        path: '/',
        component: Frame,
        redirect: '/index',
        children: [
            {
                path: 'index',
                // component: () => import('@/empty/views'),
                name: 'Index',
                meta: {
                    title: 'index',
                    icon: 'el-icon-s-home',
                    affix: true //tagsView default set
                }
            },
            {
                path: 'router',
                // components: FrameViews,
                // component: EmptyMenu,
                name: 'Router',
                meta: {
                    title: 'router',
                    icon: 'el-icon-tickets',
                    roles: ['frame', 'business'] // you can set roles in root nav
                },
                children: [
                    {
                        path: 'router-child',
                        name: 'RouterChild',
                        // component: EmptyPage,
                        meta: {
                            title: 'routerChild',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/router',
        component: Frame,
        name: 'Router',
        meta: {
            title: 'router',
            icon: 'el-icon-tickets',
            roles: ['frame', 'business'] // you can set roles in root nav
        },
        children: [
            {
                path: 'router-child',
                name: 'RouterChild',
                // components: FrameViews,
                // component: EmptyPage,
                meta: {
                    title: 'routerChild',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                }
            }
        ]
    }
]