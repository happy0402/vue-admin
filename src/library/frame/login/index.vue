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
                <p>{{ $t('login.userName') }} : frame  {{ $t('login.password') }}:任意</p>
                <p>{{ $t('login.userName') }} : business  {{ $t('login.password') }}:任意</p>
            </div>
        </el-form>
    </div>
</template>

<script>
    import { userLogin, getInfo } from '#/api/user.js'
    import { fetchList as fetchAppsList } from '#/api/app.js'

    import LangSelect from '#/components/LangSelect'
    import { getRouters } from '#/router/routes.js'
    import { resetRouter } from '#/router'
    import { resetLang } from '#/lang'
    import { resetStore } from '#/store'

    import { createMocks } from '#/mock';

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
                apps: []
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
                        //登录
                        userLogin(this.loginForm).then((result) => {
                            this.$store.dispatch('user/setToken', result.token);

                            //获取用户信息
                            getInfo(result.token).then((result) => {
                                //设置全局变量
                                this.$store.dispatch('user/setUserInfo', result.user);
                                this.$store.dispatch('app/setAppMsg', result.app);

                                const routes = getRouters(result.app.appCode, result.user.roles);
                                this.$store.dispatch('app/setRoutes', routes);

                                //重新初始化系统
                                resetRouter(routes);
                                resetStore(result.app.appCode);
                                resetLang(result.app.appCode);

                                //创建虚拟数据
                                if(process.env.NODE_ENV === 'development'){
                                    var { default: mocks } = require('@/' + result.app.appCode + '/mock');
                                    createMocks(mocks);
                                }

                                //页面切换，进入系统
                                this.$router.push({ path: this.redirect || '/' });
                            });
                        });
                    }
                });
            }
        },
        created(){
            fetchAppsList().then((result) => {
                this.apps = result;
            });
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