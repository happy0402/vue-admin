<template>
    <show-config-code :code="code">
        <template v-slot:show>
            <div style="text-align: center;">
                <div id="animateSandbox" style="display: inline-block;">
                    <h1 class="colorTransition">
                        Animate.css
                    </h1>
                </div>
            </div>
        </template>

        <template v-slot:config>
            <el-form
                    :model="animateConfig"
                    label-width="60px"
                    label-position="left">
                <el-form-item label="效果" prop="select">
                    <el-select v-model="animateConfig.animate" placeholder="请选择" @change="animationStart">
                        <el-option-group
                                v-for="animation in animations"
                                :key="animation.label"
                                :label="animation.label"
                                :value="animation.label">
                            <el-option
                                    v-for="item in animation.animation"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
                <el-form-item label="延时" prop="select">
                    <el-select v-model="animateConfig.delay" placeholder="请选择" @change="animationStart">
                        <el-option label="无" value=""></el-option>
                        <el-option label="2s" value="delay-2s"></el-option>
                        <el-option label="3s" value="delay-3s"></el-option>
                        <el-option label="4s" value="delay-4s"></el-option>
                        <el-option label="5s" value="delay-5s"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="速度" prop="select">
                    <el-select v-model="animateConfig.speed" placeholder="请选择" @change="animationStart">
                        <el-option label="无" value=""></el-option>
                        <el-option label="2s" value="slow"></el-option>
                        <el-option label="3s" value="slower"></el-option>
                        <el-option label="800ms" value="fast"></el-option>
                        <el-option label="500ms" value="faster"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="alignRight">
                    <el-button type="primary" @click="animationStart" :loading="btnLoading">Start</el-button>
                </el-form-item>
            </el-form>
        </template>
    </show-config-code>
</template>

<script>
    import 'animate.css'
    import ShowConfigCode from '../base-component/ShowConfigCode.vue'

    export default{
        components: {
            ShowConfigCode
        },
        data(){
            return {
                animations: [
                    {
                        label: '特别提醒',
                        animation: ['bounce','flash','pulse','rubberBand','shake','headShake','swing','tada','wobble','jello','heartBeat']
                    },
                    {
                        label: '跳入',
                        animation: ['bounceIn','bounceInDown','bounceInLeft','bounceInRight','bounceInUp']
                    },
                    {
                        label: '跳出',
                        animation: ['bounceOut','bounceOutDown','bounceOutLeft','bounceOutRight','bounceOutUp']
                    },
                    {
                        label: '渐变入',
                        animation: ['fadeIn','fadeInDown','fadeInDownBig','fadeInLeft','fadeInLeftBig','fadeInRight','fadeInRightBig','fadeInUp','fadeInUpBig']
                    },
                    {
                        label: '渐变出',
                        animation: ['fadeOut','fadeOutDown','fadeOutDownBig','fadeOutLeft','fadeOutLeftBig','fadeOutRight','fadeOutRightBig','fadeOutUp','fadeOutUpBig']
                    },
                    {
                        label: '翻转',
                        animation: ['flipInX','flipInY','flipOutX','flipOutY']
                    },
                    {
                        label: '冲刺',
                        animation: ['lightSpeedIn','lightSpeedOut']
                    },
                    {
                        label: '滚动入',
                        animation: ['rotateIn','rotateInDownLeft','rotateInDownRight','rotateInUpLeft','rotateInUpRight']
                    },
                    {
                        label: '滚动出',
                        animation: ['rotateOut','rotateOutDownLeft','rotateOutDownRight','rotateOutUpLeft','rotateOutUpRight']
                    },
                    {
                        label: '垂直入',
                        animation: ['zoomIn','zoomInDown','zoomInLeft','zoomInRight','zoomInUp']
                    },
                    {
                        label: '垂直出',
                        animation: ['zoomOut','zoomOutDown','zoomOutLeft','zoomOutRight','zoomOutUp']
                    },
                    {
                        label: '滑入',
                        animation: ['slideInDown','slideInLeft','slideInRight','slideInUp']
                    },
                    {
                        label: '滑出',
                        animation: ['slideOutDown','slideOutLeft','slideOutRight','slideOutUp']
                    },
                    {
                        label: '特殊',
                        animation: ['hinge','jackInTheBox','rollIn','rollOut']
                    }
                ],
                animateConfig: {
                    animate: 'tada',
                    delay: '',
                    speed: ''
                },
                code: '',
                btnLoading: false,
            }
        },
        methods: {
            animateCSS(element, animationNames, callback) {
                let that = this;
                const node = document.querySelector(element);
                node.classList.add('animated', ...animationNames);

                that.btnLoading = true;//页面按钮状态改变

                function handleAnimationEnd() {
                    node.classList.remove('animated', ...animationNames);
                    node.removeEventListener('animationend', handleAnimationEnd);

                    if (typeof callback === 'function') callback();

                    that.btnLoading = false;//页面按钮状态改变
                }

                node.addEventListener('animationend', handleAnimationEnd);
            },
            animationStart(){
                let animationNames = [this.animateConfig.animate];
                !this.animateConfig.delay || animationNames.push(this.animateConfig.delay);
                !this.animateConfig.speed || animationNames.push(this.animateConfig.speed);
                this.animateCSS('#animateSandbox', animationNames);

                this.code = `<template>
    <div id="animateSandbox">
        <h1>
            Animate.css
        </h1>
    </div>
</template>

<script>
    import 'animate.css';//动画库引入

    export default {
        methods: {
            //操作class的通用方法，直接使用即可
            animateCSS(element, animationNames, callback) {
                const node = document.querySelector(element);
                node.classList.add('animated', ...animationNames);

                function handleAnimationEnd() {
                    node.classList.remove('animated', ...animationNames);
                    node.removeEventListener('animationend', handleAnimationEnd);

                    if (typeof callback === 'function') callback();
                }
                node.addEventListener('animationend', handleAnimationEnd);
            }
        },
        mounted(){
            //给元素添加动画效果
            this.animateCSS('#animateSandbox', ['${animationNames.join("','")}'], function(){
                //动画结束后的回调函数
            });
        }
    }
<\/script>`
            }
        },
        mounted(){
            this.animationStart();
        }
    }
</script>

<style>
    .colorTransition{
        color: #f35626;
        background-image: linear-gradient(92deg, #f35626 0%,#feab3a 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: hue 60s infinite linear;
    }
</style>