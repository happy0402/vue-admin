import Frame from '#/frame'

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
            }
        ]
    },
    {
        path: '/router',
        component: Frame,
        alwaysShow: true, // will always show the root menu
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
                // component: () => import('@/empty'),
                meta: {
                    title: 'routerChild',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                }
            }
        ]
    }
]