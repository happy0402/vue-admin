<!-- 布局 -->
<template>
    <!-- analyseCode -->
    <show-config-code :code="codeCreate">
        <template v-slot:show>
            <el-table
                    :data="tableData"
                    height="100%"
                    border
                    stripe
                    highlight-current-row>
                <el-table-column
                        v-if="paramForm.type !== 'default'"
                        :type="paramForm.type"
                        :resizable="false">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="日期"
                        :width="paramForm.width"
                        :sortable="paramForm.sortable"
                        :showOverflowTooltip="paramForm.showOverflowTooltip">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        :fixed="paramForm.fixed"
                        :width="paramForm.width"
                        :showOverflowTooltip="paramForm.showOverflowTooltip">
                </el-table-column>
                <el-table-column
                        prop="job"
                        label="职业"
                        :width="paramForm.width"
                        :showOverflowTooltip="paramForm.showOverflowTooltip">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        width="300"
                        :showOverflowTooltip="paramForm.showOverflowTooltip">
                </el-table-column>
            </el-table>
        </template>

        <template v-slot:config>
            <el-form
                    label-position="left"
                    :model="paramForm"
                    label-width="110px"
                    style="padding: 0 10px;">
                <el-divider>Attributes</el-divider>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="标题">
                            <el-input v-model="paramForm.label"></el-input>
                        </el-form-item>
                        <el-form-item label="宽度">
                            <el-input v-model="paramForm.width"></el-input>
                        </el-form-item>
                        <el-form-item label="格式化">
                            <el-switch
                                    v-model="paramForm.formatter"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="是否可拖动">
                            <el-switch
                                    v-model="paramForm.resizable"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="对齐">
                            <el-select v-model="paramForm.align" placeholder="请选择对齐方式">
                                <el-option
                                        v-for="(align, index) in alignArray"
                                        :key="index"
                                        :label="align"
                                        :value="align">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="列Class">
                            <el-input v-model="paramForm.className"></el-input>
                        </el-form-item>
                        <el-form-item label="自定义表头">
                            <el-switch
                                    v-model="paramForm.renderHeader"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="字段名">
                            <el-input v-model="paramForm.prop"></el-input>
                        </el-form-item>
                        <el-form-item label="最小宽度">
                            <el-input v-model="paramForm.minWidth"></el-input>
                        </el-form-item>
                        <el-form-item label="隐藏显示tooltip">
                            <el-switch
                                    v-model="paramForm.showOverflowTooltip"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="固定列">
                            <el-select v-model="paramForm.fixed" placeholder="请选择固定方式">
                                <el-option
                                        v-for="(fixed, index) in fixedArray"
                                        :key="index"
                                        :label="fixed.text"
                                        :value="fixed.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="表头对齐">
                            <el-select v-model="paramForm.headerAlign" placeholder="请选择对齐方式">
                                <el-option
                                        v-for="(align, index) in alignArray"
                                        :key="index"
                                        :label="align"
                                        :value="align">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="列标题Class">
                            <el-input v-model="paramForm.labelClassName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="列类型">
                            <el-select v-model="paramForm.type" placeholder="请选择列类型">
                                <el-option
                                        v-for="(type, index) in typeArray"
                                        :key="index"
                                        :label="type.text"
                                        :value="type.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="paramForm.type === 'index'">
                        <el-form-item label="自定义索引">
                            <el-switch
                                    v-model="paramForm.index"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="paramForm.type === 'selection'">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-form-item label="是否可选中">
                                    <el-switch
                                            v-model="paramForm.selectable"
                                            :active-value="true"
                                            :inactive-value="false">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="更新后状态保留">
                                    <el-switch
                                            v-model="paramForm.reserveSelection"
                                            :active-value="true"
                                            :inactive-value="false">
                                    </el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <div v-show="paramForm.type === 'default'">
                    <el-row :gutter="10">
                        <el-col>
                            <el-form-item label="是否可排序">
                                <el-switch
                                        v-model="paramForm.sortable"
                                        :active-value="true"
                                        :inactive-value="false">
                                </el-switch>
                            </el-form-item>
                            <el-row :gutter="10" v-show="paramForm.sortable">
                                <el-col :span="12">
                                    <el-form-item label="排序方法">
                                        <el-select v-model="paramForm.sortWay" placeholder="请选择排序方法">
                                            <el-option
                                                    v-for="(sortWay, index) in sortWayArray"
                                                    :key="index"
                                                    :label="sortWay"
                                                    :value="sortWay">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="策略轮转顺序">
                                        <el-switch
                                                v-model="paramForm.sortOrders"
                                                :active-value="true"
                                                :inactive-value="false">
                                        </el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>

                    <el-row :gutter="10">
                        <el-col>
                            <el-form-item label="是否可筛选">
                                <el-switch
                                        v-model="paramForm.filters"
                                        :active-value="true"
                                        :inactive-value="false">
                                </el-switch>
                            </el-form-item>
                            <el-row :gutter="10" v-show="paramForm.filters">
                                <el-col :span="12">
                                    <el-form-item label="列Key">
                                        <el-input v-model="paramForm.columnKey"></el-input>
                                    </el-form-item>
                                    <el-form-item label="是否多选">
                                        <el-switch
                                                v-model="paramForm.filterMultipe"
                                                :active-value="true"
                                                :inactive-value="false">
                                        </el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="位置">
                                        <el-select v-model="paramForm.filterPlacement" placeholder="请选择排序方法">
                                            <el-option
                                                    v-for="(placement, index) in placementArray"
                                                    :key="index"
                                                    :label="placement"
                                                    :value="placement">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="默认选中项">
                                        <el-switch
                                                v-model="paramForm.filteredValue"
                                                :active-value="true"
                                                :inactive-value="false">
                                        </el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>

                <el-divider>Scoped Slot</el-divider>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <el-form-item label="自定义列">
                            <el-switch
                                    v-model="paramForm.defaultSort"
                                    :active-value="true"
                                    :inactive-value="false">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="自定义表头">
                            <el-switch
                                    v-model="paramForm.headerSlot"
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
        name: 'Layout',
        components:{
            ShowConfigCode
        },
        data(){
            return {
                tableData: [{
                    date: '2016-05-01',
                    userId: 1,
                    name: '王小虎',
                    job: '前端开发工程师',
                    address: '浙江省温州市鹿城区黄龙住宅区盛锦路1号 温州医科大学附属康宁医院'
                }, {
                    date: '2016-05-02',
                    userId: 2,
                    name: '王小虎',
                    job: '前端开发工程师',
                    address: '浙江省温州市鹿城区黄龙住宅区盛锦路1号 温州医科大学附属康宁医院'
                }, {
                    date: '2016-05-03',
                    userId: 3,
                    name: '王小虎',
                    job: '前端开发工程师',
                    address: '浙江省温州市鹿城区黄龙住宅区盛锦路1号 温州医科大学附属康宁医院'
                }],
                fixedArray: [
                    {
                        value: false,
                        text: '不固定'
                    },
                    {
                        value: 'left',
                        text: '固定在左'
                    },
                    {
                        value: 'right',
                        text: '固定在右'
                    }
                ],
                alignArray: ['default', 'left', 'center', 'right'],
                typeArray: [
                    {
                        value: 'default',
                        text: '数据显示列'
                    },
                    {
                        value: 'selection',
                        text: '多选'
                    },
                    {
                        value: 'index',
                        text: '序列号'
                    },
                    {
                        value: 'expand',
                        text: '展开按钮'
                    }
                ],
                sortWayArray: ['default', 'sortMethod', 'sortBy'],
                placementArray: ['default', 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end',
                    'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'],
                paramForm:{
                    /***** Attributes *****/
                    label: 'label',
                    prop: 'prop',
                    width: '180',
                    minWidth: undefined,
                    fixed: false,
                    resizable: true,
                    formatter: false,
                    showOverflowTooltip: true,
                    align: 'default',
                    headerAlign: 'default',
                    className: undefined,
                    labelClassName: undefined,
                    renderHeader: undefined,

                    type: 'default',
                    selectable: false,
                    reserveSelection: false,
                    index: undefined,

                    sortable: false,
                    sortWay: 'default',
                    sortOrders: undefined,

                    filters: undefined,
                    columnKey: undefined,
                    filterPlacement: 'default',
                    filterMultipe: true,
                    filteredValue: undefined,

                    /***** Scoped Slot *****/
                    defaultSlot: false,
                    headerSlot: false
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
        height="100%"
        border
        stripe
        highlight-current-row>

        <el-table-column${
                    this.paramForm.label ? '\n\t\t\tlabel="' + this.paramForm.label + '"' : ''
            }${
                this.paramForm.prop ? '\n\t\t\tprop="' + this.paramForm.prop + '"' : ''
            }${
                this.paramForm.width ? '\n\t\t\twidth="' + this.paramForm.width + '"' : ''
            }${
                this.paramForm.minWidth ? '\n\t\t\tmin-width="' + this.paramForm.minWidth + '"' : ''
            }${
                this.paramForm.fixed ? '\n\t\t\tfixed="' + this.paramForm.fixed + '"' : ''
            }${
                this.paramForm.resizable === false ? '\n\t\t\t:resizable="false"' : ''
            }${
                this.paramForm.formatter ? '\n\t\t\t:formatter="formatter"' : ''
            }${
                this.paramForm.showOverflowTooltip ? '\n\t\t\tshow-overflow-tooltip' : ''
            }${
                this.paramForm.align === 'default' ? '' : '\n\t\t\talign="' + this.paramForm.align + '"'
            }${
                this.paramForm.headerAlign === 'default' ? '' : '\n\t\t\theader-align="' + this.paramForm.headerAlign + '"'
            }${
                this.paramForm.className ? '\n\t\t\tclass-name="' + this.paramForm.className + '"' : ''
            }${
                this.paramForm.labelClassName ? '\n\t\t\tlabel-class-name="' + this.paramForm.labelClassName + '"' : ''
            }${
                this.paramForm.renderHeader ? '\n\t\t\t:render-header="renderHeader"' : ''
            }${
                this.paramForm.type === 'default' ? '' : '\n\t\t\ttype="' + this.paramForm.type + '"'
            }${
                this.paramForm.type === 'selection' && this.paramForm.selectable ? '\n\t\t\t:selectable="selectable"' : ''
            }${
                this.paramForm.type === 'selection' && this.paramForm.reserveSelection ? '\n\t\t\treserve-selection' : ''
            }${
                this.paramForm.type === 'index' && this.paramForm.index ? '\n\t\t\t:index="index"' : ''
            }${
                this.paramForm.type === 'default' && this.paramForm.sortable ? '\n\t\t\tsortable' : ''
            }${
                this.paramForm.type === 'default' && this.paramForm.sortable && this.paramForm.sortWay === 'sortMethod' ?
                    '\n\t\t\t:sort-method="sortMethod"' : ''
            }${
                this.paramForm.type === 'default' && this.paramForm.sortable && this.paramForm.sortWay === 'sortBy' ?
                    '\n\t\t\t:sort-by="sortBy"' : ''
            }${
                this.paramForm.type === 'default' && this.paramForm.sortable && this.paramForm.sortOrders ?
                    '\n\t\t\t:sort-orders="[\'ascending\', \'descending\', null]"' : ''
            }${
                this.paramForm.type === 'default' && this.paramForm.filters ?
                    '\n\t\t\t:filters="[{ text: \'text\', value: \'value\' }]"' +
                    '\n\t\t\t:filter-method="filterMethod"' : ''
            }${
                this.paramForm.type === 'default' && this.paramForm.filters && this.paramForm.columnKey ?
                    '\n\t\t\tcolumn-key="' + this.paramForm.columnKey + '"' : ''
            }${
                this.paramForm.type === 'default' && this.paramForm.filters && this.paramForm.filterPlacement !== 'default' ?
                    '\n\t\t\tfilter-placement="' + this.paramForm.filterPlacement + '"' : ''
            }${
                this.paramForm.type === 'default' && this.paramForm.filters && !this.paramForm.filterMultipe ?
                    '\n\t\t\t:filter-multipe="false"' : ''
            }${
                this.paramForm.type === 'default' && this.paramForm.filters && this.paramForm.filteredValue ?
                    '\n\t\t\t:filtered-value="[\'value\']"' : ''
            }>${
                this.paramForm.headerSlot ? `\n\t\t\t<template slot="header" slot-scope="scope"><!-- scope = { column, $index } --></template>` : ''
            }${
                this.paramForm.defaultSort ? `\n\t\t\t<template slot-scope="scope"><!-- scope = { row, column, $index } --></template>` : ''
            }
        </el-table-column>

    </el-table>
</template>

<script>
    export default {
        data() {
          return {
            tableData: [{
                date: '2016-05-01',
                userId: 1,
                name: '王小虎',
                address: '浙江省温州市鹿城区黄龙住宅区盛锦路1号 温州医科大学附属康宁医院'
            }, {
                date: '2016-05-02',
                userId: 2,
                name: '王小虎',
                address: '浙江省温州市鹿城区黄龙住宅区盛锦路1号 温州医科大学附属康宁医院'
            }, {
                date: '2016-05-03',
                userId: 3,
                name: '王小虎',
                address: '浙江省温州市鹿城区黄龙住宅区盛锦路1号 温州医科大学附属康宁医院'
            }]
          }
        },
        methods:{${
                this.paramForm.formatter ? `\n\t\t\tformatter(row, column, cellValue, index){
                return cellValue;
            },` : ''
            }${
                this.paramForm.renderHeader ? `\n\t\t\trenderHeader(h, { column, $index }){
                //具体代码可参考https://segmentfault.com/a/1190000016364550
                return createElement('h1', 'content');
            },` : ''
            }${
                this.paramForm.type === 'selection' && this.paramForm.selectable ? `\n\t\t\tselectable(row, index){
                return true;
            },` : ''
            }${
                this.paramForm.type === 'index' && this.paramForm.index ? `\n\t\t\tindex(index){
                //若设置序号初始值，则可直接传参Number类型参数，无需注册此方法
                return index;
            },` : ''
            }${
                    this.paramForm.type === 'default' && this.paramForm.sortable && this.paramForm.sortWay === 'sortMethod' ?
                        `\n\t\t\tsortMethod(a, b){
                //与Array.sort 表现一致
                return 0; // -1 | 1
            },` : ''
            }${
                    this.paramForm.type === 'default' && this.paramForm.sortable && this.paramForm.sortWay === 'sortBy' ?
                        `\n\t\t\tsortBy(row, index){},
            //String: 指定数据按照哪个属性进行排序
            //Array: 先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推
            //Function(row, index){}: 按方法返回的值进行常规排序` : ''
            }${
                    this.paramForm.type === 'default' && this.paramForm.filters ? `\n\t\t\tfilterMethod(value, row, column){
                //多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示
                return true;//false
            },` : ''
            }
        }
  }
<\/script>`;

                return code;
            }
        }
    }
</script>