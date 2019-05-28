import Frame from '@/frame'

export default [
    {
        path: '/frame-introduce',
        component: Frame,
        alwaysShow: true, // will always show the root menu
        name: 'Frame',
        meta: {
            title: 'frameIntroduce',
            icon: 'el-icon-tickets',
            roles: ['frame', 'business'] // you can set roles in root nav
        },
        children: [
            {
                path: 'thirdComponent',
                name: 'thirdComponent',
                meta: {
                    title: 'thirdComponent',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                },
                children: [
                    {
                        path: 'basic',
                        name: 'basic',
                        component: () => import('@/views/frame-introduce/third-component/basic'),
                        meta: {
                            title: 'basic',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'form',
                        name: 'form',
                        meta: {
                            title: 'form',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'showData',
                        name: 'showData',
                        meta: {
                            title: 'showData',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'notice',
                        name: 'notice',
                        meta: {
                            title: 'notice',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'navigation',
                        name: 'navigation',
                        meta: {
                            title: 'navigation',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'others',
                        name: 'others',
                        meta: {
                            title: 'others',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    }
                ]
            },
            {
                path: 'secondComponent',
                name: 'secondComponent',
                meta: {
                    title: 'secondComponent',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                },
                children: [
                    {
                        path: 'dealData',
                        name: 'dealData',
                        meta: {
                            title: 'dealData',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'animate',
                        name: 'animate',
                        meta: {
                            title: 'animate',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'tinymce',
                        name: 'tinymce',
                        meta: {
                            title: 'tinymce',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    }
                ]
            },
            {
                path: 'directive',
                name: 'directive',
                meta: {
                    title: 'directive',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                },
                children: [
                    {
                        path: 'drag',
                        name: 'drag',
                        meta: {
                            title: 'drag',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        },
                    }
                ]
            }
        ]
    },
    {
        path: '/business',
        component: Frame,
        name: 'Business',
        meta: {
            title: 'business',
            icon: 'el-icon-suitcase-1',
            roles: ['frame', 'business'] // you can set roles in root nav
        }
    },
    {
        path: '/code-create',
        component: Frame,
        name: 'CodeCreate',
        meta: {
            title: 'codeCreate',
            icon: 'el-icon-document-copy',
            roles: ['frame', 'business'] // you can set roles in root nav
        }
    },
    {
        path: '/personal-center',
        component: Frame,
        name: 'PersonalCenter',
        meta: {
            title: 'personalCenter',
            icon: 'el-icon-s-custom',
            roles: ['frame', 'business'] // you can set roles in root nav
        }
    }
]