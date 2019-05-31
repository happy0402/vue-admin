import Frame from '@/frame'

//The name has to be unique
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
                path: 'third-component',
                name: 'ThirdComponent',
                component: () => import('@/views/frame-introduce'),
                meta: {
                    title: 'thirdComponent',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                },
                children: [
                    {
                        path: 'basic',
                        name: 'Basic',
                        meta: {
                            title: 'basic',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['container', 'layout', 'color', 'icon', 'button']
                        }
                    },
                    {
                        path: 'form',
                        name: 'Form',
                        meta: {
                            title: 'form',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'show-data',
                        name: 'ShowData',
                        meta: {
                            title: 'showData',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'notice',
                        name: 'Notice',
                        meta: {
                            title: 'notice',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'navigation',
                        name: 'Navigation',
                        meta: {
                            title: 'navigation',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'others',
                        name: 'Others',
                        meta: {
                            title: 'others',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    }
                ]
            },
            {
                path: 'second-component',
                name: 'SecondComponent',
                meta: {
                    title: 'secondComponent',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                },
                children: [
                    {
                        path: 'deal-data',
                        name: 'DealData',
                        meta: {
                            title: 'dealData',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'animate',
                        name: 'Animate',
                        meta: {
                            title: 'animate',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'tinymce',
                        name: 'Tinymce',
                        meta: {
                            title: 'tinymce',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    }
                ]
            },
            {
                path: 'directive',
                name: 'Directive',
                meta: {
                    title: 'directive',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                },
                children: [
                    {
                        path: 'drag',
                        name: 'Drag',
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