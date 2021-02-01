<template>
    <div class="csCreate-container" style="height: 100%;">
        <el-row :gutter="10" style="height: 100%;">
            <el-col :span="8">
                <el-form label-position="left" :model="tableForm" label-width="80px" @submit.native.prevent>
                    <el-form-item label="标题">
                        <el-input v-model="tableForm.title"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="16" style="height: 100%;">
                <vue-code-mirror v-model="code"></vue-code-mirror>
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
                tableForm: {
                    title: '页面标题'
                }
            }
        },
        computed:{
            code(){
                return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${this.tableForm.title}</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name='author' content="zkx" />
    <link href="../../../css/YFYK_CommonStyle.css?t=2" rel="stylesheet" />

    <style>
        /*html{*/
            /*height: 100%;*/
        /*}*/
        body{
            padding: 10px 20px;
            /*background: #F3FBFF;*/
            /*position: relative;*/
            /*border-left: 1px solid #2F94ED;*/
            /*border-right: 1px solid #2F94ED;*/
            /*border-bottom: 1px solid #2F94ED;*/
            /*overflow: hidden;*/
            /*height: 95%;*/
        }

        label{
            display: inline-block;
        }
        .cssSelect {
            white-space: nowrap;
            float: none;
            display: inline-block;
            position: relative;
            top: 10px;
        }
        .controlWarp{
            margin-bottom: 5px;
            margin-right: 5px;
            display: inline-block;
        }

        .checkbox{
            margin-right: 5px;
        }

        .check-span{
            position: relative;
        }

        .check-span input[type='radio']{
            -webkit-appearance: radio;
        }

        .check-span input[type='checkbox']{
            -webkit-appearance: checkbox;
        }

        .check-span input[type='radio'],.check-span input[type='checkbox']{
            position: absolute;
            top: 0;
            opacity: 0;
            z-index: 1000;
            width: 16px;
            height: 16px;
        }

        .check-span input[type='radio'] + span{
            background-image: url(../../../images/clickbox2.png);
        }

        .check-span input[type='checkbox'] + span{
            background-color: #fff;
            top: 4px;
            right: 3px;
            border-radius: 3px;
            padding-right: 0;
            border: 1px solid #808080;
        }

        .check-span input[type='radio']:checked + span{
            background-image: url(../../../images/clickbox1.png);
        }

        .check-span input[type='checkbox']:checked + span{
            background-image: url(../../../images/icon-check.png);
            background-position: -1px -1px;
        }

        .contentTable .tab1{
            width:100%;
            height:100%;
        }
        .contentTable tr:nth-child(odd) {
            background-color:#fff;
        }
        .contentTable tr:nth-child(even) {
            background-color:#ddd;
        }

        .redStar:before{
            content: '*';
            color: #C03639;
            padding-right: 3px;
        }

        .tableContainer {
            overflow: hidden;
        }

        .a_btn {
            display: inline-block;
            float: none;
            border: 0px;
            outline: none;
            vertical-align: middle;
            box-sizing: unset;
            font-family: "Helvetica Neue", "Helvetica", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", "Arial", "sans-serif";
        }
        button{
            border: none;
        }
        button:disabled{
            background-color: #ddd;
            color: #999;
        }
        button:disabled:hover{
            background-color: #ddd;
            color: #999;
        }

        .laydate_body .laydate_choose:hover, .laydate_body .laydate_y .laydate_yms a:hover{
            background-color: #2F94ED!important;
        }
        .laydate_body .laydate_choose{
            background-color: #2F94ED!important;
        }
        .laydate_body .laydate_y .laydate_yms a{
            background-color: #2F94ED!important;
        }

        .selectBg {
            background: #aad6ff!important;
            border: 1px solid #2F94ED!important;
        }

        .cssSelect {
            white-space: nowrap;
            float: none;
            display: inline-block;
            position: relative;
            top: 10px;
        }
    </style>
</head>
<body>


    <script type='text/javascript' src='../../../js/CommonJS.js' charset='utf-8'><\/script>
    <script>
        var urlParam;
        $(function(){
            urlParam = getUrlParam(window.location.href);

            //页面初始化代码


            //下拉框初始化
            $("select").cssSelect({limit:3});
        });
    <\/script>
    <script>
        $(".tableMainHead").each(function(){
            $(this).parents('table').find(".tableContainer").css("width", $(this).css("width"));
            $(this).parents('table').find(".tableMain").css("width", $(this).css("width"));
        });
        $(".tableContainer").css("height", window.innerHeight-110+"px");
        $(".content1").css("height", window.innerHeight-110+"px");
        window.onresize = function () {
            $(".tableMainHead").each(function(){
                $(this).parents('table').find(".tableContainer").css("width", $(this).css("width"));
                $(this).parents('table').find(".tableMain").css("width", $(this).css("width"));
            });
            $(".tableContainer").css("height", window.innerHeight-110+"px");
            $(".content1").css("height", window.innerHeight-110+"px");
        }

        //选择表格行
        var $selectedRow = undefined;
        $('.contentTable').on('click', 'tr', function(){
            if($selectedRow){
                $selectedRow.removeClass('selectBg');
            }
            $selectedRow = $(this);
            $selectedRow.addClass('selectBg');
            $selectedRow.find('input[type="checkbox"]').each(function(){
                $(this).trigger('click');
            });
        });

        //聚焦下一个控件
        function nextFocus($tab1, callback){
            var $nextDom = $tab1.parent().nextAll();

            for(var i = 0; i < $nextDom.length; i++){
                var $dom = $nextDom.eq(i).find('.tab1');
                if($dom.length){
                    $dom.focus();
                    return ;
                }
            }

            //最后一个控件回车，可能执行保存事件
            if(typeof callback == 'function'){
                callback();
            }
        }
        $('.contentTable').on('keydown', '.tab1', function(e){
            if (e.keyCode == 13) {
                nextFocus($(this), function(){});
            }
        });

        //全选
        function checkAll(dom, target){
            var options = $(target).data('options');
            if(options.scrollLoad){
                for(var i = 0; i < options.data.length; i++){
                    options.data[i]._checked = dom.checked;
                }
            }

            $(target + ' .checkbox').each(function(){
                var $input = $(this).find('input');
                if($input[0].checked != dom.checked){
                    $input.click();
                }
            });
        }
        function checkDataSet(input){
            var $row = $(input).parent().parent().parent();
            var row = $row.data('row');
            if(row){
                row._checked = $(input).is(':checked');
                $row.data('row',row);
            }
        }

        //表格编辑赋值
        function cellDataSet(dom, field){
            var rowData = $(dom).parent().parent().data('row');
            rowData._hadChanged = true;
            if($(dom).attr('type') == 'checkbox'){
                rowData[field] = $(dom).is(':checked') ? '1':'0';
            }else{
                rowData[field] = $(dom).val();
            }
            $(dom).parent().parent().data('row', rowData);
        }

        //表格数据重置
        function dataReset($table){
            $table.find('.contentTable tr').each(function(){
                var rowData = $(this).data('row');
                if(rowData && rowData._hadChanged){
                    rowData._hadChanged = false;
                    $(this).data('row', rowData);
                }
            });
        }

        //初始化表格
        function initTable($table, columns, options){
            options.startPosition = 0;
            options.stopPosition = 0;
            options.pageSize = 30;
            options.edge = 'bottom';

            $table.data('columns', columns);
            $table.data('options', options);
            var $head = $table.find('.topTable');
            var $body = $table.find('.contentTable');
            $head.html('');
            $body.html('');

            var $colgroup = $('<colgroup></colgroup>');
            var $tbody = $('<tbody></tbody>');
            var $tr = $('<tr></tr>');
            for(var i = 0; i < columns.length; i++){
                var $col = $('<col width="' + columns[i].width + '" />');

                if(columns[i].type == 'checkbox' && !columns[i].title){
                    var $td = $('<td>' +
                            '<span class="check-span checkbox" onselectstart="return false;">' +
                                '<input type="checkbox" onchange="checkAll(this, \\'#' + $table.attr('id') + '\\')">' +
                                '<span class="check-span check" ></span>' +
                            '</span>' +
                        '</td>');
                }else{
                    var $td = $('<td>' + columns[i].title + '</td>');
                }

                $col.appendTo($colgroup);
                $td.appendTo($tr);
            }

            $colgroup.clone().appendTo($head);
            $colgroup.clone().appendTo($body);
            $tr.appendTo($tbody).appendTo($head);
            $('<tbody></tbody>').appendTo($body);

            if(options.data && options.data.length){
                loadTableData($table, options.data);
            }
        }

        //加载表格数据
        function createRow(columns, rowData){
            var $row = $('<tr></tr>');
            for(var j = 0; j < columns.length; j++){
                var type = (columns[j].type ? columns[j].type : 'text');
                var cellClass = (columns[j]["class"] ? columns[j]["class"] : '');
                var originalData = (rowData[columns[j].field] == null ? '' : rowData[columns[j].field]);
                var cellData = (typeof columns[j].formatter == 'function' ? columns[j].formatter(rowData, columns[j].field) : originalData);

                var $cell = $('<td class="' + cellClass + '"></td>');
                var $control;
                if(type == 'checkbox'){
                     if(cellData || cellData === ''){
                        $control = $('<span class="check-span checkbox" onselectstart="return false;" onclick="cellDataSet(this, \\'' + columns[j].field + '\\')">' +
                            '<input type="checkbox" onchange="checkDataSet(this, \\'' + columns[j].field + '\\')" ' + (cellData || rowData._checked ? 'checked' : '') + '>' +
                            '<span class="check-span check" ></span>' +
                            '</span>');
                    }else{
                        $control = $('<span></span>')
                    }
                }else if(type == 'select'){
                    var control = '<select class="tab1 ' + columns[j].className + '" onchange="cellDataSet(this, \\'' + columns[j].field + '\\')">';

                    var options = columns[j].options;
                    if(typeof columns[j].options == 'function'){
                        options = columns[j].options(rowData) || [];
                    }
                    for(var k = 0; k < options.length; k++){
                        control += '<option value="' + options[k].code + '" ' + (options[k].code == rowData[columns[j].field] ? 'selected = "selected"' : '') + '>' + options[k].name + '</option>';
                    }

                    control += '</select>';

                    $control = $(control);
                    rowData[columns[j].field] = $control.val();
                }else if(type == 'input'){
                    $control = $('<input class="tab1" type="text" value="' + cellData + '" onchange="cellDataSet(this, \\'' + columns[j].field + '\\')">');
                }else if(type == 'other'){
                    $control = (columns[j].init || function(){})(rowData);
                }else{
                    $control = $('<div>' + cellData + '</div>');
                }

                if($control){
                    $control.appendTo($cell);
                }
                $cell.data('field', columns[j].field).appendTo($row);
            }

            return $row.data('row', rowData);
        }

        function scrollLoadData(data, options, columns, $tbody){
            if(!data || !data.length) return ;

            if(options.edge === 'top'){
                if(options.startPosition !== 0){
                    for(var i = 0; i < options.pageSize && options.startPosition > 0; i++){
                        var $row = createRow(columns, data[options.startPosition - 1]);
                        $row.prependTo($tbody);

                        options.startPosition --;

                        typeof options.afterScrollLoad == 'function' && options.afterScrollLoad($row);
                    }
                }
                //到顶
            }

            if(options.edge === 'bottom'){
                if(options.stopPosition !== data.length){
                    for(var i = 0; i < options.pageSize && options.stopPosition < data.length; i++){
                        var $row = createRow(columns, data[options.stopPosition]);
                        $row.appendTo($tbody);

                        options.stopPosition ++;

                        typeof options.afterScrollLoad == 'function' && options.afterScrollLoad($row);
                    }
                }
                //到底
            }
        }

        function scrollToRow($table, index){
            var options = $table.data('options');
            var $tbody = $table.find('.contentTable tbody');
            var columns = $table.data('columns');
            var data = options.data;

            if(options.scrollLoad){
            $tbody.html('');
            options.startPosition = index;
            options.stopPosition = index;
            options.edge = 'top';
            scrollLoadData(data, options, columns, $tbody);
            options.edge = 'bottom';
            scrollLoadData(data, options, columns, $tbody);

            if($selectedRow){
                $selectedRow.removeClass('selectBg');
            }
            $selectedRow = $table.find(".contentTable tbody tr").eq(index - options.startPosition);
            $selectedRow.addClass('selectBg');
            $table.find(".tableContainer").animate({scrollTop:($table.find(".contentTable tbody tr").eq(index - options.startPosition).offset().top + $table.find(".tableContainer").scrollTop() - 80)}, 0);
        }else{
            if($selectedRow){
                $selectedRow.removeClass('selectBg');
            }
            $selectedRow = $table.find(".contentTable tbody tr").eq(index);
            $selectedRow.addClass('selectBg');
            $table.find(".tableContainer").animate({scrollTop:($table.find(".contentTable tbody tr").eq(index).click().offset().top + $table.find(".tableContainer").scrollTop() - 80)}, 100);
        }
        }


        function loadTableData($table, data, option){
            var options = $.extend($table.data('options'), option);
            options.data = data;
            $table.data('options', options);

            var $tbody = $table.find('.contentTable tbody');
            var columns = $table.data('columns');
            $tbody.html('');
            if(!data || !data.length){
                var row = '<tr class="noData"><td colspan="' + columns.length + '">暂无数据！</td></tr>';
                $(row).appendTo($tbody);
                return;
            }

            $tbody.html('');
            if(options.scrollLoad){
               $table.find('.tableContainer').scroll(function(){
                    var options = $table.data('options');
                    var data = options.data;

                    var scrollTop = $(this).scrollTop();
                    var contentH = $(this).innerHeight();
                    var nScrollHight = $(this)[0].scrollHeight; //滚动距离总长(注意不是滚动条的长度)
                    if(scrollTop == 0){
                        options.edge = 'top';

                        scrollLoadData(data, options, columns, $tbody);
                    }
                    if(scrollTop + contentH > nScrollHight - 10){
                        options.edge = 'bottom';

                        scrollLoadData(data, options, columns, $tbody);
                    }
                });

                options.startPosition = 0;
                options.stopPosition = 0;
                options.edge = 'bottom';
                scrollLoadData(data, options, columns, $tbody);
            }else{
                for(var i = 0; i < data.length; i++){
                    var $row = createRow(columns, data[i]);

                    $row.appendTo($tbody);
                }
            }

            if(options && options.countData){
                var cols = options.countColumns;

                var row = '<tr>';
                for(var i = 0; i < cols.length; i++){
                    row += '<td colspan="' + (cols[i]["colspan"] || 1) + '" style="' + (cols[i]["style"] || '') + '" class="' + (cols[i]["class"] || '') + '">' + options.countData[cols[i].field] + '</td>';
                }
                row += '</tr>';

                $(row).appendTo($tbody);
            }
        }

        //获取表格数据
        function getTableData($table, dataType, rowCheck){
            var data = [];
            $table.find('.contentTable tr').each(function(){
                var rowData = $(this).data('row');
                if(rowData &&
                    (!dataType || dataType == 'all' || (dataType == 'changed' && rowData._hadChanged) || (dataType == 'checked' && rowData._checked)) &&
                    (typeof rowCheck != 'function' || rowCheck(rowData))){
                    data.push(rowData);
                }
            });
            return data;
        }

        //设置行数据
        function setRowData($table, $row, rowData){
            var columns = $table.data('columns');
            rowData._hadChanged = true;
            var $newRow = createRow(columns, rowData);

            $newRow.replaceAll($row);

            return $newRow;
        }

        //添加行
        function appendRow($table, rowData){
            var options = $table.data('options');

            var columns = $table.data('columns');
            var $row = createRow(columns, rowData);

            var $lastRow = $table.find('.contentTable tbody tr:last-child');
            if($lastRow.attr('class') == 'noData') $lastRow.remove();
            if(options && options.countData){
                $row.insertBefore($lastRow);
            }else{
                $row.appendTo($table.find('.contentTable tbody'));
            }

            return $row;
        }

        //路由解析
        function getUrlParam(url){
            var search = url.split('#')[0].split('?')[1];
            if (!search) {
                return {};
            }
            return JSON.parse(
                '{"' +
                decodeURIComponent(search)
                    .replace(/"/g, '\\\\"')
                    .replace(/&/g, '","')
                    .replace(/=/g, '":"') +
                '"}'
            )
        }
    <\/script>
</body>`
            }
        }
    }
</script>