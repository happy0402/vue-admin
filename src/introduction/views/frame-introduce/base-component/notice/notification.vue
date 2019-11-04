<template>
    <el-container>
        <el-header height="auto">
            <p>
                此处配置为常用配置,所有API请参考
                <el-link
                        href="https://element.eleme.cn/#/zh-CN/component/notification"
                        target="_blank"
                        type="primary"
                        :underline="false">
                    element-ui官方网站<i class="el-icon-view el-icon--right"></i>
                </el-link>
            </p>
        </el-header>
        <el-container>
            <el-aside width="40%">

                <el-divider>基础用法</el-divider>
                <p>
                    <el-button :plain="true" @click="open1">可自动关闭</el-button>
                    <el-button :plain="true" @click="open2">不会自动关闭</el-button>
                </p>

                <el-divider>带有倾向性</el-divider>
                <p>
                    <el-button :plain="true" @click="open3">成功</el-button>
                    <el-button :plain="true" @click="open4">警告</el-button>
                    <el-button :plain="true" @click="open5">消息</el-button>
                    <el-button :plain="true" @click="open6">错误</el-button>
                </p>

                <el-divider>自定义弹出位置</el-divider>
                <p>
                    <el-button :plain="true" @click="open7">右上角</el-button>
                    <el-button :plain="true" @click="open8">右下角</el-button>
                    <el-button :plain="true" @click="open9">左下角</el-button>
                    <el-button :plain="true" @click="open10">左上角</el-button>
                </p>

                <el-divider>使用HTML片段</el-divider>
                <p>
                    <el-button :plain="true" @click="open11">使用HTML片段</el-button>
                </p>

                <el-divider>关闭</el-divider>
                <p>
                    <el-button :plain="true" @click="open12">隐藏关闭按钮</el-button>
                    <el-button :plain="true" @click="open14">使用代码关闭</el-button>
                    <el-button :plain="true" @click="open15">关闭所有</el-button>
                </p>

                <el-divider>带有偏移</el-divider>
                <p>
                    <el-button :plain="true" @click="open13">偏移的消息</el-button>
                </p>

            </el-aside>
            <el-main>
                <vue-code-mirror v-model="code"></vue-code-mirror>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    /* eslint-disable */
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                code: '',
                notify: undefined,
                opened: false,
                basicCode: `//基本用法
//可自动关闭
const h = this.$createElement;
this.$notify({
    title: '标题名称',
    message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
});

//不会自动关闭
this.$notify({
    title: '提示',
    message: '这是一条不会自动关闭的消息',
    duration: 0
});`,
                tendency: `this.$notify.success({
    title: '这是一条成功的提示消息'
});

this.$notify.warning({
    title: '警告',
    message: '这是一条警告的提示消息'
});

this.$notify.info({
    title: '这是一条消息的提示消息'
});

this.$notify.error({
    title: '错误',
    message: '这是一条错误的提示消息'
});`,
                position: `this.$notify({
    title: '自定义位置',
    message: '右上角弹出的消息'
});

this.$notify({
    title: '自定义位置',
    message: '右下角弹出的消息',
    position: 'bottom-right'
});

this.$notify({
    title: '自定义位置',
    message: '左下角弹出的消息',
    position: 'bottom-left'
});

this.$notify({
    title: '自定义位置',
    message: '左上角弹出的消息',
    position: 'top-left'
});`
            }
        },
        methods:{
            open1() {
                const h = this.$createElement;

                this.$notify({
                    title: '标题名称',
                    message: h('i', { style: 'color: teal'}, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
                });

                this.code = this.basicCode;
            },

            open2() {
                this.$notify({
                    title: '提示',
                    message: '这是一条不会自动关闭的消息',
                    duration: 0
                });

                this.code = this.basicCode;
            },

            open3() {
                this.$notify.success({
                    title: '这是一条成功的提示消息'
                });

                this.code = this.tendency;
            },

            open4() {
                this.$notify.warning({
                    title: '警告',
                    message: '这是一条警告的提示消息'
                });

                this.code = this.tendency;
            },

            open5() {
                this.$notify.info({
                    title: '这是一条消息的提示消息'
                });

                this.code = this.tendency;
            },

            open6() {
                this.$notify.error({
                    title: '错误',
                    message: '这是一条错误的提示消息'
                });

                this.code = this.tendency;
            },

            open7() {
                this.$notify({
                    title: '自定义位置',
                    message: '右上角弹出的消息'
                });

                this.code = this.position;
            },

            open8() {
                this.$notify({
                    title: '自定义位置',
                    message: '右下角弹出的消息',
                    position: 'bottom-right'
                });

                this.code = this.position;
            },

            open9() {
                this.$notify({
                    title: '自定义位置',
                    message: '左下角弹出的消息',
                    position: 'bottom-left'
                });

                this.code = this.position;
            },

            open10() {
                this.$notify({
                    title: '自定义位置',
                    message: '左上角弹出的消息',
                    position: 'top-left'
                });

                this.code = this.position;
            },

            open11() {
                this.$notify({
                    title: 'HTML 片段',
                    dangerouslyUseHTMLString: true,
                    message: '<strong>这是 <i>HTML</i> 片段</strong>'
                });

                this.code = `this.$notify({
    title: 'HTML 片段',
    dangerouslyUseHTMLString: true,
    message: '<strong>这是 <i>HTML</i> 片段</strong>'
});`
            },

            open12() {
                this.$notify.success({
                    title: 'Info',
                    message: '这是一条没有关闭按钮的消息',
                    showClose: false
                });

                this.code = `this.$notify.success({
    title: 'Info',
    message: '这是一条没有关闭按钮的消息',
    showClose: false
});`
            },

            open13() {
                this.$notify({
                    title: '偏移',
                    message: '这是一条带有偏移的提示消息',
                    offset: 100
                });

                this.code = `this.$notify({
    title: '偏移',
    message: '这是一条带有偏移的提示消息',
    offset: 100
});`
            },

            open14() {
                if(this.opened){
                    this.notify.close();
                }else{
                    this.notify = this.$notify({
                        title: '提示',
                        message: '使用代码关闭消息',
                        duration: 0
                    });
                }
                this.opened = !this.opened;

                this.code = `this.notify = this.$notify({
    title: '提示',
    message: '使用代码关闭消息',
    duration: 0
});//打开

this.notify.close();//关闭`
            },

            open15(){
                this.$notify.closeAll();

                this.code = `this.$notify.closeAll();`;
            }
        }
    }
</script>