<template>
    <el-container>
        <el-aside width="40%">
            <el-divider>消息提示框(基础用法)</el-divider>
            <p>
                <el-button :plain="true" @click="openBox('info')">消息</el-button>
                <el-button :plain="true" @click="openBox('success')">成功</el-button>
                <el-button :plain="true" @click="openBox('warning')">警告</el-button>
                <el-button :plain="true" @click="openBox('error')">错误</el-button>
            </p>
            <el-divider>确认对话框</el-divider>
            <p>
                <el-button :plain="true" @click="confirm">标准</el-button>
                <el-button :plain="true" @click="custom">自定义按钮</el-button>
                <el-button :plain="true" @click="async">异步关闭</el-button>
            </p>
            <el-divider>自定义内容</el-divider>
            <p>
                <el-button :plain="true" @click="handleRender">自定义内容</el-button>
            </p>
        </el-aside>
        <el-main>
            <vue-code-mirror v-model="code"></vue-code-mirror>
        </el-main>
    </el-container>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                code: '',
                value: 'test'
            }
        },
        methods: {
            openBox(type) {
                const title = '对话框的标题';
                const content = `<p>一些对话框内容</p><p>一些对话框内容</p>`;
                switch (type) {
                    case 'info':
                        this.$modal.info({
                            title: title,
                            content: content,
                            width: 500 //宽度，单位 px
                        });
                        break;
                    case 'success':
                        this.$modal.success({
                            title: title,
                            content: content,
                            closable: true //是否显示关闭按钮，可以按 Esc 键关闭
                        });
                        break;
                    case 'warning':
                        this.$modal.warning({
                            title: title,
                            content: content
                        });
                        break;
                    case 'error':
                        this.$modal.error({
                            title: title,
                            content: content
                        });
                        break;
                }

                this.code = `const title = '对话框的标题';
const content = '<p>一些对话框内容</p><p>一些对话框内容</p>';

this.$modal.info({
    title: title,
    content: content,
    width: 500 //宽度，单位 px
});

this.$modal.success({
    title: title,
    content: content,
    closable: true //是否显示关闭按钮，可以按 Esc 键关闭
});

this.$modal.warning({
    title: title,
    content: content
});

this.$modal.error({
    title: title,
    content: content
});`
            },
            confirm () {
                this.$modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
                    onOk: () => {
                        this.$message.info('点击了确定');
                    },
                    onCancel: () => {
                        this.$message.info('点击了取消');
                    }
                });

                this.code = `this.$modal.confirm({
    title: '确认对话框标题',
    content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
    onOk: () => {
        this.$message.info('点击了确定');
    },
    onCancel: () => {
        this.$message.info('点击了取消');
    }
});`;
            },
            custom () {
                this.$modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
                    okText: 'OK',
                    cancelText: 'Cancel'
                });

                this.code = `this.$modal.confirm({
    title: '确认对话框标题',
    content: '<p>一些对话框内容</p><p>一些对话框内容</p>',
    okText: 'OK',
    cancelText: 'Cancel'
});`;
            },
            async () {
                this.$modal.confirm({
                    title: '确认对话框标题',
                    content: '<p>对话框将在 2秒 后关闭</p>',
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            this.$modal.remove();
                            this.$message.info('异步关闭了对话框');
                        }, 2000);
                    }
                });

                this.code = `this.$modal.confirm({
    title: '确认对话框标题',
    content: '<p>对话框将在 2秒 后关闭</p>',
    loading: true, //点击确定按钮时，确定按钮是否显示 loading 状态，开启则需手动调用Modal.remove()来关闭对话框
    onOk: () => {
        setTimeout(() => {
            this.$modal.remove();
            this.$message.info('异步关闭了对话框');
        }, 2000);
    }
});`;
            },
            handleRender () {
                this.$modal.confirm({
                    render: (h) => {
                        var that = this;
                        return h('el-input', {
                            props:{
                              value: that.value //需注册data: value
                            },
                            on:{
                                input(value){
                                    that.value = value;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        this.$message.info(this.value);
                    }
                });

                this.code = `//render函数的编写请参考: https://cn.vuejs.org/v2/guide/render-function.html
//element-ui元素对VNode的支持并不完善，此处提供案例两个，请开发者多做尝试

this.$modal.confirm({
    render: (h) => {
        var that = this;
        return h('el-input', {
            props:{
              value: that.value //需注册data: value
            },
            on:{
                input(value){
                    that.value = value;
                }
            }
        })
    },
    onOk: () => {
        this.$message.info(this.value);
    }
});

this.$modal.confirm({
    render: (h) => {
        var that = this;
        return h('p', null, [
            h('el-radio', {
                props:{
                    value: that.value, //需注册data: value
                    label: 'test'
                },
                nativeOn:{
                    change(e){
                        console.log(e);
                        that.value = e.target.value
                    }
                }
            }, '测试'),
            h('el-radio', {
                props:{
                    value: that.value, //需注册data: value
                    label: 'text'
                },
                nativeOn:{
                    change(e){
                        console.log(e);
                        that.value = e.target.value
                    }
                }
            },'文本')
        ])
    },
    onOk: () => {
        console.log(this.value);
    }
});`
            }
        }
    }
</script>