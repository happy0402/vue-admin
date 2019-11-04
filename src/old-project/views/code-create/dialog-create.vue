<template>
    <div class="csCreate-container">
        <el-divider>父窗体代码</el-divider>
        <vue-code-mirror v-model="parent"></vue-code-mirror>

        <el-divider>子窗体代码</el-divider>
        <vue-code-mirror v-model="child"></vue-code-mirror>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
          return {
              parent: `public void CallBack()
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
}`,
              child:`using System;
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
}`
          }
        }
    }
</script>