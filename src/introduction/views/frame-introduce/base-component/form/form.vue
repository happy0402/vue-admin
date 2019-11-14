<template>
    <el-container style="height: 100%;">
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
                            label-width="60px"
                            :label-position="paramForm.labelPosition"
                            :size="paramForm.size ? 'mini' : 'small'"
                            :inline="paramForm.inline"
                            :disabled="paramForm.disabled"
                            style="height: 100%; overflow-y: overlay; padding-right: 20px;">
                        <el-form-item label="输入框" prop="input">
                            <el-input v-model="form.input"></el-input>
                        </el-form-item>
                        <el-form-item label="数字" prop="number">
                            <el-input-number v-model="form.number" :precision="2" :step="0.1" :max="10"></el-input-number>
                        </el-form-item>

                        <template v-if="paramForm.dynamicForm">
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
                        </template>

                        <el-form-item label="下拉框" prop="select">
                            <el-select v-model="form.select" placeholder="请选择">
                                <el-option label="选项一" value="option1"></el-option>
                                <el-option label="选项二" value="option2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="日期选择器" label-width="90px" prop="dareRange">
                            <sf-datePicker
                                    v-model="form.dateRange"
                                    type="daterange"
                                    placeholder="选择日期范围"
                                    :size="paramForm.size ? 'small' : 'default'"></sf-datePicker>
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
                                <el-form-item label="行内：">
                                    <el-switch v-model="paramForm.inline"></el-switch>
                                </el-form-item>
                                <el-form-item label="对齐方式：">
                                    <el-radio-group v-model="paramForm.labelPosition">
                                        <el-radio
                                                v-for="(item, index) in positions"
                                                :key="index"
                                                :label="item.code">{{ item.name }}</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="禁用表单：">
                                    <el-switch v-model="paramForm.disabled"></el-switch>
                                </el-form-item>
                                <el-form-item label="尺寸控制：">
                                    <el-switch v-model="paramForm.size"></el-switch>
                                </el-form-item>
                                <el-form-item label="动态增减：">
                                    <el-switch v-model="paramForm.dynamicForm"></el-switch>
                                </el-form-item>
                            </el-form>

                        </template>
                        <template slot="paneR">

                            <vue-code-mirror v-model="code"></vue-code-mirror>

                        </template>
                    </split-pane>
                </template>
            </split-pane>

        </el-main>
    </el-container>
</template>

<script>
    /* eslint-disable */
    import SplitPane from 'vue-splitpane'
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            SplitPane,
            VueCodeMirror
        },
        data(){
            return {
                positions: [
                    {
                        code: 'left',
                        name: '左对齐'
                    },
                    {
                        code: 'right',
                        name: '右对齐'
                    },
                    {
                        code: 'top',
                        name: '顶部对齐'
                    }
                ],
                paramForm:{
                    inline: false,
                    labelPosition: 'left',
                    disabled: false,
                    size: 'small',
                    dynamicForm: false
                },
                form: {
                    input: '',
                    number: 1,
                    domains: [
                        {
                            value: ''
                        }
                    ],
                    select: '',
                    dateRange: [],
                    switch: true,
                    checkbox: ['check1', 'check2'],
                    radio: 'radio1',
                    textarea: ''
                }
            }
        },
        computed:{
            code: {
                // getter
                get: function () {
                    return `<template>
    <el-form
        ref="form"
        :model="form"
        label-width="60px"${
                        this.paramForm.labelPosition !== 'right' ? '\n\t\tlabel-position="' + this.paramForm.labelPosition + '"' : ''}${
                        this.paramForm.inline ? '\n\t\tinline' : ''}${
                        this.paramForm.size ? '\n\t\tsize="mini"' : ''}${
                        this.paramForm.disabled ? '\n\t\tdisabled' : ''}>
        ${this.paramForm.disabled ? '\n\t\t<!-- 表单禁用只针对element-ui控件有效，非element-ui控件（如：日期选择器）请使用额外方式禁用 -->' : ''}
        <el-form-item label="输入框" prop="input">
            <el-input v-model="form.input"></el-input>
        </el-form-item>
        <el-form-item label="数字" prop="number">
            <el-input-number v-model="form.number" :precision="2" :step="0.1" :max="10"></el-input-number>
        </el-form-item>${this.paramForm.dynamicForm ? `

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
` : ''}
        <el-form-item label="下拉框" prop="select">
            <el-select v-model="form.select" placeholder="请选择">
                <el-option label="选项一" value="option1"></el-option>
                <el-option label="选项二" value="option2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期选择器" label-width="90px" prop="dateRange">
            <sf-datePicker
                    v-model="form.dateRange"
                    type="daterange"
                    placeholder="选择日期范围"${
                        this.paramForm.size ? `
                    size="small"` : ''}${
                        this.paramForm.disabled ? `
                    disabled` : ''}></sf-datePicker>
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
<script>
    export default {
        data(){
            return {
                form: {
                    input: '',
                    number: 1,${this.paramForm.dynamicForm ? `
                    domains: [
                        {
                            value: ''
                        }
                    ],`:''}
                    select: '',
                    dateRange: '',
                    switch: true,
                    checkbox: ['check1', 'check2'],
                    radio: 'radio1',
                    textarea: ''
                }
            }
        },
        methods: {
            insertRecord(){
                //新增，清空旧数据
                //在使用 resetFields 方法的情况下，el-form-item 的 prop 属性是必填的
                this.$refs.form.resetFields();
            },
            onSubmit() {
                this.$message.info('保存');
            }${this.paramForm.dynamicForm ? `,
            addDomain(){
                this.form.domains.push({
                    value: ''
                });
            },
            removeDomain(index){
                this.form.domains.splice(index, 1);
            }`:''}
        }
    }
<\/script>`;
                },
                // setter
                set: function (newValue) {

                }
            }
        },
        methods: {
            insertRecord(){
                this.$refs.form.resetFields();
            },
            onSubmit() {
                console.log(this.form);
                this.$message.info('保存');
            },
            addDomain(){
                this.form.domains.push({
                    value: ''
                });
            },
            removeDomain(index){
//                var index = this.paramForm.cols.indexOf(col)
//                if (index !== -1) {
                this.form.domains.splice(index, 1);
//                }
            }
        }
    }
</script>