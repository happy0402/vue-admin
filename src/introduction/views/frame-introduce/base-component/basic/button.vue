<!-- 布局 -->
<template>
    <show-config-code :code="codeCreate" analyseCode>
        <template v-slot:config>
            <el-form
                    label-position="left"
                    :model="paramForm"
                    label-width="80px"
                    style="padding: 0 10px;">
                <el-row :gutter="10">
                    <el-col>
                        <el-form-item label="按钮组">
                            <el-switch
                                    v-model="paramForm.buttonGroup"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="文字">
                            <el-input v-model="paramForm.text"></el-input>
                        </el-form-item>
                        <el-form-item label="尺寸">
                            <el-select v-model="paramForm.size" placeholder="请选择类型">
                                <el-option
                                        v-for="(size,index) in sizeArray"
                                        :key="index"
                                        :label="size"
                                        :value="size">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="形状">
                            <el-checkbox v-model="paramForm.plain">朴素</el-checkbox>
                            <el-checkbox v-model="paramForm.round">圆角</el-checkbox>
                            <el-checkbox v-model="paramForm.circle">圆形</el-checkbox>
                        </el-form-item>
                        <el-form-item label="禁用">
                            <el-switch
                                    v-model="paramForm.disabled"
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
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="图标">
                            <el-input v-model="paramForm.icon"></el-input>
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="paramForm.type" placeholder="请选择类型">
                                <el-option
                                        v-for="(type,index) in typeArray"
                                        :key="index"
                                        :label="type"
                                        :value="type">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="加载中">
                            <el-switch
                                    v-model="paramForm.loading"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="默认聚焦">
                            <el-switch
                                    v-model="paramForm.autofocus"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </template>
    </show-config-code>
</template>

<script>
    import ShowConfigCode from '../ShowConfigCode.vue';

    export default {
        components:{
            ShowConfigCode
        },
        data(){
            return {
                sizeArray: ['default','medium', 'small', 'mini'],
                typeArray: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'text'],
                nativeTypeArray: ['button', 'submit', 'reset'],
                paramForm:{
                    buttonGroup: false,
                    text: '按钮',
                    size: 'default',
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
                        '\n\tsize="' + this.paramForm.size + '"'
                    }${this.paramForm.type === 'default' ? '' :
                    '\n\ttype="' + this.paramForm.type + '"'
                    }${
                    this.paramForm.plain ? '\n\tplain' : ''
                    }${
                    this.paramForm.round ? '\n\tround' : ''
                    }${
                    this.paramForm.circle ? '\n\tcircle' : ''
                    }${
                    this.paramForm.loading ? '\n\tloading' : ''
                    }${
                    this.paramForm.autofocus ? '\n\tautofocus' : ''
                    }${
                    this.paramForm.disabled ? '\n\tdisabled' : ''
                    }${this.paramForm.nativeType === 'button' ? '' :
                    '\n\tnative-type="' + this.paramForm.nativeType + '"'
                    }${this.paramForm.icon === '' ? '' :
                    '\n\ticon="' + this.paramForm.icon + '"'}
    >${this.paramForm.text}</el-button>`;

                return this.paramForm.buttonGroup ? '<el-button-group>\n\n\t' + buttonCode + '\n\n\t' + buttonCode + '\n\n</el-button-group>' : buttonCode;
            }
        }
    }
</script>