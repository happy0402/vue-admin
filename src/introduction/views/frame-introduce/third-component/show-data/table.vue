<!-- 布局 -->
<template>
    <!-- analyseCode -->
    <show-config-code :code="codeCreate">
        <p>
            此处配置为常用配置,所有配置请查看
            <el-link
                    href="https://element.eleme.cn/#/zh-CN/component/table"
                    target="_blank"
                    type="primary"
                    :underline="false">
                element-ui官方网站<i class="el-icon-view el-icon--right"></i>
            </el-link>
            <span style="font-size: 12px; padding-left: 10px;">( 注：官方还提供 展开行 | 表尾合计行 | 树形表 等功能,此页面暂时无法配置 )</span>
        </p>

        <template v-slot:show>
            <el-table
                    :data="tableData"
                    :height="paramForm.height"
                    :border="paramForm.border"
                    :size="paramForm.size"
                    :fit="paramForm.fit"
                    :default-sort="{prop: 'date', order: 'descending'}"
                    stripe
                    highlight-current-row>
                <el-table-column
                        prop="date"
                        label="日期"
                        :sortable="paramForm.defaultSort"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址">
                </el-table-column>
            </el-table>
        </template>

        <template v-slot:config>
            <el-form
                    label-position="left"
                    :model="paramForm"
                    label-width="150px"
                    style="padding: 0 10px;">
                <el-divider>Attributes</el-divider>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <!--<el-form-item label="默认选中行key" label-width="110px">-->
                            <!--<el-input v-model="paramForm.currentRowKey"></el-input>-->
                        <!--</el-form-item>-->
                        <el-form-item label="行key">
                            <el-switch
                                    v-model="paramForm.rowKey"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="自定义行Class">
                            <el-switch
                                    v-model="paramForm.rowClassName"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="自定义单元格Class">
                            <el-switch
                                    v-model="paramForm.cellClassName"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="默认排序(*列可排序)">
                            <el-switch
                                    v-model="paramForm.defaultSort"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="高度" label-width="85px">
                            <el-input v-model="paramForm.height"></el-input>
                        </el-form-item>
                        <el-form-item label="空数据文本" label-width="85px">
                            <el-input v-model="paramForm.emptyText"></el-input>
                        </el-form-item>
                        <!--<el-form-item label="表头行Class">-->
                            <!--<el-switch-->
                                    <!--v-model="paramForm.headerRowClassName"-->
                                    <!--:active-value="true"-->
                                    <!--:inactive-value="false">-->
                            <!--</el-switch>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="表头单元格Class">-->
                            <!--<el-switch-->
                                    <!--v-model="paramForm.headerCellClassName"-->
                                    <!--:active-value="true"-->
                                    <!--:inactive-value="false">-->
                            <!--</el-switch>-->
                        <!--</el-form-item>-->
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="边框">
                            <el-switch
                                    v-model="paramForm.border"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="自定义行Style">
                            <el-switch
                                    v-model="paramForm.rowStyle"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="自定义单元格Style">
                            <el-switch
                                    v-model="paramForm.cellStyle"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="列宽度自适应">
                            <el-switch
                                    v-model="paramForm.fit"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="尺寸" label-width="85px">
                            <el-select v-model="paramForm.size" placeholder="请选择类型">
                                <el-option
                                        v-for="(size,index) in sizeArray"
                                        :key="index"
                                        :label="size"
                                        :value="size">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--<el-form-item label="表头行Style">-->
                            <!--<el-switch-->
                                    <!--v-model="paramForm.headerRowStyle"-->
                                    <!--:active-value="true"-->
                                    <!--:inactive-value="false">-->
                            <!--</el-switch>-->
                        <!--</el-form-item>-->
                        <!--<el-form-item label="表头单元格Style">-->
                            <!--<el-switch-->
                                    <!--v-model="paramForm.headerCellStyle"-->
                                    <!--:active-value="true"-->
                                    <!--:inactive-value="false">-->
                            <!--</el-switch>-->
                        <!--</el-form-item>-->
                    </el-col>
                </el-row>

                <el-divider>Events</el-divider>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="当前行改变">
                            <el-switch
                                    v-model="paramForm.currentChange"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="排序改变">
                            <el-switch
                                    v-model="paramForm.sortChange"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="勾选全选">
                            <el-switch
                                    v-model="paramForm.selectAll"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="行点击">
                            <el-switch
                                    v-model="paramForm.rowClick"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="行右击">
                            <el-switch
                                    v-model="paramForm.rowContextmenu"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="单元格双击">
                            <el-switch
                                    v-model="paramForm.cellDblclick"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="头部右击">
                            <el-switch
                                    v-model="paramForm.headerContextmenu"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="过滤条件改变">
                            <el-switch
                                    v-model="paramForm.filterChange"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="勾选数据行">
                            <el-switch
                                    v-model="paramForm.select"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="选择项改变">
                            <el-switch
                                    v-model="paramForm.selectionChange"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="行双击">
                            <el-switch
                                    v-model="paramForm.rowDblclick"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="单元格单击">
                            <el-switch
                                    v-model="paramForm.cellClick"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="头部点击">
                            <el-switch
                                    v-model="paramForm.headerClick"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="头部拖动">
                            <el-switch
                                    v-model="paramForm.headerDragend"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-divider>Methods</el-divider>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="排序">
                            <el-switch
                                    v-model="paramForm.sort"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="清空过滤">
                            <el-switch
                                    v-model="paramForm.clearFilter"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="切换行选中状态">
                            <el-switch
                                    v-model="paramForm.toggleRowSelection"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="选中某行">
                            <el-switch
                                    v-model="paramForm.setCurrentRow"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="清空排序">
                            <el-switch
                                    v-model="paramForm.clearSort"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="清空选择项">
                            <el-switch
                                    v-model="paramForm.clearSelection"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="切换所有行选中状态">
                            <el-switch
                                    v-model="paramForm.toggleAllSelection"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="重新布局">
                            <el-switch
                                    v-model="paramForm.doLayout"
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
    /* eslint-disable */
    import ShowConfigCode from '../ShowConfigCode.vue'

    export default {
        components:{
            ShowConfigCode
        },
        data(){
            return {
                tableData: [{
                    date: '2016-05-03',
                    userId: 1,
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-02',
                    userId: 2,
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    userId: 3,
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                sizeArray: ['default','medium', 'small', 'mini'],
                paramForm:{
                    /***** Attributes *****/
                    height: '100%',
                    border: true,
                    size: 'default',
                    fit: true,
//                    currentRowKey: 3,
                    rowClassName: false,
                    rowStyle: false,
                    cellClassName: false,
                    cellStyle: false,
//                    headerRowClassName: false,
//                    headerRowStyle: false,
//                    headerCellClassName: false,
//                    headerCellStyle: false,
                    rowKey: false,
                    emptyText: undefined,
                    defaultSort: false,
                    /***** Events *****/
                    currentChange: false,
                    filterChange: false,
                    sortChange: false,
                    select: false,
                    selectAll: false,
                    selectionChange: false,
                    rowClick: false,
                    rowDblclick: false,
                    rowContextmenu: false,
                    cellClick: false,
                    cellDblclick: false,
                    headerClick: false,
                    headerContextmenu: false,
                    headerDragend: false,
                    /***** Methods *****/
                    clearSelection: false,
                    toggleRowSelection: false,
                    toggleAllSelection: false,
                    setCurrentRow: false,
                    clearSort: false,
                    clearFilter: false,
                    doLayout: false,
                    sort: false
                }
            }
        },
        methods:{

        },
        computed: {
            codeCreate(){
                let code = `<template>
    <el-table
        :data="tableData"
        height="${ this.paramForm.height }"${
        this.paramForm.border ? '\n\t\tborder' : '' }
        stripe
        highlight-current-row${
        this.paramForm.size === 'default' ? '' : '\n\t\tsize="' + this.paramForm.size + '"' }${
        this.paramForm.fit ? '' : '\n\t\t:fit="false"' }${
        this.paramForm.rowKey ? '\n\t\trow-key="userId"' : '' }${
        this.paramForm.rowKey ? '\n\t\t:row-key="rowKey"' : '' }${
        this.paramForm.emptyText ? 'empty-text="' + this.paramForm.emptyText + '"' : '' }${
        this.paramForm.defaultSort ? '\n\t\t:default-sort="{prop: \'date\', order: \'descending\'}"' : '' }${
        this.paramForm.rowClassName ? '\n\t\t:row-class-name="rowClassName"' : '' }${
        this.paramForm.rowStyle ? '\n\t\t:row-styles="rowStyle"' : '' }${
        this.paramForm.cellClassName ? '\n\t\t:cell-class-name="cellClassName"' : '' }${
        this.paramForm.cellStyle ? '\n\t\t:cell-styles="cellStyle"' : '' }${
        this.paramForm.currentChange ? '\n\t\t@current-change="currentChange"' : '' }${
        this.paramForm.filterChange ? '\n\t\t@filter-change="filterChange"' : '' }${
        this.paramForm.sortChange ? '\n\t\t@sort-change="sortChange"' : '' }${
        this.paramForm.select ? '\n\t\t@select="select"' : '' }${
        this.paramForm.selectAll ? '\n\t\t@select-all="selectAll"' : '' }${
        this.paramForm.selectionChange ? '\n\t\t@selection-change="selectionChange"' : '' }${
        this.paramForm.rowClick ? '\n\t\t@row-click="rowClick"' : '' }${
        this.paramForm.rowDblclick ? '\n\t\t@row-dblclick="rowDblclick"' : '' }${
        this.paramForm.rowContextmenu ? '\n\t\t@row-contextmenu="rowContextmenu"' : '' }${
        this.paramForm.cellClick ? '\n\t\t@cell-click="cellClick"' : '' }${
        this.paramForm.cellDblclick ? '\n\t\t@cell-dblclick="cellDblclick"' : '' }${
        this.paramForm.headerClick ? '\n\t\t@header-click="headerClick"' : '' }${
        this.paramForm.headerContextmenu ? '\n\t\t@header-contextmenu="headerContextmenu"' : '' }${
        this.paramForm.headerDragend ? '\n\t\t@header-dragend="headerDragend"' : '' }>


        <el-table-column
                prop="date"
                label="日期"${
                this.paramForm.defaultSort ? '\n\t\t\t\tsortable' : ''}>
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名">
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址">
        </el-table-column>


    </el-table>
</template>

<script>
    export default {
        data() {
          return {
            tableData: [{
                date: '2016-05-03',
                userId: 1,
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                userId: 2,
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                userId: 3,
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }]
          }
        },${this.paramForm.sort ?
            '\n\t//this.$refs.table.sort(sortParam);//{ prop: string, order: "ascending"|"descending" }' : ''
        }${this.paramForm.clearSort ?
            '\n\t//this.$refs.table.clearSort();' : ''
        }${this.paramForm.clearFilter ?
            '\n\t//this.$refs.table.clearFilter([columnKey]);// columnKey: Array' : ''
        }${this.paramForm.clearSelection ?
            '\n\t//this.$refs.table.clearSelection();' : ''
        }${this.paramForm.toggleRowSelection ?
            '\n\t//this.$refs.table.toggleRowSelection(row[, selected]);//selected: Boolean' : ''
        }${this.paramForm.toggleAllSelection ?
            '\n\t//this.$refs.table.toggleAllSelection();' : ''
        }${this.paramForm.setCurrentRow ?
            '\n\t//this.$refs.table.setCurrentRow([row]);' : ''
        }${this.paramForm.doLayout ?
            '\n\t//this.$refs.table.doLayout();//进行表格操作后,可能需要此方法重新布局' : ''
        }
        methods:{${this.paramForm.rowKey ? `\n\t\t\trowKey(row) {
                //自动生成的代码中存在rowKey的两种设置方式，请挑选一种使用
                return 'rowKey';
            },` : '' }${this.paramForm.rowClassName ? `\n\t\t\trowClassName({row, rowIndex}) {
                //若返回值为一个确定的值，可直接直接将String类型传参，无需写此方法
                return 'rowClassName';
            },` : '' }${this.paramForm.rowStyle ? `\n\t\t\trowStyle({row, rowIndex}) {
                //若返回值为一个确定的值，可直接直接将Object类型传参，无需写此方法
                return 'rowStyle';
            },` : '' }${this.paramForm.cellClassName ? `\n\t\t\tcellClassName({row, column, rowIndex, columnIndex}) {
                //若返回值为一个确定的值，可直接直接将String类型传参，无需写此方法
                return 'cellClassName';
            },` : '' }${this.paramForm.cellStyle ? `\n\t\t\tcellStyle({row, column, rowIndex, columnIndex}) {
                //若返回值为一个确定的值，可直接直接将Object类型传参，无需写此方法
                return 'cellStyle';
            },` : '' }${this.paramForm.currentChange ? `\n\t\t\tcurrentChange(currentRow, oldCurrentRow) {

            },` : '' }${this.paramForm.filterChange ? `\n\t\t\tfilterChange(filters) {
                console.log(filters)
            },` : '' }${this.paramForm.sortChange ? `\n\t\t\tsortChange({ column, prop, order }) {

            },` : '' }${this.paramForm.select ? `\n\t\t\tselect(selection, row) {

            },` : '' }${this.paramForm.selectAll ? `\n\t\t\tselectAll(selection) {

            },` : '' }${this.paramForm.selectionChange ? `\n\t\t\tselectionChange(selection) {

            },` : '' }${this.paramForm.rowClick ? `\n\t\t\trowClick(row, column, event) {

            },` : '' }${this.paramForm.rowDblclick ? `\n\t\t\trowDblclick(row, column, event) {

            },` : '' }${this.paramForm.rowContextmenu ? `\n\t\t\trowContextmenu(row, column, event) {

            },` : '' }${this.paramForm.cellClick ? `\n\t\t\tcellClick(row, column, cell, event) {

            },` : '' }${this.paramForm.cellDblclick ? `\n\t\t\tcellDblclick(row, column, cell, event) {

            },` : '' }${this.paramForm.headerClick ? `\n\t\t\theaderClick(column, event) {

            },` : '' }${this.paramForm.headerContextmenu ? `\n\t\t\theaderContextmenu(column, event) {

            },` : '' }${this.paramForm.headerDragend ? `\n\t\t\theaderDragend(newWidth, oldWidth, column, event) {

            },` : '' }
        }
  }
<\/script>`;

                return code;
            }
        }
    }
</script>