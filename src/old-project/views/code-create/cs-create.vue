<template>
    <div class="csCreate-container">
        <el-row :gutter="10">
            <el-col :span="8">
                <p>string[] paras = new string[1];</p>
                <p>paras[0] = number;</p>
                <p>webBrowser1.Document.InvokeScript("functionName", paras);</p>
                <el-form label-position="left" :model="csForm" label-width="110px">
                    <el-form-item label="namespace">
                        <el-input v-model="csForm.namespace"></el-input>
                    </el-form-item>
                    <el-form-item label="CsForm名称">
                        <el-input v-model="csForm.formName"></el-input>
                    </el-form-item>
                    <el-form-item label="HTML页面路径">
                        <el-input v-model="csForm.htmlPath"></el-input>
                    </el-form-item>
                    <el-form-item class="alignRight">
                        <el-button type="primary" @click="createCs">提交</el-button>
                    </el-form-item>
                </el-form>

                <el-divider>事件相关</el-divider>
                <el-form label-position="left" :model="eventForm" label-width="110px">
                    <el-form-item label="请求方式">
                        <el-select
                                v-model="eventForm.urlMethod"
                                placeholder="请选择接口请求方式">
                            <el-option label="get" value="get"></el-option>
                            <el-option label="post" value="post"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="接口名">
                        <el-input v-model="eventForm.interfaceName"></el-input>
                    </el-form-item>
                    <el-form-item
                            v-for="(param, index) in eventForm.params"
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
                            <el-input v-model="param.paramName" @keyup.enter.native="addDomain"></el-input>
                        </el-col>
                        <el-col :span="4" class="alignRight">
                            <el-button @click.prevent="removeParam(param)" type="danger" icon="el-icon-minus" circle></el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="alignRight">
                        <el-col :span="24" class="alignRight">
                            <el-button @click.prevent="addDomain" type="primary" icon="el-icon-plus" circle></el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="url名称">
                        <el-input v-model="eventForm.urlName"></el-input>
                    </el-form-item>
                    <el-form-item label="事件名称">
                        <el-input v-model="eventForm.eventName"></el-input>
                    </el-form-item>
                    <el-form-item class="alignRight">
                        <el-button type="primary" @click="createEvent">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="16">
                <el-row>
                    <el-divider>窗体代码</el-divider>
                    <vue-code-mirror v-model="windowCode"></vue-code-mirror>

                    <el-divider>方法代码</el-divider>
                    <vue-code-mirror v-model="funCode"></vue-code-mirror>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data() {
            return {
                csForm: {
                    namespace: '',
                    formName: 'Form',
                    htmlPath: 'Web/DrugStoreSyster/InDrugStoreUI/Purchase/Purchase.html'
                },
                eventForm:{
                    eventName: 'ClickEvent',
                    params: [
                        {
                            paramType: 'string',
                            paramName: ''
                        }
                    ],
                    urlName: '_____urlName',
                    urlMethod: 'get',
                    interfaceName: '____interface'
                },
                funCode: '',
                windowCode: ''
            }
        },
        methods: {
            addDomain() {
                this.eventForm.params.push({
                    paramType: 'string',
                    paramName: ''
                });
            },
            removeParam(param) {
                var index = this.eventForm.params.indexOf(param)
                if (index !== -1) {
                    this.eventForm.params.splice(index, 1)
                }
            },
            createCs(){
                this.windowCode = '';

                    /****** cs代码生成 ******/
                this.funCode = `//${this.csForm.formName}.cs
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
using EMRViewModels.Drug;//实体类可能引用路径

namespace ${this.csForm.namespace}
{
    [ComVisible(true)]
    public partial class ${this.csForm.formName} : DockContentEx
    {
        public ${this.csForm.formName}()
        {
            InitializeComponent();
            this.webBrowser1.Navigate(new Uri(PublicClass.WebUrl + "${this.csForm.htmlPath}?t=" + DateTime.Now + "&hospitalName=" + PublicClass.HospitalName));
            this.webBrowser1.ObjectForScripting = this;
        }

        /// <summary>
        /// 弹出提示框
        /// </summary>
        /// window.external.MessageShow(0, 'message');
        /// <param name="type"></param> tip -> 0 | IsSuccess -> 1 | IsFail -> -1
        /// <param name="msg"></param>
        public void MessageShow(int type, string msg)
        {
            MessageForm.messageType messageType = (MessageForm.messageType)type;
            PublicClass.MessageAlert.ShowMessageBox(messageType, msg);
        }

        /// <summary>
        /// 弹出选择提示框
        /// </summary>
        /// if(window.external.MessageSureShow('message')){};
        /// <param name="msg"></param>
        public bool MessageSureShow(string msg)
        {
            return PublicClass.MessageSureAlert.ShowMessageBox(msg) == DialogResult.Yes;
        }

        //#region 加载等待框
        //public void WaitingShow()
        //{
        //    if (PublicClass.MessageLoad == null)
        //    {
        //        PublicClass.MessageLoad = new EMRClient.BodyTemperUI.BodyTemperEntry.WaitDialogForm();
        //        //使用线程池显示等待框
        //        ThreadPool.QueueUserWorkItem(state =>
        //        {
        //            PublicClass.MessageLoad.ShowDialog();
        //        });
        //    }
        //}

        //public void CloseWaiting()
        //{
        //    if (PublicClass.MessageLoad != null)
        //        PublicClass.MessageLoad.Close();
        //    PublicClass.MessageLoad = null;
        //}
        //#endregion
    }
}`
            },
            createEvent(){
                var params = this.eventForm.params

                /****** url注册代码生成 ******/
                this.windowCode = `case HttpUrl.${this.eventForm.urlName}:
    {
        urladdress = conneckurl + string.Format("${this.eventForm.interfaceName}`

                if(params.length){
                    this.windowCode += '?'
                    for(let i = 0; i < params.length; i++){
                        this.windowCode += params[i].paramName + '={' + i + '}&';
                    }
                    this.windowCode = this.windowCode.slice(0,-1)
                    this.windowCode += '"'
                    for(let i = 0; i < params.length; i++){
                        this.windowCode += ', paras[' + i + ']';
                    }
                }else{
                    this.windowCode += '"'
                }

                this.windowCode +=`);${this.eventForm.urlMethod === 'get' ? '': '\n\tmethod = "post";'}
        break;
    }`

                /****** cs代码生成 ******/
                this.funCode = `/// <summary>
/// ${this.eventForm.urlName}
/// </summary>
//js调用 ->
//var result = JSON.parse(window.external.${this.eventForm.eventName}(${this.eventForm.urlMethod === 'post' ? 'JSON.stringify(tableData)' : ''}`

                //页面调用注释
                if(params.length) {
                    this.funCode += (this.eventForm.urlMethod === 'post' ? ',' : '');
                    for(let i = 0; i < params.length; i++){
                        this.funCode += params[i].paramName + ',';
                    }
                    this.funCode = this.funCode.slice(0,-1)
                }

                this.funCode +=`));
${this.eventForm.urlMethod === 'post' ? `// window.external.MessageShow((result.resultStatus == '200' ? 1 : -1), result.msg);` : `//if(result.resultStatus == '200'){
//
//}else{
//      window.external.MessageShow(-1, result.msg);
//}`}
public string ${this.eventForm.eventName}(${this.eventForm.urlMethod === 'post' ? 'string postData': ''}`

                //方法传参声明
                if(params.length) {
                    this.eventForm.urlMethod === 'post' ? (this.funCode += ', '): '';
                    for(let i = 0; i < params.length; i++){
                        this.funCode += params[i].paramType + ' ' + params[i].paramName + ',';
                    }
                    this.funCode = this.funCode.slice(0,-1)
                }

                this.funCode +=`){
    `

                if(params.length) {
                    this.funCode += 'List<string> paras = new List<string>();\n\t    ';
                }
                //url传参组装
                for(let i = 0; i < params.length; i++){
                    this.funCode += 'paras.Add(' + params[i].paramName + ');\n\t    ';
                }

                this.funCode +=`Dictionary<string, string> httpurl = HisApiURL.GetUrlAddress(EMRClient.DAL.HisApiURL.HttpUrl.${this.eventForm.urlName}, ${ params.length ? 'paras': 'null'});
    //获取Http  Api 数据 (url, method, param[POST], userId, hospitalId, departmentId)
    string response = HttpHelp.HttpReq(httpurl["urladdress"], httpurl["method"], ${this.eventForm.urlMethod === 'get' ? '""': 'postData'}, PublicClass.CurUserId, PublicClass.HospitalId, PublicClass.CurDepartmentId);

    return response;
}`;
            }
        }
    }
</script>

<style lang="scss" scoped="">
    .alignRight{
        text-align: right;
    }
</style>