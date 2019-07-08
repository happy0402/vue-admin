<template>
    <div class="login-container">
        <el-form ref="loginForm" :rules="rules" :model="loginForm" class="login-form">
            <div class="title-container">
                <h2>{{ $t('login.title') }}</h2>
                <lang-select class="set-language"/>
            </div>

            <el-form-item prop="userName">
                <el-input
                        v-model="loginForm.userName"
                        prefix-icon="el-icon-user"
                        :placeholder="$t('login.userName')"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                        type="password"
                        v-model="loginForm.password"
                        prefix-icon="el-icon-key"
                        :placeholder="$t('login.password')"></el-input>
            </el-form-item>
            <el-form-item prop="app">
                <el-select
                        v-model="loginForm.appCode"
                        :placeholder="$t('login.apps')"
                        style="width: 100%;">
                    <i slot="prefix" class="el-input__icon el-icon-thumb"></i>
                    <el-option v-for="app in apps" :key="app.appCode" :label="app.appName" :value="app.appCode"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width: 100%">
                    {{ $t('login.login') }}
                </el-button>
            </el-form-item>

            <div style="color: #fff;">
                <p v-for="user in users" :key="user.userName">{{ $t('login.userName') }} : {{ user.userName }}  {{ $t('login.password') }} : {{ $t('login.any') }}</p>
            </div>
        </el-form>
    </div>
</template>

<script>
    /*正式系统代修改部分*/
    import apps from '#/test-data/apps.js' //获取系统所有可选应用
    import users from '#/test-data/user.js' //测试系统用户名提示
    import { userLogin } from '#/test-data/databaseServer.js' //虚拟登录接口

    import LangSelect from '#/components/LangSelect'
    import { resetRouter } from '#/router'
    import { resetLang } from '#/lang'
    import { resetStore } from '#/store'

    export default {
        name: 'Login',
        components: { LangSelect },
        data() {
            return {
                loginForm: {
                    userName: 'frame',
                    password: '123456',
                    appCode: 'introduction'
                },
                apps: apps, /*正式系统代修改部分*/
                users: users /*正式系统代修改部分*/
            }
        },
        computed: {
            rules(){
                return {
                    userName: [
                        { required: true, message: this.$util.valid.message.required(this.$t('login.userName')), trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: this.$util.valid.message.required(this.$t('login.password')), trigger: 'blur' },
                    ],
                    appCode: [
                        { required: true, message: this.$util.valid.message.required(this.$t('login.apps')), trigger: 'change' }
                    ]
                }
            }
        },
        watch: {
            $route: {
                handler: function(route) {
                    //未实现
                    this.redirect = route.query && route.query.redirect;
                },
                immediate: true
            }
        },
        methods: {
            onSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        //登录 /*正式系统代修改部分*/
                        userLogin(this.loginForm).then((result) => {
                            if(!result.code){
                                //设置全局变量
                                this.$store.dispatch('user/setUserInfo', result.data.user);
                                this.$store.dispatch('app/setAppMsg', result.data.app);
                                this.$store.dispatch('app/setRoutes', result.data.routes);

                                //重新初始化系统
                                resetRouter(result.data.routes);
                                resetStore(result.data.app.appCode);
                                resetLang(result.data.app.appCode);

                                //页面切换，进入系统
                                this.$router.push({ path: this.redirect || '/' });
                            }else{
                                this.$message.warning(result.msg);
                            }
                        }).catch((error) => {
                            this.$message.error(error);
                        })
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "~#/styles/variables.scss";

    .login-container{
        width: 100%;
        min-height: 100%;
        background-color: $blue;
        overflow: hidden;

        .login-form{
            width: 370px;
            position: absolute;
            top: 45%;
            left: 50%;
            transform: translate(-50%,-50%);

            .title-container{
                text-align: center;
                color: $white;
                position: relative;

                .set-language{
                    color: $white;
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    font-size: 18px;
                }
            }

            .el-input--medium {
                font-size: 16px;

                .el-input__icon {
                    line-height: 40px;
                }
            }

            input{
                background: rgba(0,0,0,0.1);
                color: #fff;
                height: 40px;
                line-height: 40px;
                border-color: rgba(255,255,255,0.1);
            }
        }
    }
</style>