<template>
    <div class="csCreate-container">
        <el-row :gutter="10">
            <el-col :span="8">
                <el-form label-position="left" :model="csForm" label-width="110px">
                    <el-form-item label="CsForm名称">
                        <el-input v-model="csForm.formName"></el-input>
                    </el-form-item>
                    <el-form-item label="HTML页面路径">
                        <el-input v-model="csForm.htmlPath"></el-input>
                    </el-form-item>
                    <el-divider>事件相关</el-divider>
                    <el-form-item label="事件名称">
                        <el-input v-model="csForm.eventName"></el-input>
                    </el-form-item>
                    <el-form-item
                            v-for="(param, index) in csForm.params"
                            :key="index"
                            label="参数">
                        <el-col :span="10">
                            <el-select
                                    v-model="param.paramType"
                                    placeholder="请选择参数类型"
                                    filterable
                                    default-first-option>
                                <el-option label="object" value="object"></el-option>
                                <el-option label="string" value="string"></el-option>
                                <el-option label="sbyte" value="sbyte"></el-option>
                                <el-option label="short" value="short"></el-option>
                                <el-option label="int" value="int"></el-option>
                                <el-option label="long" value="long"></el-option>
                                <el-option label="byte" value="byte"></el-option>
                                <el-option label="ushort" value="ushort"></el-option>
                                <el-option label="unit" value="unit"></el-option>
                                <el-option label="ulong" value="ulong"></el-option>
                                <el-option label="float" value="float"></el-option>
                                <el-option label="double" value="double"></el-option>
                                <el-option label="bool" value="bool"></el-option>
                                <el-option label="char" value="char"></el-option>
                                <el-option label="decimal" value="decimal"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="10" prop="paramName">
                            <el-input v-model="param.paramName"></el-input>
                        </el-col>
                        <el-col :span="4" class="alignRight">
                            <el-button @click.prevent="removeParam(param)" type="danger" icon="el-icon-minus" circle></el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="alignRight">
                        <el-col :span="24" class="alignRight">
                            <el-button @click.prevent="addDomain()" type="primary" icon="el-icon-plus" circle></el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="url名称">
                        <el-input v-model="csForm.urlName"></el-input>
                    </el-form-item>
                    <el-form-item label="请求方式">
                        <el-select
                                v-model="csForm.urlMethod"
                                placeholder="请选择接口请求方式">
                            <el-option label="get" value="get"></el-option>
                            <el-option label="post" value="post"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="接口名">
                        <el-input v-model="csForm.interfaceName"></el-input>
                    </el-form-item>
                    <el-form-item label="实体类名">
                        <el-input v-model="csForm.className"></el-input>
                    </el-form-item>
                    <el-form-item class="alignRight">
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="16">
                <el-row>
                    <el-col :span="24">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 4, maxRows: 8}"
                                placeholder="代码框"
                                v-model="urlCode">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 8, maxRows: 20}"
                                placeholder="代码框"
                                v-model="csCode">
                        </el-input>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                csForm: {
                    formName: 'Form',
                    htmlPath: 'Web/loading',
//                    event:[
//                        {
//
//                        }
//                    ]
                    eventName: 'ClickEvent',
                    params: [
                        {
                            paramType: 'string',
                            paramName: 'param'
                        }
                    ],
                    urlName: '_____urlName',
                    urlMethod: 'get',
                    interfaceName: '____interface',
                    className: '_____className'

                },
                csCode: '',
                urlCode: ''
            }
        },
        methods: {
            addDomain() {
                this.csForm.params.push({
                    paramType: 'string',
                    paramName: 'param'
                });
            },
            removeParam(param) {
                var index = this.csForm.params.indexOf(param)
                if (index !== -1) {
                    this.csForm.params.splice(index, 1)
                }
            },
            onSubmit() {
                var params = this.csForm.params

                /****** url注册代码生成 ******/
                this.urlCode = `//EMRClient.DAL.NSISApiURL.cs
case HttpUrl.${this.csForm.urlName}:
    {
        urladdress = conneckUrl + string.Format("api/NSIS/${this.csForm.interfaceName}`

                    if(params.length){
                        this.urlCode += '?'
                        for(let i = 0; i < params.length; i++){
                            this.urlCode += '_____={' + i + '}&';
                        }
                        this.urlCode = this.urlCode.slice(0,-1)
                        this.urlCode += '"'
                        for(let i = 0; i < params.length; i++){
                            this.urlCode += ', paras[' + i + ']';
                        }
                    }else{
                        this.urlCode += '"'
                    }

                this.urlCode +=`);${this.csForm.urlMethod === 'get' ? '': '\n\tmethod = "post";'}
        break;
    }`

                /****** cs代码生成 ******/
                this.csCode = `//${this.csForm.formName}.cs
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using KNYY.HttpHelp;
using EMRClient.DAL;
using EMRViewModels.Public;//OutPutModel
//using EMRViewModels;//实体类可能引用路径

namespace EMRClient
{
    [ComVisible(true)]
    public partial class ${this.csForm.formName} : DockContentEx
    {
        public ${this.csForm.formName}
        {
            InitializeComponent();
            this.webBrowser1.Navigate(new Uri(PublicClass.WebUrl + "${this.csForm.htmlPath}.html?t=" + DateTime.Now));
            this.webBrowser1.ObjectForScripting = this;
            PublicClass.MessageAlert = new MessageForm();
            //PublicClass.MessageSureAlert = new MessageSureForm();
        }
    }

    //js调用 -> window.external.${this.csForm.eventName}(`

            //页面调用注释
            for(let i = 0; i < params.length; i++){
                this.csCode += params[i].paramName + ',';
            }
            this.csCode = this.csCode.slice(0,-1)

            this.csCode +=`);
    public void ${this.csForm.eventName}(`

                //方法传参声明
                for(let i = 0; i < params.length; i++){
                    this.csCode += params[i].paramType + ' ' + params[i].paramName + ',';
                }
                this.csCode = this.csCode.slice(0,-1)


                this.csCode +=`)
    {
        List<string> params = new List<string>();
        `

                //url传参组装
                for(let i = 0; i < params.length; i++){
                    this.csCode += 'params.Add(' + params[i].paramName + ');\n\t';
                }

                this.csCode +=`Dictionary<string, string> httpurl = DAL.NSISApiURL.GetUrlAddress(NSISApiURL.HttpUrl.${this.csForm.urlName}, params);
        //获取Http  Api 数据 (url, method, param[POST], userId, hospitalId, departmentId)
        string respose = HttpHelp.HttpReq(httpurl["urladdress"], httpurl["method"]);

        try
        {
            OperateData<OutPutModel<${this.csForm.className}>> output = new OperateData<OutPutModel<${this.csForm.className}>>();
            OutPutModel<${this.csForm.className}> result = output.GetAsync(respose);
            if (result.resultStatus == "200")
            {
                //result.resultData 返回的数据
            }
            else
            {
                PublicClass.MessageAlert.ShowMessageBox(MessageForm.messageType.tip, result.msg);
            }
        }
        catch(Exception ex)
        {
            PublicClass.MessageAlert.ShowMessageBox(MessageForm.messageType.IsFail, "服务端数据连接异常");
        }
    }
}`
            }
        }
    }
</script>

<style lang="scss" scoped="">
    .alignRight{
        text-align: right;
    }
</style>