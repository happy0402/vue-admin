<template>
    <div class="csCreate-container">
        <el-divider>CS代码</el-divider>
        <vue-code-mirror v-model="CSCode"></vue-code-mirror>

        <el-divider>JS代码</el-divider>
        <vue-code-mirror v-model="JSCode"></vue-code-mirror>
    </div>
</template>

<script>
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default{
        components:{
            VueCodeMirror
        },
        data(){
            return {
                CSCode:`using EMRClient.DrugStoreSyster.InDrugStoreUI.Purchase;

/// <summary>
/// 打开打印界面
/// window.external.Print();
/// </summary>
public void Print(object config)
{
    Print Dialog = new Print(config);//新建一个Form
    Dialog.StartPosition = FormStartPosition.CenterParent;//Form居中显示
    Dialog.ShowDialog();//Form显示
}`,
                JSCode:`var printConfig = {
    pageTitle: '页面标题',
    head: [
        [{
            text: '药品名称：' + rowData.ypmc,
            width: 30
        }, {
            text: 'head2-date',
            style: 'text-align: center;'
        }]
    ],
    table: {
        columns: [],
        options: {
            data: result.resultData.slice(0, result.resultData.length -1),
            countData: {
                hj: '合计',
                jhje: 100,
                lsje: 100
            },//result.resultData[result.resultData.length -1]
            countColumns: [{
                field: 'hj',
                colspan: 5,
                style: 'text-align: center;'
            },{
                field: 'jhje'
            },{
                field: 'lsje'
            }]
        }
    },
    foot: [
        [{
            text: '院长：'
        }, {
            text: '分管院长：'
        }, {
            text: '药剂科主任：'
        }, {
            text: '科主任：'
        }],//line1
        [{
            text: '财务：'
        }, {
            text: '记账：'
        }, {
            text: '采购：'
        }, {
            text: '保管：'
        }]//line2
    ]
};

window.external.Print(printConfig);`
            }
        }
    }
</script>