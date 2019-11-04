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
            icon: 'el-icon-tickets'
        },
        children: [
            {
                path: 'file-introduce',
                name: 'FileIntroduce',
                component: () => import('@/introduction/views/frame-introduce/fileIntroduce.vue'),
                meta: {
                    title: 'fileIntroduce'
                }
            },
            {
                path: 'page-develop',
                name: 'PageDevelop',
                component: () => import('@/introduction/views/frame-introduce/pageDevelop.vue'),
                meta: {
                    title: 'pageDevelop'
                }
            },
            {
                path: 'base-component',
                name: 'BaseComponent',
                component: () => import('@/introduction/views/frame-introduce'),
                meta: {
                    title: 'baseComponent'
                },
                children: [
                    {
                        path: 'basic',
                        name: 'Basic',
                        meta: {
                            title: 'basic',
                            modules: ['color', 'icon', 'button', 'link']
                        },
                        components: {
                            color: () => import('@/introduction/views/frame-introduce/base-component/basic/color.vue'),
                            icon: () => import('@/introduction/views/frame-introduce/base-component/basic/icon.vue'),
                            button: () => import('@/introduction/views/frame-introduce/base-component/basic/button.vue')
                        }
                    },
                    {
                        path: 'layout',
                        name: 'Layout',
                        meta: {
                            title: 'layout',
                            modules: ['container', 'splitPane', 'layout', 'card', 'divider']
                        },
                        components: {
                            container: () => import('@/introduction/views/frame-introduce/base-component/layout/container.vue'),
                            splitPane: () => import('@/introduction/views/frame-introduce/base-component/layout/splitPane.vue'),
                            layout: () => import('@/introduction/views/frame-introduce/base-component/layout/layout.vue')
                        }
                    },
                    {
                        path: 'form',
                        name: 'Form',
                        meta: {
                            title: 'form',
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
                            modules: ['loadingBar', 'tabs', 'steps', 'timeline', 'dropdown']
                        }
                    },
                    {
                        path: 'others',
                        name: 'Others',
                        meta: {
                            title: 'others',
                            modules: ['shortCut', 'clipboard', 'asyncComponent', 'print', 'codeMirror']
                        },
                        components: {
                            shortCut: () => import('@/introduction/views/frame-introduce/base-component/others/shortCut.vue'),
                            asyncComponent: () => import('@/introduction/views/frame-introduce/base-component/others/asyncComponent.vue'),
                            print: () => import('@/introduction/views/frame-introduce/base-component/others/print.vue'),
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
                    title: 'complexComponent'
                },
                children: [
                    {
                        path: 'data-table',
                        name: 'DataTable',
                        component: () => import('@/introduction/views/frame-introduce/complex-component/dataTable.vue'),
                        meta: {
                            title: 'dataTable'
                        }
                    },
                    {
                        path: 'animate',
                        name: 'Animate',
                        meta: {
                            title: 'animate'
                        }
                    },
                    {
                        path: 'tinymce',
                        name: 'Tinymce',
                        meta: {
                            title: 'tinymce'
                        }
                    }
                ]
            },
            {
                path: 'directive',
                name: 'Directive',
                component: () => import('#/components/Menu/EmptyMenu.vue'),
                meta: {
                    title: 'directive'
                },
                children: [
                    {
                        path: 'drag',
                        name: 'Drag',
                        component: () => import('@/introduction/views/frame-introduce/directive/drag.vue'),
                        meta: {
                            title: 'drag'
                        }
                    },
                    {
                        path: 'infinite-scroll',
                        name: 'InfiniteScroll',
                        component: () => import('@/introduction/views/frame-introduce/directive/infiniteScroll.vue'),
                        meta: {
                            title: 'infiniteScroll'
                        }
                    }
                ]
            },
            {
                path: 'util',
                name: 'Util',
                component: () => import('#/components/Menu/EmptyMenu.vue'),
                meta: {
                    title: 'util'
                },
                children: [
                    {
                        path: 'valid',
                        name: 'Valid',
                        component: () => import('@/introduction/views/frame-introduce/util/valid.vue'),
                        meta: {
                            title: 'valid'
                        }
                    },
                    {
                        path: 'string',
                        name: 'String',
                        component: () => import('@/introduction/views/frame-introduce/util/string.vue'),
                        meta: {
                            title: 'string'
                        }
                    },
                    {
                        path: 'moment',
                        name: 'Moment',
                        component: () => import('@/introduction/views/frame-introduce/util/moment.vue'),
                        meta: {
                            title: 'moment'
                        }
                    },
                    {
                        path: 'array',
                        name: 'Array',
                        meta: {
                            title: 'array'
                        }
                    },
                    {
                        path: 'object',
                        name: 'Object',
                        component: () => import('@/introduction/views/frame-introduce/util/object.vue'),
                        meta: {
                            title: 'object'
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
            icon: 'el-icon-suitcase-1'
        },
        children: [
            {
                path: 'introduction',
                component: () => import('@/introduction/views/frame-introduce'),
                name: 'Introduction',
                meta: {
                    title: 'introduction', // 目录名称：在lang中配置不同语言环境下的目录名称
                },
                children: [
                    {
                        path: 'introduction-components',
                        name: 'IntroductionComponents',
                        meta: {
                            title: 'introductionComponents', // 目录名称：在lang中配置不同语言环境下的目录名称
                            modules: ['codeMirror', 'markdown']
                        },
                        components: {
                            codeMirror: () => import('@/introduction/views/business/introduction/components/codeMirror.vue')
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/code-create',
        component: Frame,
        name: 'CodeCreate',
        meta: {
            title: 'codeCreate',
            icon: 'el-icon-document-copy'
        }
    },
    {
        path: '/personal-center',
        component: Frame,
        name: 'PersonalCenter',
        meta: {
            title: 'personalCenter',
            icon: 'el-icon-s-custom'
        },
        children:[
            {
                path: 'issues',
                component: () => import('@/introduction/views/personal-center/issues.vue'),//具体目录组件所在位置，#/components/Menu/EmptyMenu.vue为空目录，无特殊父级组件时使用
                name: 'Issues',
                meta: {
                    title: 'issues' // 目录名称：在lang中配置不同语言环境下的目录名称
                }
            },
            {
                path: 'issues-detail/:issueId',
                component: () => import('@/introduction/views/personal-center/issuesDetail.vue'),//具体目录组件所在位置，#/components/Menu/EmptyMenu.vue为空目录，无特殊父级组件时使用
                name: 'IssuesDetail'
            }
        ]
    }
]