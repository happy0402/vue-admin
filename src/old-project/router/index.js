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
                component: () => import('@/old-project/views'),
                name: 'Index',
                meta: {
                    title: 'index',
                    icon: 'el-icon-s-home',
                    affix: true //tagsView default set
                }
            },
            {
                path: 'document-edit',
                component: () => import('#/components/Menu/EmptyMenu.vue'),
                children: [
                    {
                        path: 'index',
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
                path: 'code-create',
                component: () => import('#/components/Menu/EmptyMenu.vue'),
                name: 'CodeCreate',
                meta: {
                    title: 'codeCreate',
                    icon: 'el-icon-document-copy',
                    roles: ['frame', 'business'] // you can set roles in root nav
                },
                children: [
                    {
                        path: 'page-create',
                        name: 'PageCreate',
                        component: () => import('@/old-project/views/code-create/page-create'),
                        meta: {
                            title: 'pageCreate',
                        }
                    },
                    {
                        path: 'controller-create',
                        name: 'ControllerCreate',
                        component: () => import('@/old-project/views/code-create/form-controller'),
                        meta: {
                            title: 'controllerCreate',
                        }
                    },
                    {
                        path: 'table-create',
                        name: 'TableCreate',
                        component: () => import('@/old-project/views/code-create/table-create'),
                        meta: {
                            title: 'tableCreate',
                        }
                    },
                    {
                        path: 'dialog-create',
                        name: 'DialogCreate',
                        component: () => import('@/old-project/views/code-create/dialog-create'),
                        meta: {
                            title: 'dialogCreate',
                        }
                    },
                    {
                        path: 'cs-create',
                        name: 'CsCreate',
                        component: () => import('@/old-project/views/code-create/cs-create'),
                        meta: {
                            title: 'csCreate',
                        }
                    },
                    {
                        path: 'export-excel',
                        name: 'ExportExcel',
                        component: () => import('@/old-project/views/code-create/export-excel'),
                        meta: {
                            title: 'exportExcel',
                        }
                    },
                    {
                        path: 'print',
                        name: 'Print',
                        component: () => import('@/old-project/views/code-create/print'),
                        meta: {
                            title: 'print',
                        }
                    }
                ]
            }
        ]
    }
]