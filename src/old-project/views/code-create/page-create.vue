<template>
    <div class="csCreate-container" style="height: 100%;">
        <el-row :gutter="10" style="height: 100%;">
            <el-col :span="8">
                <el-form label-position="left" :model="tableForm" label-width="80px">
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
    </style>
</head>
<body style="padding: 10px;">


    <script type='text/javascript' src='../../../js/CommonJS.js' charset='utf-8'><\/script>
    <script>
        var urlParam;
        $(function(){
            urlParam = getUrlParam(window.location.href);

            //页面初始化代码


            //下拉框初始化
            $("select").cssSelect({limit:3});
        });

        //选择表格行
        var $selectedRow = undefined;
        $('.contentTable').on('click', 'tr', function(){
            if($selectedRow){
                $selectedRow.removeClass('selectBg');
            }
            $selectedRow = $(this);
            $selectedRow.addClass('selectBg');
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
            $(target + ' .checkbox').each(function(){
                controlCheck(this, dom.checked);
            });
        }
        function controlCheck(control, isCheck){
            $(control).find('input').prop('checked', isCheck);
            checkDataSet($(control).find('input')[0]);
        }
        function checkDataSet(input){
            var $row = $(input).parent().parent().parent();
            var row = $row.data('row');
            if(row){
                row.checked = $(input).is(':checked');
                $row.data('row',row);
            }
        }

        //表格编辑赋值
        function cellDataSet(dom, field){
            var rowData = $(dom).parent().parent().data('row');
            rowData._hadChanged = true;
            rowData[field] = $(dom).val();
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
                var type = columns[j].type || 'text';
                var cellClass = columns[j].class || '';
                var originalData = rowData[columns[j].field] == null ? '' : rowData[columns[j].field];
                var cellData = typeof columns[j].formatter == 'function' ? columns[j].formatter(rowData, columns[j].field) : originalData;

                var $cell = $('<td class="' + cellClass + '"></td>');
                var $control;
                if(type == 'checkbox'){
                     $control = $('<span class="check-span checkbox" onselectstart="return false;" onclick="cellDataSet(this, \\'' + columns[j].field + '\\')">' +
                            '<input type="checkbox" onchange="checkDataSet(this)">' +
                            '<span class="check-span check" ></span>' +
                        '</span>');
                }else if(type == 'select'){
                    var control = '<select onchange="cellDataSet(this, \\'' + columns[j].field + '\\')">';

                    for(var k = 0; k < columns[j].options.length; k++){
                        control += '<option value="' + columns[j].options[k].code + '" ' + (columns[j].options[k].code == rowData[columns[j].field] ? 'selected = "selected"' : '') + '>' + columns[j].options[k].name + '</option>';
                    }

                    control += '</select>';

                    $control = $(control);
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
        function loadTableData($table, data, option){
            var options = $.extend($table.data('options'), option);
            $table.data('options', options);

            if(!data){
                return;
            }

            var $tbody = $table.find('.contentTable tbody');
            var columns = $table.data('columns');
            $tbody.html('');
            for(var i = 0; i < data.length; i++){
                var $row = createRow(columns, data[i]);

                $row.appendTo($tbody);
            }

            if(options && options.countData){
                var cols = options.countColumns;

                var row = '<tr>';
                for(var i = 0; i < cols.length; i++){
                    row += <td colspan="' + (cols[i].colspan || 1) + '" style="' + (cols[i].style || '') + '" class="' + (cols[i].class || '') + '">' + options.countData[cols[i].field] + '</td>';
                }
                row += '</tr>';

                $(row).appendTo($tbody);
            }
        }

        //获取表格数据
        function getTabelData($table, dataType, rowCheck){
            var data = [];
            $table.find('.contentTable tr').each(function(){
                var rowData = $(this).data('row');
                if(rowData &&
                    (!dataType || dataType == 'all' || (dataType == 'changed' && rowData._hadChanged) || (dataType == 'checked' && rowData.checked)) &&
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
                    .replace(/=/g, '":"')
                    .replace(/\\+/g, ' ') +
                '"}'
            )
        }
    <\/script>
</body>`
            }
        }
    }
</script>