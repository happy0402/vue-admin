<template>
    <el-tabs tab-position="left">
        <el-tab-pane lazy label="创建校验">
            <el-row>
                <el-col>
                    <h4>
                        Create Validator(创建校验)
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="createValidator"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        Validator Single Property(根据prop,进行校验)
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="validatorSingle"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        Validator All Rules(根据rules,进行校验)
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="validatorAll"></vue-code-mirror>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane lazy label="校验规则">
            <div class="contentTitle">
                <el-row>
                    <el-col>
                        此处校验规则为本系统特有规则，通用规则可查看
                        <el-link
                                href="https://github.com/yiminghe/async-validator#deep-rules"
                                target="_blank"
                                type="primary"
                                :underline="false">
                            Github官方网站<i class="el-icon-view el-icon--right"></i>
                        </el-link>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        使用方式及动态生成代码可使用：
                        <router-link to="/frame-introduction/base-component/form">基础组件 -> 表单 -> 校验规则</router-link>。
                        <el-tag type="danger">注：trigger为form特殊属性，正常的校验不提供trigger功能</el-tag>
                    </el-col>
                </el-row>
            </div>

            <el-row>
                <el-col>
                    <h4>
                        phone(手机号码)
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="phone"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        tel(电话号码)
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="tel"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        postalCode(邮政编码)
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="postalCode"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        checkIdCard(中国身份证号码)
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="checkIdCard"></vue-code-mirror>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane lazy label="提示信息">
            <el-row class="contentTitle">
                <el-col>
                    通用或类库提供的校验方法，类库提供统一的错误信息提示(部分提示可切换语种)。若用户自定义校验规则,则提示信息自设!
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        type(类型) : {{ $util.valid.message.type('string') }}
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="typeMessage"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        required(必填) : {{ $util.valid.message.required('label') }}
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="requiredMessage"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        range(长度范围) : {{ $util.valid.message.range(30, 50) }}
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="rangeMessage"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        len(长度值) : {{ $util.valid.message.len(50) }}
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="lenMessage"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        whitespace(空白) : {{ $util.valid.message.whitespace() }}
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="whitespaceMessage"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        phone(手机号码) : {{ $util.valid.message.phone() }}
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="phoneMessage"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        tel(电话号码) : {{ $util.valid.message.tel() }}
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="telMessage"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        postalCode(邮政编码) : {{ $util.valid.message.postalCode() }}
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror v-model="postalCodeMessage"></vue-code-mirror>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <h4>
                        checkIdCard(中国身份证号码) : 【校验方法提供返回值，返回值为错误信息】
                    </h4>
                </el-col>
            </el-row>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default{
        components: {
            VueCodeMirror
        },
        data(){
            return {
                createValidator: 'this.validator = this.$util.valid.createValidator(this.rules);//this.rules 参考校验规则',
                validatorSingle: `this.validator.validateSingleProp( { prop: 'test' } ).catch((errors) => {
    !errors || this.$message.warning(errors[0].message);
});`,
                validatorAll: `this.validator.validateAllRules( data, (errors) => {
    !errors || this.$message.warning(errors[0].message);
} );`,

                phone: 'this.$util.valid.phone ： /^1[3|4|5|7|8][0-9]{9}$/',
                tel: 'this.$util.valid.tel ： /^(\\(\\d{3,4}\\)|\\d{3,4}-)?\\d{7,8}$/',
                postalCode: 'this.$util.valid.postalCode ： /[1-9]\\d{5}(?!\\d)/',
                checkIdCard: 'this.$util.valid.checkIdCard(idCard)',

                typeMessage: `this.$util.valid.message.type('string')`,
                requiredMessage: `this.$util.valid.message.required('label')`,
                rangeMessage: `this.$util.valid.message.range(30, 50)`,
                lenMessage: `this.$util.valid.message.len(50)`,
                whitespaceMessage: `this.$util.valid.message.whitespace()`,
                phoneMessage: `this.$util.valid.message.phone()`,
                telMessage: `this.$util.valid.message.tel()`,
                postalCodeMessage: `this.$util.valid.message.postalCode()`,

            }
        }
    }
</script>

<style scoped="">
    .contentTitle{
        font-size: 16px;
        margin-bottom: 3px;
        font-weight: bold;
    }
</style>