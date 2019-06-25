<template>
    <el-container>
        <el-aside width="50%">
            <el-divider>基础用法</el-divider>
            <p>
                <el-button :plain="true" @click="open1">消息</el-button>
                <el-button :plain="true" @click="open2">成功</el-button>
                <el-button :plain="true" @click="open3">警告</el-button>
                <el-button :plain="true" @click="open4">错误</el-button>
                <el-button :plain="true" @click="loading">加载中</el-button>
            </p>
            <el-divider>可关闭</el-divider>
            <p>
                <el-button :plain="true" @click="closable">手动关闭的提示</el-button>
                <el-button :plain="true" @click="toggleTips">代码关闭的提示</el-button>
            </p>
            <el-divider>自定义 Render 函数</el-divider>
            <p>
                <el-button :plain="true" @click="renderFunc">显示render函数创建的内容</el-button>
            </p>
            <el-divider>关闭所有</el-divider>
            <p>
                <el-button :plain="true" @click="closeAll">关闭所有tips</el-button>
            </p>
        </el-aside>
        <el-main>
            <vue-code-mirror :code="code"></vue-code-mirror>
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
                msg: undefined,
                opened: false
            }
        },
        methods: {
            open1() {
                this.$message.info('这是一条消息提示');
                this.code = `this.$message.info('这是一条消息提示');`;
            },
            open2() {
                this.$message.success('恭喜你，这是一条成功消息');
                this.code = `this.$message.success('恭喜你，这是一条成功消息');`;
            },
            open3() {
                this.$message.warning('警告哦，这是一条警告消息');
                this.code = `this.$message.warning('警告哦，这是一条警告消息');`;
            },
            open4() {
                this.$message.error('错了哦，这是一条错误消息');
                this.code = `this.$message.error('错了哦，这是一条错误消息');`;
            },
            loading(){
                this.$message.loading('Loading...');
                this.code = `this.$message.loading('Loading...');`
            },
            closable(){
                this.$message.info({
                    content: '可手动关闭的提示',
                    duration: 0,
                    closable: true
                });
                this.code = `this.$message.info({
    content: '可手动关闭的提示', //提示内容
    duration: 0, //自动关闭的延时，单位秒，不关闭可以写 0
    closable: true, //是否显示关闭按钮
    onClose(){
        //关闭时的回调
    }
});`;
            },
            toggleTips(){
                if(this.opened){
                    this.msg()
                }else{
                    this.msg = this.$message.info({
                        content: '使用代码关闭的提示',
                        duration: 0
                    });
                }
                this.opened = !this.opened;

                this.code = `var msg = this.$message.info({
    content: '使用代码关闭的提示',//提示内容
    duration: 0 //自动关闭的延时，单位秒，不关闭可以写 0
});//打开

msg(); //关闭`
            },
            renderFunc(){
                this.$message.info({
                    render: h => {
                        return h('span', [
                            'This is created by ',
                            h('a', 'render'),
                            ' function'
                        ])
                    }
                });

                this.code = `this.$message.info({
    render: h => {
        return h('span', [
            'This is created by ',
            h('a', 'render'),
            ' function'
        ])
    }
});`
            },
            closeAll(){
                this.$message.destroy();
                this.code = `this.$message.destroy();`;
            }
        }
    }
</script>