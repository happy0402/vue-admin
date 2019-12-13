<!-- 布局 -->
<template>
    <show-config-code :code="codeCreate">
        <p>此处配置为二次封装后配置,较源生配置有些许不同。源生配置（都可使用）可参考
            <el-link
                    href="https://iviewui.com/components/date-picker"
                    target="_blank"
                    type="primary"
                    :underline="false">
                iview官方网站<i class="el-icon-view el-icon--right"></i>
            </el-link>
        </p>

        <template v-slot:show>
            <sf-datePicker
                    v-show="paramForm.type.key === 'date'"
                    type="date"
                    :options="options"
                    placeholder="选择日期"></sf-datePicker>
            <sf-datePicker
                    v-show="paramForm.type.key === 'daterange'"
                    type="daterange"
                    :options="options"
                    placeholder="选择日期范围"></sf-datePicker>
            <sf-datePicker
                    v-show="paramForm.type.key === 'datetime'"
                    type="datetime"
                    :options="options"
                    placeholder="选择日期时间"></sf-datePicker>
            <sf-datePicker
                    v-show="paramForm.type.key === 'datetimerange'"
                    type="datetimerange"
                    :options="options"
                    placeholder="选择日期时间范围"></sf-datePicker>
            <sf-datePicker
                    v-show="paramForm.type.key === 'year'"
                    type="year"
                    :options="options"
                    placeholder="选择年"></sf-datePicker>
            <sf-datePicker
                    v-show="paramForm.type.key === 'month'"
                    type="month"
                    :options="options"
                    placeholder="选择月"></sf-datePicker>
        </template>

        <template v-slot:config>
            <el-form
                    label-position="left"
                    :model="paramForm"
                    label-width="100px">
                <el-form-item label="类型">
                    <el-select v-model="paramForm.type" placeholder="请选择类型">
                        <el-option
                                v-for="(type,index) in typeArray"
                                :key="index"
                                :value="type"
                                :label="type.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="可选日期">
                    <el-radio-group v-model="paramForm.enableDate">
                        <el-radio label="auto">所有</el-radio>
                        <el-radio label="futrue">未来</el-radio>
                        <el-radio label="past">过去</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-divider>以下选项此页面不展示,请复制代码</el-divider>
                <el-form-item label="结果格式化">
                    <el-switch
                            v-model="paramForm.valueFormat">
                    </el-switch>
                </el-form-item>
                <el-form-item label="快捷方式">
                    <el-switch
                            v-model="paramForm.shortcuts">
                    </el-switch>
                </el-form-item>
                <el-form-item label="起始日期">
                    <el-switch
                            v-model="paramForm.startDate">
                    </el-switch>
                </el-form-item>
            </el-form>
        </template>
    </show-config-code>
</template>

<script>
    /* eslint-disable */
    import ShowConfigCode from '../ShowConfigCode.vue'

    export default {
        components: {
            ShowConfigCode
        },
        data(){
            return {
                typeArray: [
                    {
                        key: 'date',
                        value: '日期'
                    },
                    {
                        key: 'daterange',
                        value: '日期范围'
                    },
                    {
                        key: 'datetime',
                        value: '日期时间'
                    },
                    {
                        key: 'datetimerange',
                        value: '日期时间范围'
                    },
                    {
                        key: 'year',
                        value: '年'
                    },
                    {
                        key: 'month',
                        value: '月'
                    }
                ],
                paramForm: {
                    type: {
                        key: 'date',
                        value: '日期'
                    },
                    enableDate: 'auto',
                    valueFormat: false,
                    shortcuts: false,
                    startDate: false
                }
            }
        },
        computed: {
            options(){
                var that = this;
                return {
                    disabledDate (date) {
                        if (that.paramForm.enableDate === 'futrue') {
                            return date.valueOf() < Date.now();
                        }

                        if (that.paramForm.enableDate === 'past') {
                            return date.valueOf() > Date.now();
                        }

                        return false;
                    }
                };
            },
            codeCreate(){
                var code = `<template>
    <sf-datePicker
        ref="datePicker"
        v-model="date"
        type="${this.paramForm.type.key}"${
                    this.paramForm.enableDate !== 'auto' || this.paramForm.shortcuts ? '\n\t\t:options="options"' : ''
                    }${
                    this.paramForm.startDate ? '\n\t\t:start-date="new Date(1991, 4, 14)"' : ''
                    }
        placeholder="选择${this.paramForm.type.value}"${
                    this.paramForm.valueFormat ? '\n\t\tvalue-format="yyyy-MM-dd HH:mm:ss"' : ''
                    }></sf-datePicker>${
            this.paramForm.valueFormat ? '\n\t<!-- 配置value-format后,v-model的绑定值将直接进行格式化 --> ' +
                '\n\t<!-- 注：一旦配置此参数则不可进行 el-form 的配置校验 -->' : ''
                    }
</template>
<script>
    export default {
        data () {
            return {
                date: '',`;

                if (this.paramForm.enableDate !== 'auto' || this.paramForm.shortcuts) {
                    code += `\n\t\t\t\toptions: {
                `;

                    if (this.paramForm.enableDate === 'futrue') {
                        code += `\tdisabledDate (date) {
                        return date.valueOf() < Date.now();
                    },
                `
                    }

                    if (this.paramForm.enableDate === 'past') {
                        code += `\tdisabledDate (date) {
                        return date.valueOf() > Date.now();
                    },
                `
                    }

                    if (this.paramForm.shortcuts) {
                        if (this.paramForm.type.key === 'daterange' || this.paramForm.type.key === 'datetimerange') {
                            code += `\tshortcuts: [
                        {
                            text: '一星期前',
                            value () {
                                //如需自己控制逻辑，可不设置，并使用 onClick 回调
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                const end = new Date();
                                return [start, end];
                            },
                            onClick: (picker) => {
                                //picker为当前日期选择器的 Vue 实例
                                this.$message('点击一星期前');
                            }
                        }
                    ]
                `
                        } else {
                            code += `\tshortcuts: [
                        {
                            text: '今天',
                            value () {
                                //如需自己控制逻辑，可不设置，并使用 onClick 回调
                                return new Date();
                            },
                            onClick: (picker) => {
                                //picker为当前日期选择器的 Vue 实例
                                this.$message('点击今天');
                            }
                        }
                    ]
                `
                        }
                    }

                    code += `}`
                }

                code += `
            }
        }${
        !this.paramForm.valueFormat ? `,
        methods:{
            //this.$refs.datePicker.formatDate(date, 'yyyy-MM-dd HH:mm:ss'); //结果格式化
        }` : ''
                    }
    }
<\/script>`;

                return code;


            }
        }
    }
</script>