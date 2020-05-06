<template>
    <div class="csCreate-container">
        <el-row :gutter="10">
            <el-col :span="8">
                <el-row>
                    <el-col>
                        <label>代码类型：</label>
                        <el-select v-model="csCodeType" placeholder="请选择">
                            <el-option label="接口对接" value="interface"></el-option>
                            <el-option label="Form" value="form"></el-option>
                            <el-option label="Dialog" value="dialog"></el-option>
                            <el-option label="cs->js" value="csToJs"></el-option>
                            <el-option label="导出" value="export"></el-option>
                            <el-option label="上传" value="upload"></el-option>
                            <el-option label="下载" value="download"></el-option>
                            <el-option label="获取App.config" value="appConfig"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-divider>代码配置项</el-divider>
                <el-form v-show="csCodeType == 'form'" label-position="left" :model="csForm" label-width="110px">
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

                <el-form v-show="csCodeType == 'interface'" label-position="left" :model="eventForm" label-width="110px">
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
                    <el-form-item label="url说明">
                        <el-input v-model="eventForm.remark"></el-input>
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
                    <el-divider>代码1</el-divider>
                    <vue-code-mirror v-model="firstCode"></vue-code-mirror>

                    <el-divider>代码2</el-divider>
                    <vue-code-mirror v-model="secondCode"></vue-code-mirror>
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
                csCodeType: 'interface',
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
                    remark: '',
                    urlMethod: 'get',
                    interfaceName: '____interface'
                },
                firstCode: '',
                secondCode: ''
            }
        },
        watch: {
            csCodeType: function (val) {
                switch (val){
                    case 'csToJs':
                        this.firstCode = `string[] paras = new string[1];
paras[0] = "aaa";
webBrowser1.Document.InvokeScript("functionName", paras);`;
                        this.secondCode = '';
                        break;
                    case 'export':
                        this.firstCode = `try
{
    System.Net.WebClient web = new System.Net.WebClient();
    SaveFileDialog sfd = new SaveFileDialog();
    sfd.Filter = "excel文件(*.xls)|*.xls|所有文件|*.*";//设置文件类型
    Random radom = new Random();
    sfd.FileName = "fileName" + DateTime.Now.ToString("yyyyMMddHHmmss") + radom.Next(4);//设置默认文件名
    sfd.DefaultExt = "xls";//设置默认格式（可以不设）
    sfd.AddExtension = true;//设置自动在文件名中添加扩展名
    if (sfd.ShowDialog(this.Parent) == DialogResult.OK)
    {
        //入参List（CRITICALSEARCHOUT）
        Dictionary<string, string> httpurl = ApiURL.GetUrlAddress(EMRClient.DAL.ApiURL.HttpUrl.导出危急值列表, null);
        //获取Http  Api 数据 (url, method, param[POST], userId, hospitalId, departmentId)
        string response = HttpHelp.HttpReq(httpurl["urladdress"], httpurl["method"], postData, PublicClass.CurUserId, PublicClass.HospitalId, PublicClass.CurDepartmentId);

        OperateData<OutPutModel<string>> output = new OperateData<OutPutModel<string>>();
        OutPutModel<string> result = output.GetAsync(response);
        if (result.resultStatus == "200")
        {
            List<string> paras2 = new List<string>();
            paras2.Add(result.resultData[0]);

            Dictionary<string, string> httpurl1 = ApiURL.GetUrlAddress(EMRClient.DAL.ApiURL.HttpUrl.下载文件, paras2);

            web.DownloadFile(httpurl1["urladdress"], sfd.FileName);
            PublicClass.MessageAlert.ShowMessageBox(MessageForm.messageType.IsSuccess, "数据导出成功！！！");
        }
        else
        {
            PublicClass.MessageAlert.ShowMessageBox(MessageForm.messageType.IsFail, result.msg);
        }
    }
}
catch (Exception ex)
{
    PublicClass.MessageAlert.ShowMessageBox(MessageForm.messageType.IsFail, "请重命名导出文件！");
}`;
                        this.secondCode = '';
                        break;
                    case 'upload':
                        this.firstCode = `/// <summary>
/// 附件上传
/// </summary>
//js调用 ->
//var result = JSON.parse(window.external.uploadFile(JSON.stringify(tableData),taskid));
// window.external.MessageShow((result.ResultStatus == '200' ? 1 : -1), result.Msg);
public string uploadFile()
{
    string StrPath = string.Empty;
    OpenFileDialog ofd = new OpenFileDialog();
    ofd.Title = "文件上传";
    ofd.Multiselect = false;//允许同时选择多个文件
    ofd.InitialDirectory = AppDomain.CurrentDomain.BaseDirectory;
    ofd.Filter = "Files(*.JPG;*.PNG;*.jpeg;*.GIF;*.BMP;*.doc;*.docx;*.pdf;*.xls;*.xlsx;*.txt)|*.JPG;*.PNG;*.GIF;*.BMP;*.jpeg;*.doc;*.docx;*.pdf;*.xls;*.xlsx;*.txt";
    //ofd.Filter = "Files(*.WAV;*.MP3;)|*.WAV;*.MP3;"
    ofd.RestoreDirectory = false;
    if (ofd.ShowDialog() == DialogResult.OK)
    {
        StrPath = string.Join(",", ofd.FileNames);

        List<string> paras = new List<string>();
        ////var jobnum = curList.FirstOrDefault(m => m.ID == pID).DoctorNumber;
        //paras.Add(taskid);
        System.IO.FileInfo fi = new System.IO.FileInfo(StrPath);
        FileStream fs = fi.OpenRead();
        if (fs.Length < 4194304 && fs.Length > 0)
        {
            Dictionary<string, string> httpurl = SALE.ApiData.HttpUrlAddress.GetUrlAddress(SALE.ApiData.HttpUrlAddress.HttpUrl.后台管理_附件上传, paras);
            string respose = HttpHelp.HttpHelp.HttpMultipartPost(httpurl["urladdress"], StrPath, fs, PublicClass.CurUserId, PublicClass.HospitalId, PublicClass.CurDepartmentId);

            return respose;

        }
        else
        {
            PublicClass.MessageAlert.ShowMessageBox(MessageForm.messageType.IsFail, "请选择4MB以下的文件！");
            return "";
        }
    }
    return "";
}`;
                        this.secondCode = '';
                        break;
                    case 'download':
                        this.firstCode = `/// <summary>
/// 附件下载
/// </summary>
//js调用 ->
//var result = JSON.parse(window.external.downloadFile(FileName, DefaultExt));
//if(result.ResultStatus == '200'){
//  result.ResultData
//}else{
//  window.external.MessageShow(-1, result.Msg);
//}
public void downloadFile(string FileName, string DefaultExt, string filePath)
{
    try
    {
        System.Net.WebClient web = new System.Net.WebClient();
        SaveFileDialog sfd = new SaveFileDialog();
        sfd.Filter = "所有文件|*.*";//设置文件类型
        sfd.FileName = FileName;//设置默认文件名
        sfd.DefaultExt = DefaultExt;//设置默认格式（可以不设）
        sfd.AddExtension = true;//设置自动在文件名中添加扩展名
        if (sfd.ShowDialog(this.Parent) == DialogResult.OK)
        {
            List<string> paras = new List<string>();
            paras.Add(filePath);
            Dictionary<string, string> httpurl1 = SALE.ApiData.HttpUrlAddress.GetUrlAddress(SALE.ApiData.HttpUrlAddress.HttpUrl.附件下载, paras);
            web.DownloadFile(httpurl1["urladdress"], sfd.FileName);

        }
    }
    catch (Exception ex)
    {
        PublicClass.MessageAlert.ShowMessageBox(MessageForm.messageType.IsFail, "下载失败！");
    }
}`;
                        this.secondCode = '';
                        break;
                    case 'dialog':
                        this.firstCode = `public void CallBack()
{
    //窗体结束后的回调函数
}

/// <summary>
/// 打开选择界面
/// window.external.OpenDialog();
/// </summary>
public void OpenDialog()
{
    SelectType Dialog = new DialogForm();//新建一个Form
    Dialog.refreshLedgerForm += new DialogForm.refreshLedger(CallBack);
    Dialog.StartPosition = FormStartPosition.CenterParent;//Form居中显示
    Dialog.ShowDialog();//Form显示
}`;
                        this.secondCode = `using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
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
    public partial class DialogForm : Form
    {
        public delegate void refreshLedger();//接收父级CallBack方法
        public event refreshLedger refreshLedgerForm;//父级事件触发

        public Form()
        {
            InitializeComponent();
            this.webBrowser1.Navigate(new Uri(PublicClass.WebUrl + "Web/loading.html?t=" + DateTime.Now));
            this.webBrowser1.ObjectForScripting = this;

            //this.title_name.Text = "";
        }

        public void enSureResult()
        {
            refreshLedgerForm();//父窗体回调事件触发
            this.Close();
        }

        /// <summary>
        /// 弹出提示框
        /// </summary>
        /// <param name="type"></param> tip -> 0 | IsSuccess -> 1 | IsFail -> -1
        /// <param name="msg"></param>
        public void MessageShow(int type, string msg)
        {
            MessageForm.messageType messageType = (MessageForm.messageType)type;
            PublicClass.MessageAlert.ShowMessageBox(messageType, msg);
        }

        /// <summary>
        /// 关闭窗口
        /// </summary>
        public void closeThis()
        {
            this.Close();
        }

        private void titlePn_Paint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            Color FColor = Color.FromArgb(47, 148, 237);
            Color TColor = Color.FromArgb(92, 198, 247);
            Brush b = new LinearGradientBrush(this.titlePn.ClientRectangle, FColor, TColor, LinearGradientMode.Vertical);

            g.FillRectangle(b, this.titlePn.ClientRectangle);
            Pen p = new Pen(Color.White, 2);
            //×
            g.DrawLine(p, 979, 6, 989, 16);
            g.DrawLine(p, 979, 16, 989, 6);
            //最小化
            g.DrawLine(p, 946, 11, 959, 11);

            //竖线
            Color blFColor = Color.FromArgb(19, 103, 187);
            Color blTColor = Color.FromArgb(44, 147, 237);
            Brush bl = new LinearGradientBrush(this.titlePn.ClientRectangle, blFColor, blTColor, LinearGradientMode.Vertical);
            p = new Pen(bl, 1);
            g.DrawLine(p, 935, 0, 935, 16);
            g.DrawLine(p, 968, 0, 968, 16);

            ControlPaint.DrawBorder(e.Graphics,
                                this.titlePn.ClientRectangle,
                                Color.FromArgb(47, 148, 237),//7f9db9
                                1,
                                ButtonBorderStyle.Solid,
                                Color.FromArgb(47, 148, 237),
                                1,
                                ButtonBorderStyle.Solid,
                                Color.FromArgb(47, 148, 237),
                                1,
                                ButtonBorderStyle.Solid,
                                Color.Transparent,
                                0,
                                ButtonBorderStyle.None);
        }

        private Point mousePoint = new Point();
        private void titlePn_MouseDown(object sender, MouseEventArgs e)
        {
            base.OnMouseDown(e);
            this.mousePoint.X = e.X;
            this.mousePoint.Y = e.Y;
        }

        private void titlePn_MouseMove(object sender, MouseEventArgs e)
        {
            base.OnMouseMove(e);
            if (e.Button == MouseButtons.Left)
            {
                this.Top = Control.MousePosition.Y - mousePoint.Y;
                this.Left = Control.MousePosition.X - mousePoint.X;
            }
        }

        private void bottomPn_Click(object sender, EventArgs e)
        {
            WindowState = FormWindowState.Minimized;//最小化
            ShowInTaskbar = true;//显示在任务栏
        }

        private void delPn_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void AddToPackage_Load(object sender, EventArgs e)
        {
            this.delPn.Parent = this.titlePn;
            this.bottomPn.Parent = this.titlePn;
            this.title_name.Parent = this.titlePn;
        }
    }
}`;
                        break;
                    case 'appConfig':
                        this.firstCode = 'string isLis = System.Configuration.ConfigurationManager.AppSettings["IsLis"].ToString();';
                        this.secondCode = '';
                        break;
                    default:
                        this.firstCode = '';
                        this.secondCode = '';
                        break;
                }
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
                this.secondCode = '';

                    /****** cs代码生成 ******/
                this.firstCode = `//${this.csForm.formName}.cs
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using SALE.ApiData;
using ViewModel;
using System.Reflection;
using Newtonsoft.Json;
using System.Threading;
using System.Net;
using EMRClient.DAL;
using KNYY.HttpHelp;

namespace ${this.csForm.namespace}
{
    [System.Runtime.InteropServices.ComVisible(true)]
    public partial class ${this.csForm.formName} : DockContentEx
    {
        public ${this.csForm.formName}()
        {
            InitializeComponent();
            this.webBrowser1.Navigate(new Uri(PublicClass.WebUrl + "${this.csForm.htmlPath}?t=" + DateTime.Now + "&hospitalName=" + PublicClass.HospitalName));
            this.webBrowser1.ObjectForScripting = this;
            this.webBrowser1.Dock = DockStyle.Fill;
            webBrowser1.ScrollBarsEnabled = false;
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
}`;
            },
            createEvent(){
                var params = this.eventForm.params;

                /****** url注册代码生成 ******/
                this.firstCode = `case HttpUrl.${this.eventForm.urlName}:
    {
        urladdress = conneckurl + string.Format("${this.eventForm.interfaceName}`

                if(params.length){
                    this.firstCode += '?'
                    for(let i = 0; i < params.length; i++){
                        this.firstCode += params[i].paramName + '={' + i + '}&';
                    }
                    this.firstCode = this.firstCode.slice(0,-1)
                    this.firstCode += '"'
                    for(let i = 0; i < params.length; i++){
                        this.firstCode += ', paras[' + i + ']';
                    }
                }else{
                    this.firstCode += '"'
                }

                this.firstCode +=`);${this.eventForm.urlMethod === 'get' ? '': '\n\tmethod = "post";'}
        break;
    }`;

                /****** cs代码生成 ******/
                this.secondCode = `/// <summary>
/// ${this.eventForm.urlName}
/// </summary>
//js调用 ->
//var result = JSON.parse(window.external.${this.eventForm.eventName}(${this.eventForm.urlMethod === 'post' ? 'JSON.stringify(postData)' : ''}`;

                //页面调用注释
                if(params.length) {
                    this.secondCode += (this.eventForm.urlMethod === 'post' ? ',' : '');
                    for(let i = 0; i < params.length; i++){
                        this.secondCode += params[i].paramName + ',';
                    }
                    this.secondCode = this.secondCode.slice(0,-1);
                }

                this.secondCode +=`));
${this.eventForm.urlMethod === 'post' ? `//window.external.MessageShow((result.resultStatus == '200' ? 1 : -1), result.msg);` : `//if(result.resultStatus == '200'){
//  result.resultData
//}else{
//  window.external.MessageShow(-1, result.msg);
//}`}
public string ${this.eventForm.eventName}(${this.eventForm.urlMethod === 'post' ? 'string postData': ''}`;

                //方法传参声明
                if(params.length) {
                    this.eventForm.urlMethod === 'post' ? (this.secondCode += ', '): '';
                    for(let i = 0; i < params.length; i++){
                        this.secondCode += params[i].paramType + ' ' + params[i].paramName + ',';
                    }
                    this.secondCode = this.secondCode.slice(0,-1);
                }

                this.secondCode +=`){
    //${this.eventForm.remark}
    `;

                if(params.length) {
                    this.secondCode += 'List<string> paras = new List<string>();\n\t    ';
                }
                //url传参组装
                for(let i = 0; i < params.length; i++){
                    this.secondCode += 'paras.Add(' + params[i].paramName + ');\n\t    ';
                }

                this.secondCode +=`Dictionary<string, string> httpurl = ApiURL.GetUrlAddress(EMRClient.DAL.ApiURL.HttpUrl.${this.eventForm.urlName}, ${ params.length ? 'paras': 'null'});
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