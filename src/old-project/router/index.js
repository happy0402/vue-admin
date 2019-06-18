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
            },
            {
                path: 'document-edit',
                component: () => import('@/old-project/views/document-edit'),
                name: 'DocumentEdit',
                meta: {
                    title: 'documentEdit',
                    icon: 'el-icon-document',
                    roles: ['frame', 'business'] // you can set roles in root nav
                }
            }
        ]
    },
    {
        path: '/code-create',
        component: Frame,
        name: 'CodeCreate',
        meta: {
            title: 'codeCreate',
            icon: 'el-icon-document-copy',
            roles: ['frame', 'business'] // you can set roles in root nav
        },
        children: [
            {
                path: 'csCreate',
                name: 'CsCreate',
                component: () => import('@/old-project/views/code-create/cs-create'),
                meta: {
                    title: 'csCreate',
                    roles: ['frame', 'business'] // you can set roles in root nav
                }
            }
        ]
    }
]