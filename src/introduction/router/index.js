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
        alwaysShow: true, // will always show the root Menu
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
                component: () => import('@/introduction/views/frame-introduce/fileIntroduce.vue'),
                meta: {
                    title: 'fileIntroduce',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                }
            },
            {
                path: 'page-develop',
                name: 'PageDevelop',
                component: () => import('@/introduction/views/frame-introduce/pageDevelop.vue'),
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
                            modules: ['container', 'splitPane', 'layout', 'divider', 'color', 'icon', 'button', 'link']
                        },
                        components: {
                            container: () => import('@/introduction/views/frame-introduce/base-component/basic/container.vue'),
                            splitPane: () => import('@/introduction/views/frame-introduce/base-component/basic/splitPane.vue'),
                            layout: () => import('@/introduction/views/frame-introduce/base-component/basic/layout.vue'),
                            color: () => import('@/introduction/views/frame-introduce/base-component/basic/color.vue'),
                            icon: () => import('@/introduction/views/frame-introduce/base-component/basic/icon.vue'),
                            button: () => import('@/introduction/views/frame-introduce/base-component/basic/button.vue')
                        }
                    },
                    {
                        path: 'form',
                        name: 'Form',
                        meta: {
                            title: 'form',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['switch', 'radio', 'checkbox', 'select', 'inputNumber', 'input', 'datePicker', 'transfer', 'form', 'formValid', 'validRules']
                        },
                        components: {
                            datePicker: () => import('@/introduction/views/frame-introduce/base-component/form/datePicker.vue'),
                            transfer: () => import('@/introduction/views/frame-introduce/base-component/form/transfer.vue'),
                            form: () => import('@/introduction/views/frame-introduce/base-component/form/form.vue'),
                            formValid: () => import('@/introduction/views/frame-introduce/base-component/form/formValid.vue'),
                            validRules: () => import('@/introduction/views/frame-introduce/base-component/form/validRules.vue')
                        }
                    },
                    {
                        path: 'show-data',
                        name: 'ShowData',
                        meta: {
                            title: 'showData',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['table', 'tableColumn', 'tree', 'badge']
                        },
                        components: {
                            table: () => import('@/introduction/views/frame-introduce/base-component/show-data/table.vue'),
                            tableColumn: () => import('@/introduction/views/frame-introduce/base-component/show-data/tableColumn.vue'),
                            tree: () => import('@/introduction/views/frame-introduce/base-component/show-data/tree.vue')
                        }
                    },
                    {
                        path: 'notice',
                        name: 'Notice',
                        meta: {
                            title: 'notice',
                            roles: ['frame', 'developer'], // or you can only set roles in sub nav
                            modules: ['tooltip', 'popover', 'loading', 'message', 'messageBox', 'dialog', 'notification']
                        },
                        components: {
                            loading: () => import('@/introduction/views/frame-introduce/base-component/notice/loading.vue'),
                            message: () => import('@/introduction/views/frame-introduce/base-component/notice/message.vue'),
                            messageBox: () => import('@/introduction/views/frame-introduce/base-component/notice/messageBox.vue'),
                            dialog: () => import('@/introduction/views/frame-introduce/base-component/notice/dialog.vue'),
                            notification: () => import('@/introduction/views/frame-introduce/base-component/notice/notification.vue')
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
                            modules: ['shortCut', 'asyncComponent', 'menu', 'codeMirror']
                        },
                        components: {
                            shortCut: () => import('@/introduction/views/frame-introduce/base-component/others/shortCut.vue'),
                            asyncComponent: () => import('@/introduction/views/frame-introduce/base-component/others/asyncComponent.vue'),
                            codeMirror: () => import('@/introduction/views/frame-introduce/base-component/others/codeMirror.vue')
                        }
                    }
                ]
            },
            {
                path: 'complex-component',
                name: 'ComplexComponent',
                component: () => import('#/components/Menu/EmptyMenu.vue'),
                meta: {
                    title: 'complexComponent',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                },
                children: [
                    {
                        path: 'data-table',
                        name: 'DataTable',
                        component: () => import('@/introduction/views/frame-introduce/complex-component/dataTable.vue'),
                        meta: {
                            title: 'dataTable',
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
                        path: 'print',
                        name: 'Print',
                        meta: {
                            title: 'print',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    }
                ]
            },
            {
                path: 'directive',
                name: 'Directive',
                component: () => import('#/components/Menu/EmptyMenu.vue'),
                meta: {
                    title: 'directive',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                },
                children: [
                    {
                        path: 'drag',
                        name: 'Drag',
                        component: () => import('@/introduction/views/frame-introduce/directive/drag.vue'),
                        meta: {
                            title: 'drag',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'infinite-scroll',
                        name: 'InfiniteScroll',
                        component: () => import('@/introduction/views/frame-introduce/directive/infiniteScroll.vue'),
                        meta: {
                            title: 'infiniteScroll',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    }
                ]
            },
            {
                path: 'util',
                name: 'Util',
                component: () => import('#/components/Menu/EmptyMenu.vue'),
                meta: {
                    title: 'util',
                    roles: ['frame', 'developer'] // or you can only set roles in sub nav
                },
                children: [
                    {
                        path: 'valid',
                        name: 'Valid',
                        component: () => import('@/introduction/views/frame-introduce/util/valid.vue'),
                        meta: {
                            title: 'valid',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'string',
                        name: 'String',
                        component: () => import('@/introduction/views/frame-introduce/util/string.vue'),
                        meta: {
                            title: 'string',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'moment',
                        name: 'Moment',
                        component: () => import('@/introduction/views/frame-introduce/util/moment.vue'),
                        meta: {
                            title: 'moment',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'array',
                        name: 'Array',
                        meta: {
                            title: 'array',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
                    },
                    {
                        path: 'object',
                        name: 'Object',
                        component: () => import('@/introduction/views/frame-introduce/util/object.vue'),
                        meta: {
                            title: 'object',
                            roles: ['frame', 'developer'] // or you can only set roles in sub nav
                        }
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