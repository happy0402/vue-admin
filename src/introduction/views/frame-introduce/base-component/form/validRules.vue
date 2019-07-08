<template>
    <show-config-code :code="codeCreate">
        <p>此处配置为常用配置,所有配置请查看
            <el-link
                    href="https://github.com/yiminghe/async-validator#deep-rules"
                    target="_blank"
                    type="primary"
                    :underline="false">
                Github官方网站<i class="el-icon-view el-icon--right"></i>
            </el-link>
        </p>

        <template v-slot:config>
            <el-form
                    label-position="left"
                    :model="paramForm"
                    label-width="80px">
                <el-divider>通用规则</el-divider>
                <el-form-item label="数据类型">
                    <el-radio-group v-model="paramForm.type" @change="typeChange">
                        <el-radio
                                v-for="(item, index) in typeArray"
                                :key="index"
                                :label="item">
                            {{ item }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="校验规则">
                    <el-checkbox-group v-model="paramForm.valid">
                        <el-checkbox label="required">非空</el-checkbox>
                        <el-checkbox label="transform">校验前处理</el-checkbox>
                        <el-checkbox label="validator">自定义校验</el-checkbox>
                        <el-checkbox label="asyncValidator">异步自定义校验</el-checkbox>
                        <div v-show="paramForm.type === 'string'">
                            <el-checkbox label="pattern">正则匹配</el-checkbox>
                            <el-checkbox label="range">字符长度范围</el-checkbox>
                            <el-checkbox label="length">字符长度</el-checkbox>
                            <el-checkbox label="whitespace">非仅空格</el-checkbox>
                        </div>
                        <div v-show="paramForm.type === 'array' || paramForm.type === 'object'">
                            <el-checkbox label="defaultField">defaultField(深层校验)</el-checkbox>
                            <el-checkbox label="fields">fields(深层校验)</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
                <div v-show="paramForm.type === 'string'">
                    <el-divider>自定义规则</el-divider>
                    <el-form-item label="校验规则">
                        <el-checkbox-group v-model="paramForm.selfValid">
                            <el-checkbox label="phone">手机号</el-checkbox>
                            <el-checkbox label="tel">座机号</el-checkbox>
                            <el-checkbox label="idCard">身份证号</el-checkbox>
                            <el-checkbox label="postalCode">中国邮政编码</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
            </el-form>
        </template>
    </show-config-code>
</template>

<script>
    import ShowConfigCode from '../ShowConfigCode.vue'

    export default {
        components: {
            ShowConfigCode
        },
        data(){
            return {
                typeArray:[ 'string' ,'number', 'date', 'array', 'object', 'url', 'email' ],
                paramForm: {
                    type: 'string',
                    valid: [ 'required' ],
                    selfValid: []
                }
            }
        },
        computed: {
            codeCreate(){
                var rules = [];

                for( let i = 0; i < this.paramForm.valid.length; i++ ){
                    switch(this.paramForm.valid[i]){
                        case 'required':
                            rules.push(`
    { type: '${this.paramForm.type}', required: true, message: this.$util.valid.message.required('label'), trigger: 'blur' }`);
                            break;
                        case 'validator':
                            rules.push(`
    {
        type: '${this.paramForm.type}',
        validator(rule,value,callback){
          return value === 'test';
        },
        message: '相关错误提示'
    },
    {
        type: '${this.paramForm.type}',
        validator(rule,value,callback){
            if(value === ''){
                callback(new Error('相关错误提示'));
            }else{
                callback();
            }
        }
    }${ this.paramForm.type === 'array' ? `,
    {
        type: 'array',
        validator(rule, value){
            return [
                new Error('相关错误提示'),
                new Error('相关错误提示'),
            ];
        }, trigger: 'blur'
    }` : ''}
    `);
                            break;
                        case 'asyncValidator':
                            rules.push(`
    {
        type: '${this.paramForm.type}',
        asyncValidator(rule,value,callback){
          ajax({
            url:'xx',
            value:value
          }).then(function(data){
            callback();
          },function(error){
            callback(new Error(error))
          });
        }, trigger: 'blur'
    }`);
                            break;
                        case 'pattern':
                            rules.push(`
    { pattern: /^[a-z]+$/, message: '相关错误提示', trigger: 'blur'}`);
                            break;
                        case 'range':
                            rules.push(`
    { min: 5, max: 50, message: this.$util.valid.message.range(5, 50), trigger: 'blur'}`);
                            break;
                        case 'length':
                            rules.push(`
    { len: 50, message: this.$util.valid.message.len(50), trigger: 'blur'}`);
                            break;
                        case 'whitespace':
                            rules.push(`
    { whitespace: true, message: this.$util.valid.message.whitespace(), trigger: 'blur'}`);
                            break;
                        case 'defaultField':
                            rules.push(`
    {
        type: "array",
        defaultField: {type: "string", message: "相关错误提示"}
    }`);
                            break;
                        case 'fields':
                            rules.push(`
    {
        type: "object",
        fields: {
          street: {type: "string", required: true, message: "相关错误提示"},
          city: {type: "string", required: true, message: "相关错误提示"},
          zip: {type: "string", required: true, len: 8, message: "相关错误提示"}
        }
    }
    //或
    {
        type: "array", required: true, len: 3,
        fields: {
          0: {type: "string", required: true, message: "相关错误提示"},
          1: {type: "string", required: true, message: "相关错误提示"},
          2: {type: "string", required: true, message: "相关错误提示"}
        }
    }`);
                            break;
                    }
                }

                for( let i = 0; i < this.paramForm.selfValid.length; i++ ){
                    switch(this.paramForm.selfValid[i]){
                        case 'phone':
                            rules.push(`
    { pattern: this.$util.valid.phone, message: this.$util.valid.message.phone(), trigger: 'blur'}`);
                            break;
                        case 'tel':
                            rules.push(`
    { pattern: this.$util.valid.tel, message: this.$util.valid.message.tel(), trigger: 'blur'}`);
                            break;
                        case 'idCard':
                            rules.push(`
    { validator: (rule,value,callback) => {
            //在 data 中声明 const _this = this;
            var valid = _this.$util.valid.checkIdCard(value);
            if(valid){
                callback(new Error(valid));
            }else{
                callback();
            }
        }, trigger: 'blur'
    }`);
                            break;
                        case 'postalCode':
                            rules.push(`
    { pattern: this.$util.valid.postalCode, message: this.$util.valid.message.postalCode(), trigger: 'blur'}`);
                            break;
                    }
                }

                return `//请修改 [prop] 为 <el-form-item> 上对应的prop属性
//请自行定义校验的触发机制 -- trigger${
this.paramForm.type === 'number' ? '\n//请使用 <el-input-number> 进行输入控制' : ''
                    }${
this.paramForm.valid.indexOf('transform') !== -1 ? `

//请将下面的代码放入具体的校验规则中，以进行校验前的处理
transform(value) {
  return value.trim();
}` : ''
                    }

prop: [${rules.toString(',')}
],`;
            }
        },
        methods:{
            typeChange(){
                this.paramForm.valid = [ 'required' ];
            }
        }
    }
</script>