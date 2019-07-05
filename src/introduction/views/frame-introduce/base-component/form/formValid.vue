<template>
    <el-container>
        <el-header height="auto">
            <p>此处为可能用到的表单配置项，完整API请参考
                <el-link
                        href="https://element.eleme.cn/?#/zh-CN/component/form"
                        target="_blank"
                        type="primary"
                        :underline="false">
                    element-ui官方网站<i class="el-icon-view el-icon--right"></i>
                </el-link>
            </p>
        </el-header>
        <el-main>

            <split-pane :min-percent='10' :default-percent='30' split="vertical">
                <template slot="paneL">

                    <el-form
                            ref="form"
                            :model="form"
                            label-width="80px"
                            label-position="left"
                            :rules="rules"
                            :hide-required-asterisk="paramForm.hideRequiredAsterisk"
                            :show-message="paramForm.showMessage"
                            :inline="paramForm.inlineMessage"
                            :inline-message="paramForm.inlineMessage"
                            :status-icon="paramForm.statusIcon"
                            :validate-on-rule-change="paramForm.validateOnRruleChange"
                            style="height: 100%; overflow-y: overlay; padding-right: 20px;">
                        <el-form-item label="输入框" prop="input">
                            <el-input v-model="form.input"></el-input>
                        </el-form-item>

                        <el-form-item
                                v-for="(domain, index) in form.domains"
                                :label="'动态控件' + index"
                                label-width="90px"
                                :key="index"
                                prop="domains"
                                class="alignRight">
                            <el-input v-model="domain.value" style="width: 100%;padding-right: 40px;"></el-input>
                            <el-button @click.prevent="removeDomain(index)" type="danger" icon="el-icon-minus" circle style="position: absolute;top: 0; right: 0;"></el-button>
                        </el-form-item>
                        <el-form-item class="alignRight">
                            <el-button @click.prevent="addDomain()" type="primary" icon="el-icon-plus" circle></el-button>
                        </el-form-item>

                        <el-form-item label="下拉框" prop="select">
                            <el-select v-model="form.select" placeholder="请选择">
                                <el-option label="选项一" value="option1"></el-option>
                                <el-option label="选项二" value="option2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="日期选择器" label-width="110px" prop="dateRange">
                            <DatePicker
                                    v-model="form.dateRange"
                                    type="daterange"
                                    split-panels
                                    placeholder="选择日期范围"
                                    @on-change="$refs.form.validateField('dateRange')"></DatePicker>
                        </el-form-item>
                        <el-form-item label="开关" prop="switch">
                            <el-switch v-model="form.switch"></el-switch>
                        </el-form-item>
                        <el-form-item label="多选框" prop="checkbox">
                            <el-checkbox-group v-model="form.checkbox">
                                <el-checkbox label="check1">多选1</el-checkbox>
                                <el-checkbox label="check2">多选2</el-checkbox>
                                <el-checkbox label="check3">多选3</el-checkbox>
                                <el-checkbox label="check4" disabled>多选4</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="单选框" prop="radio">
                            <el-radio-group v-model="form.radio">
                                <el-radio label="radio1">单选1</el-radio>
                                <el-radio label="radio2">单选2</el-radio>
                                <el-radio label="radio3" disabled>单选3</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="输入框" prop="textarea">
                            <el-input type="textarea" v-model="form.textarea"></el-input>
                        </el-form-item>
                        <el-form-item class="alignRight">
                            <el-button @click="insertRecord">新增</el-button>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                        </el-form-item>
                    </el-form>

                </template>
                <template slot="paneR">
                    <split-pane split="horizontal" :min-percent='5' :default-percent='10'>
                        <template slot="paneL">

                            <el-form inline :model="paramForm">
                                <el-form-item label="红色星号">
                                    <el-switch v-model="paramForm.hideRequiredAsterisk"></el-switch>
                                </el-form-item>
                                <el-form-item label="错误信息">
                                    <el-switch v-model="paramForm.showMessage"></el-switch>
                                </el-form-item>
                                <el-form-item label="行内展示校验信息">
                                    <el-switch v-model="paramForm.inlineMessage"></el-switch>
                                </el-form-item>
                                <el-form-item label="反馈图标">
                                    <el-switch v-model="paramForm.statusIcon"></el-switch>
                                </el-form-item>
                                <el-form-item label="规则改变后立即校验">
                                    <el-switch v-model="paramForm.validateOnRruleChange"></el-switch>
                                </el-form-item>
                                <el-form-item label="移除校验结果">
                                    <el-switch v-model="paramForm.clearValidate"></el-switch>
                                </el-form-item>
                                <el-form-item label="校验事件">
                                    <el-switch v-model="paramForm.validateEvent"></el-switch>
                                </el-form-item>
                            </el-form>

                        </template>
                        <template slot="paneR">

                            <vue-code-mirror :code="code"></vue-code-mirror>

                        </template>
                    </split-pane>
                </template>
            </split-pane>

        </el-main>
    </el-container>
</template>

<script>
    import SplitPane from 'vue-splitpane'
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            SplitPane,
            VueCodeMirror
        },
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('输入框'  + this.$t('valid.inputRequired')));
                } else {
                    callback();
                }
            };

            return {
                paramForm:{
                    hideRequiredAsterisk: false,
                    showMessage: true,
                    inlineMessage: false,
                    statusIcon: false,
                    validateOnRruleChange: true,
                    clearValidate: false,
                    validateEvent: false
                },
                form: {
                    input: '',
                    domains: [
                        {
                            value: ''
                        }
                    ],
                    select: '',
                    dateRange: '',
                    switch: true,
                    checkbox: ['check1', 'check2'],
                    radio: 'radio1',
                    textarea: ''
                },
                rules: {
                    input: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    domains: [
                        {   type:'array',
                            required: true,
                            defaultField: {
                                type: "object",
                                required: true,
                                fields: {
                                    value: {
                                        type: "string",
                                        required: true,
                                        message: '动态值' + this.$t('valid.inputRequired')
                                    }
                                }
                            }
                        }
                    ],
                    select: [
                        { required: true, message: '下拉框' + this.$t('valid.selectRequired'), trigger: 'change' }
                    ],
                    dateRange: [
                        { type: 'array', required: true, defaultField: { type: "date", required: true, message: '日期' + this.$t('valid.selectRequired') } }
                    ],
                    checkbox: [
                        { type: 'array', required: true, message: '复选框' + this.$t('valid.selectRequired'), trigger: 'change' }
                    ],
                    radio: [
                        { required: true, message: '单选框' + this.$t('valid.selectRequired'), trigger: 'change' }
                    ],
                    textarea: [
                        { required: true, message: '输入框'  + this.$t('valid.inputRequired'), trigger: 'blur' },
                        { min: 5, max: 50, message: '长度在 5 到 50 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        computed:{
            code(){
                return `//此处代码仅展示表单校验时需配置的内容，请在 【表单】 代码的基础上进行配置
<template>
    <el-form
        :rules="rules"${
        this.paramForm.hideRequiredAsterisk ? '\n\t\thide-required-asterisk' : ''
                    }${
        !this.paramForm.showMessage ? '\n\t\t:show-message="false"':''
                    }${
        this.paramForm.inlineMessage ? '\n\t\tinline-message':''
                    }${
        this.paramForm.statusIcon ? '\n\t\tstatus-icon':''
                    }${
        !this.paramForm.validateOnRruleChange ? '\n\t\t:validate-on-rule-change="false"':''
                    }${
        this.paramForm.validateEvent ? '\n\t\t@validate="validateFormItem"':''
                    }>

        <el-form-item label="日期选择器" label-width="90px" prop="dateRange">
            <DatePicker
                    @on-change="$refs.form.validateField('dateRange')"></DatePicker>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        data(){
            return {
                rules: {
                    input: [
                        { required: true, message: '输入框'  + this.$t('valid.inputRequired'), trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                   domains: [
                        {   type:'array',
                            required: true,
                            defaultField: {
                                type: "object",
                                required: true,
                                fields: {
                                    value: {
                                        type: "string",
                                        required: true,
                                        message: '动态值' + this.$t('valid.inputRequired')
                                    }
                                }
                            }
                        }
                    ],
                    select: [
                        { required: true, message: '下拉框' + this.$t('valid.selectRequired'), trigger: 'change' }
                    ],
                    dateRange: [
                        { type: 'array', required: true, defaultField: { type: "date", required: true, message: '日期' + this.$t('valid.selectRequired') } }
                    ],
                    checkbox: [
                        { type: 'array', required: true, message: '复选框' + this.$t('valid.selectRequired'), trigger: 'change' }
                    ],
                    radio: [
                        { required: true, message: '单选框' + this.$t('valid.selectRequired'), trigger: 'change' }
                    ],
                    textarea: [
                        { required: true, message: '输入框'  + this.$t('valid.inputRequired'), trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {${
                    this.paramForm.clearValidate ? `
            //this.$refs.form.clearValidate('dateRange');//传入待移除的表单项的 prop 属性 [ (不传则移除所有结果) | string | array ]`:''
                    }${
                    this.paramForm.validateEvent ? `
            validateFormItem(prop, valid, errorMsg){
                //被校验的表单项 prop 值，校验是否通过，错误消息（如果存在）
            },`:''
                    }
            onSubmit() {
                 //在使用 validate 方法的情况下，el-form-item 的 prop 属性是必填的
                this.$refs.form.validate().then(() => {
                    this.$message.info('保存');
                }).catch(() => {
                    this.$message.warning('未通过校验');
                });
                //或
//                this.$refs.form.validate((valid) => {
//                    if (valid) {
//                        this.$message.info('保存');
//                    } else {
//                        this.$message.warning('未通过校验');
//                        return false;
//                    }
//                });
            }
        }
    }
<\/script>`
            }
        },
        methods: {
            insertRecord(){
                this.$refs.form.resetFields();
            },
            onSubmit() {
                console.log(this.form.domains);
                this.$refs.form.validate().then(() => {
                    this.$message.info('保存');
                }).catch(() => {

                    this.$message.warning('未通过校验');
                });
            },
            addDomain(){
                this.form.domains.push({
                    value: ''
                });
            },
            removeDomain(index){
                this.form.domains.splice(index, 1);
            }
        }
    }
</script>