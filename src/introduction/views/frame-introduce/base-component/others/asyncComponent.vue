<template>
    <div>
        <p>
            <el-link
                    href="https://cn.vuejs.org/v2/guide/components-dynamic-async.html"
                    target="_blank"
                    type="primary"
                    :underline="false">
                VUE官方网址<i class="el-icon-view el-icon--right"></i>
            </el-link>
        </p>
        <div>
            <vue-code-mirror :code="code"></vue-code-mirror>
        </div>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                code: `<template>
    <component :is="asyncComponent"></component>
</template>

<script>
    import LoadingComponent from '#/components/AsyncComponent/LoadingComponent.vue'
    import ErrorComponent from '#/components/AsyncComponent/ErrorComponent.vue'

    export default{
        data(){
            return {
                AsyncComponent: () => ({
                  // 需要加载的组件 (应该是一个 'Promise' 对象)
                  component: import('./MyComponent.vue'), //需加载组件所在位置的路径
                  // 异步组件加载时使用的组件
                  loading: LoadingComponent,
                  // 加载失败时使用的组件
                  error: ErrorComponent,
                  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
                  delay: 200,
                  // 如果提供了超时时间且组件加载也超时了，
                  // 则使用加载失败时使用的组件。默认值是：'Infinity'
                  timeout: 3000
                })
            }
        }
    }
<\/script>`,
            }
        }
    }
</script>