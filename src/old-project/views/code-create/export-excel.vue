<template>
    <div class="csCreate-container">
        <el-row :gutter="10">
            <el-col :span="8">
                <el-form label-position="left" :model="form" label-width="110px">
                    <el-form-item label="excel默认名称">
                        <el-input v-model="form.fileName"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="16">
                <el-row>
                    <el-col :span="24">
                        <vue-code-mirror v-model="code"></vue-code-mirror>
                    </el-col>
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
        data(){
            return {
                form: {
                    fileName: 'Excel'
                }
            }
        },
        computed:{
            code(){
                return `/// <summary>
/// ${this.form.fileName}
/// </summary>
//js调用 ->
//window.external.exportExcel();
public void exportExcel()
{
    try
    {
        string title = "${this.form.fileName}";
        System.Net.WebClient web = new System.Net.WebClient();
        SaveFileDialog sfd = new SaveFileDialog();
        sfd.Filter = "excel文件(*.xls)|*.xls|所有文件|*.*";//设置文件类型
        sfd.FileName = title;//设置默认文件名
        sfd.DefaultExt = "xls";//设置默认格式（可以不设）
        sfd.AddExtension = true;//设置自动在文件名中添加扩展名
        if (sfd.ShowDialog() == DialogResult.OK)
        {
            //API --> wait for exchange
            List<string> paras = new List<string>();
            paras.Add(start);
            paras.Add(end);
            paras.Add(abr);
            Dictionary<string, string> httpurl = HisApiURL.GetUrlAddress(EMRClient.DAL.HisApiURL.HttpUrl.导出药品明细, paras);
            string response = HttpHelp.HttpReq(httpurl["urladdress"], httpurl["method"], "", PublicClass.CurUserId, PublicClass.HospitalId, PublicClass.CurDepartmentId);

            OperateData<OutPutModel<string>> output = new OperateData<OutPutModel<string>>();
            OutPutModel<string> result = output.GetAsync(response);
            List<string> paras2 = new List<string>();
            string resultData = OperateJson.GetJsonStr(result.resultData);
            paras2.Add(resultData.Substring(2, resultData.Length - 4));
            Dictionary<string, string> httpurl1 = ApiURL.GetUrlAddress(EMRClient.DAL.ApiURL.HttpUrl.下载文件, paras2);

            web.DownloadFile(httpurl1["urladdress"], sfd.FileName);
        }
    }
    catch (Exception ex)
    {
        PublicClass.MessageAlert.ShowMessageBox(MessageForm.messageType.IsFail, "服务端数据连接异常");
    }
}`
            }
        }
    }
</script>