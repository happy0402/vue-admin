<!-- 布局 -->
<template>
    <show-config-code :code="codeCreate" analyseCode>
        <template v-slot:config>
            <el-form
                    label-position="left"
                    :model="paramForm"
                    label-width="80px">
                <el-form-item label="按钮组">
                    <el-switch
                            v-model="paramForm.buttonGroup"
                            :active-value="true"
                            :inactive-value="false">
                    </el-switch>
                </el-form-item>
                <el-form-item label="文字">
                    <el-input v-model="paramForm.text"></el-input>
                </el-form-item>
                <el-form-item label="尺寸">
                    <el-radio v-for="(size,index) in sizeArray"
                              :key="index"
                              v-model="paramForm.size"
                              :label="size">{{ size }}</el-radio>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="paramForm.type" placeholder="请选择类型">
                        <el-option
                                v-for="type in typeArray"
                                :key="type"
                                :label="type"
                                :value="type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="形状">
                    <el-checkbox v-model="paramForm.plain">朴素</el-checkbox>
                    <el-checkbox v-model="paramForm.round">圆角</el-checkbox>
                    <el-checkbox v-model="paramForm.circle">圆形</el-checkbox>
                </el-form-item>
                <el-form-item label="加载中">
                    <el-switch
                            v-model="paramForm.loading"
                            :active-value="true"
                            :inactive-value="false">
                    </el-switch>
                </el-form-item>
                <el-form-item label="禁用">
                    <el-switch
                            v-model="paramForm.disabled"
                            :active-value="true"
                            :inactive-value="false">
                    </el-switch>
                </el-form-item>
                <el-form-item label="图标">
                    <el-input v-model="paramForm.icon"></el-input>
                </el-form-item>
                <el-form-item label="默认聚焦">
                    <el-switch
                            v-model="paramForm.autofocus"
                            :active-value="true"
                            :inactive-value="false">
                    </el-switch>
                </el-form-item>
                <el-form-item label="原生type">
                    <el-radio v-for="(nativeType,index) in nativeTypeArray"
                              :key="index"
                              v-model="paramForm.nativeType"
                              :label="nativeType">{{ nativeType }}</el-radio>
                </el-form-item>
            </el-form>
        </template>
    </show-config-code>
</template>

<script>
    import ShowConfigCode from '../show-config-code.vue'

    export default {
        name: 'Button',
        components:{
            ShowConfigCode
        },
        data(){
            return {
                sizeArray: ['medium', 'small', 'mini'],
                typeArray: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text'],
                nativeTypeArray: ['button', 'submit', 'reset'],
                paramForm:{
                    buttonGroup: false,
                    text: '按钮',
                    size: 'medium',
                    type: 'default',
                    plain: false,
                    round: false,
                    circle: false,
                    loading: false,
                    disabled: false,
                    icon: 'el-icon-edit',
                    autofocus: false,
                    nativeType: 'button'
                }
            }
        },
        computed: {
            codeCreate(){
                let buttonCode = `<el-button${
                    this.paramForm.size === 'medium' ? '' :
                        '\n\t\tsize="' + this.paramForm.size + '"'
                    }${this.paramForm.type === 'default' ? '' :
                    '\n\t\ttype="' + this.paramForm.type + '"'
                    }${
                    this.paramForm.plain ? '\n\t\tplain' : ''
                    }${
                    this.paramForm.round ? '\n\t\tround' : ''
                    }${
                    this.paramForm.circle ? '\n\t\tcircle' : ''
                    }${
                    this.paramForm.loading ? '\n\t\tloading' : ''
                    }${
                    this.paramForm.autofocus ? '\n\t\tautofocus' : ''
                    }${
                    this.paramForm.disabled ? '\n\t\tdisabled' : ''
                    }${this.paramForm.nativeType === 'button' ? '' :
                    '\n\t\tnative-type="' + this.paramForm.nativeType + '"'
                    }
                    icon="${this.paramForm.icon}"
            >${this.paramForm.text}</el-button>`

                return this.paramForm.buttonGroup ? '<el-button-group>\n\n\t' + buttonCode + '\n\n\t' + buttonCode + '\n\n</el-button-group>' : buttonCode
            }
        }
    }
</script>

<style lang="scss" scoped="">
    .alignRight{
        text-align: right;
    }
</style>