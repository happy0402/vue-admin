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
                component: () => import('@/introduction/views'),
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
        path: '/frame-introduction',
        component: Frame,
        alwaysShow: true, // will always show the root menu
        name: 'FrameIntroduction',
        meta: {
            title: 'frameIntroduce',
            icon: 'el-icon-tickets',
            roles: ['frame', 'business'] // you can set roles in root nav
        },
        children: [
            {
                path: 'file-introduce',
                name: 'FileIntroduce',
                component: () => import('@/introduction/views/frame-introduce/file-introduce'),
                meta: {
                    title: 'fileIntroduce',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                }
            },
            {
                path: 'page-develop',
                name: 'PageDevelop',
                component: () => import('@/introduction/views/frame-introduce/page-develop'),
                meta: {
                    title: 'pageDevelop',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                }
            },
            {
                path: 'base-component',
                name: 'BaseComponent',
                component: () => import('@/introduction/views/frame-introduce'),
                meta: {
                    title: 'baseComponent',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                },
                children: [
                    {
                        path: 'basic',
                        name: 'Basic',
                        meta: {
                            title: 'basic',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['container', 'layout', 'color', 'icon', 'button', 'link'] //, 'splitPane'
                        }
                    },
                    {
                        path: 'form',
                        name: 'Form',
                        meta: {
                            title: 'form',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['switch', 'radio', 'checkbox', 'select', 'inputNumber', 'input', 'datePicker', 'transfer', 'form']
                        }
                    },
                    {
                        path: 'show-data',
                        name: 'ShowData',
                        meta: {
                            title: 'showData',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['table', 'tableColumn', 'tree', 'badge']
                        }
                    },
                    {
                        path: 'notice',
                        name: 'Notice',
                        meta: {
                            title: 'notice',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['loading', 'message', 'messageBox', 'modal', 'notification']
                        }
                    },
                    {
                        path: 'navigation',
                        name: 'Navigation',
                        meta: {
                            title: 'navigation',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['tabs', 'steps']
                        }
                    },
                    {
                        path: 'others',
                        name: 'Others',
                        meta: {
                            title: 'others',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['dialog', 'tooltip', 'popover', 'divider', 'shortCut', 'codeMirror']
                        }
                    }
                ]
            },
            {
                path: 'complex-component',
                name: 'ComplexComponent',
                component: () => import('@/introduction/views/frame-introduce'),
                meta: {
                    title: 'complexComponent',
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
                    },
                    {
                        path: 'other',
                        name: 'Other',
                        meta: {
                            title: 'other',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['loadingComponent', 'errorComponent']
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