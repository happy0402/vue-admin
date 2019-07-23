<template>
    <el-table
            ref="table"
            :data="showData"
            :size="size"
            :width="width"
            :height="height"
            :max-height="maxHeight"
            :row-key="rowKey"
            :current-row-key="currentRowKey"
            border
            stripe
            highlight-current-row
            v-infinite-scroll="'.el-table__body-wrapper'"
            @reachEdge.native="reachEdge"
            @row-click="onRowClick"
            @before-sort="beforeSortFilter"
            @sort-change="onSortChange"
            @before-filter="beforeSortFilter"
            @filter-change="onFilterChange"
            :row-class-name="rowClassName"
            @cell-mouse-enter="onCellMouseEnter"
            @cell-mouse-leave="onCellMouseLeave">

        <!-- el-table-column -->
        <slot name="default"></slot>

    </el-table>
</template>

<script>
    import infiniteScroll from '#/directive/infiniteScroll';

    //数据过滤
    const getColumnById = function(table, columnId) {
        let column = null;
        table.columns.forEach(function(item) {
            if (item.id === columnId) {
                column = item;
            }
        });
        return column;
    };
    //数据排序
    import { getValueByPath } from 'element-ui/src/utils/util';
    const isObject = function(obj) {
        return obj !== null && typeof obj === 'object';
    };
    const orderBy = function(array, sortKey, reverse, sortMethod, sortBy) {
        if (!sortKey && !sortMethod && (!sortBy || Array.isArray(sortBy) && !sortBy.length)) {
            return array;
        }
        if (typeof reverse === 'string') {
            reverse = reverse === 'descending' ? -1 : 1;
        } else {
            reverse = (reverse && reverse < 0) ? -1 : 1;
        }
        const getKey = sortMethod ? null : function(value, index) {
            if (sortBy) {
                if (!Array.isArray(sortBy)) {
                    sortBy = [sortBy];
                }
                return sortBy.map(function(by) {
                    if (typeof by === 'string') {
                        return getValueByPath(value, by);
                    } else {
                        return by(value, index, array);
                    }
                });
            }
            if (sortKey !== '$key') {
                if (isObject(value) && '$value' in value) value = value.$value;
            }
            return [isObject(value) ? getValueByPath(value, sortKey) : value];
        };
        const compare = function(a, b) {
            if (sortMethod) {
                return sortMethod(a.value, b.value);
            }
            for (let i = 0, len = a.key.length; i < len; i++) {
                if (a.key[i] < b.key[i]) {
                    return -1;
                }
                if (a.key[i] > b.key[i]) {
                    return 1;
                }
            }
            return 0;
        };
        return array.map(function(value, index) {
            return {
                value: value,
                index: index,
                key: getKey ? getKey(value, index) : null
            };
        }).sort(function(a, b) {
            let order = compare(a, b);
            if (!order) {
                // make stable https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
                order = a.index - b.index;
            }
            return order * reverse;
        }).map(item => item.value);
    };
    const sortData = (data, states) => {
        const sortingColumn = states.sortingColumn;
        if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
            return data;
        }
        return orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
    };

    export default {
        name: 'DataTable',
        directives:{
            infiniteScroll
        },
        props:{
            data: Array,

            size: String,

            width: [String, Number],

            height: [String, Number],

            maxHeight: [String, Number],

            rowKey: [String, Function],

            currentRowKey: [String, Number]
        },
        data() {
            return {
                originalData: [],
                showData: [],
                filteredData: [],
                pageSize: 20,
                startPosition: 0,
                stopPosition: 0,

                states: {},

                currentRow: undefined,
                newRowKey: 0,

                //错误数据定位
                errorList: [],
                errorPosition: 0,

                //错误信息展示相关
                errorMsg: undefined,
                showError: false //防止重复触发

            }
        },
        methods:{
            reachEdge(edge){
                !this.loadData(edge) ? (edge === 'top' ? this.$message.info('已经到顶啦!') : this.$message.info('已经到底啦!')) : '';
            },
            loadData(edge){
                if(edge === 'top'){
                    if(this.startPosition !== 0){
                        for(let i = 0; i < this.pageSize && this.startPosition > 0; i++){
                            this.showData.unshift(this.filteredData[this.startPosition - 1]);

                            this.startPosition --;
                        }
                        return true;
                    }
                    return false;
                }

                if(edge === 'bottom'){
                    if(this.stopPosition !== this.filteredData.length){
                        for(let i = 0; i < this.pageSize && this.stopPosition < this.filteredData.length; i++){
                            this.showData.push(this.filteredData[this.stopPosition]);

                            this.stopPosition ++;
                        }
                        return true;
                    }
                    return false;
                }
            },
            onRowClick(row, column, event){
                this.currentRow = row;
            },
            beforeSortFilter(states){
                this.states = states;
                //阻止表格排序
                this.showData = [];
            },
            onSortChange(){
                this.filteredData = sortData(this.filteredData, this.states);
                this.showData = this.filteredData.slice(this.startPosition, this.stopPosition);
            },
            onFilterChange(filters){
                var _this = this;

                var states = this.states;
                var filters = states.filters;

                this.filteredData = this.data;

                Object.keys(filters).forEach(function (columnId) {
                    var values = states.filters[columnId];
                    if (!values || values.length === 0) return;
                    var column = Object(getColumnById)(_this.states, columnId);
                    if (column && column.filterMethod) {
                        _this.filteredData = _this.filteredData.filter(function (row) {
                            return values.some(function (value) {
                                return column.filterMethod.call(null, value, row, column);
                            });
                        });
                    }
                });

                //初始化分页
                this.startPosition = 0;
                this.stopPosition = 0;
                this.loadData('bottom');
            },

            getOriginalData(){
                return this.originalData;
            },
            setOriginalData(originalData){
                this.filteredData = originalData;
                this.originalData = this.$util.object.copy(originalData);
            },
            refreshTable(dataSource){
                //复制数据源
                this.setOriginalData(dataSource);

                this.$refs.table.clearFilter();
                this.filteredData = sortData(this.filteredData, this.states);

                //初始化分页
                this.showData = [];
                this.startPosition = 0;
                this.stopPosition = 0;
                this.loadData('bottom');
            },

            getCurrentRow(){
                return this.currentRow;
            },

            prependRow(row){
                //设置主键的值
                row[this.rowKey] = --this.newRowKey;

                //添加数据
                this.filteredData.splice(this.startPosition, 0, row);
                this.filteredData != this.data ? this.data.unshift(row) : '';
                this.showData.unshift(row);

                //数据加载重新定位
                this.stopPosition ++;

                //页面滚动到目标行
                this.scrollToRowByKey(row[this.rowKey]);
            },
            scrollToRowByKey(key){
                for(let i = 0; i < this.filteredData.length; i++){
                    if(this.filteredData[i][this.rowKey] == key){
                        this.showData = [];
                        this.startPosition = i;
                        this.stopPosition = i;
                        this.loadData('bottom');
                        this.loadData('top');

                        this.$nextTick(function () {
                            //定位数据
                            this.$refs.table.bodyWrapper.scrollTop = (i - this.startPosition) / (this.stopPosition - this.startPosition) *
                                (this.$refs.table.bodyWrapper.scrollHeight - this.$refs.table.bodyWrapper.clientHeight);
                        });
                        return true;
                    }
                }
                return false;
            },
            deleteRow(row){
                let index = this.showData.indexOf(row);
                if (index !== -1) {
                    this.showData.splice(index, 1);
                }

                index = this.data.indexOf(row);
                if (index !== -1) {
                    this.data.splice(index, 1);
                }

                //数据加载重新定位
                this.stopPosition --;

                return index;
            },
            delectCurrentRow(){
                //删除行
                let index = this.deleteRow(this.currentRow);

                //换行
                this.currentRow = this.data[index];
                this.$refs.table.setCurrentRow(this.currentRow);
            },

            getModifiedData(){
                var modifiedData = {
                    insert: [],
                    update: [],
                    delete: []
                };

                var offset = 0;
                for(let i = 0; i < this.originalData.length; i++){
                    if(!this.data[i + offset]){
                        modifiedData.delete.push(this.originalData[i]);
                        continue;
                    }

                    while(this.data[i + offset][this.rowKey] < 0){
                        modifiedData.insert.push(this.data[i + offset]);
                        offset ++;
                    }

                    if(this.originalData[i][this.rowKey] !== this.data[i + offset][this.rowKey]){
                        modifiedData.delete.push(this.originalData[i]);
                        offset --;
                        continue;
                    }

                    for(let key in this.originalData[i]){
                        if(this.originalData[i][key] !== this.data[i + offset][key]){
                            modifiedData.update.push({
                                new: this.data[i + offset],
                                old: this.originalData[i]
                            });

                            break;
                        }
                    }
                }

                return modifiedData;
            },
            setErrorData(errorData){
                this.errorList = [];
                this.errorPosition = 0;

                //新增错误数据重新添加与处理
                for(let i = errorData.insert.length; i > 0; i--){
                    errorData.insert[i-1].data.errorMsg_ = errorData.insert[i-1].msg;
                    this.prependRow(errorData.insert[i-1].data);
                    this.errorList.unshift(this.newRowKey);
                }

                for(let i = 0; i < this.filteredData.length; i++){
                    var row = this.filteredData[i];
                    //修改错误处理
                    for(let j = 0; j < errorData.update.length; j++){
                        if(row[this.rowKey] === errorData.update[j].data[this.rowKey]){
                            //修改错误的数据数据保留
                            for(let key in row){
                                if(row[key] !== errorData.update[j].data[key]){
                                    row[key] = errorData.update[j].data[key];
                                }
                            }

                            row.errorMsg_ = errorData.update[j].msg;
                            this.errorList.push(row[this.rowKey]);

                            i++;
                            row = this.filteredData[i];
                            continue;
                        }
                    }

                    //删除错误处理
                    for(let j = 0; j < errorData.delete.length; j++){
                        if(row[this.rowKey] === errorData.delete[j].data[this.rowKey]){
                            row.errorMsg_ = errorData.delete[j].msg;
                            this.errorList.push(row[this.rowKey]);
                            break;
                        }
                    }
                }
            },
            scrollToError(){
                if(this.errorList.length){
                    this.scrollToRowByKey(this.errorList[this.errorPosition]) ?
                        '' : this.$message.info('未找到保存失败的记录,请取消 过滤 后重试');

                    this.errorPosition++;
                    if(this.errorPosition == this.errorList.length){
                        this.errorPosition = 0;
                    }
                }else{
                    this.$message.info('暂无保存失败的记录');
                }
            },
            rowClassName({row, rowIndex}){
                //错误数据标记
                var rowClass = '';
                if(row.errorMsg_){
                    if(row[this.rowKey] < 0){
                        //新增错误的数据标记
                        rowClass = 'insertError';
                    }else{
                        rowClass = 'updateError';
                    }
                }

                return rowClass;
            },
            onCellMouseEnter(row, column, cell, event){
                if(!this.showError){
                    //防止重复触发
                    if(row.errorMsg_){
                        this.showError = true;
                        setTimeout(() => {
                            this.showError = false;
                            this.errorMsg = this.$message.warning(row.errorMsg_);
                        },250);
                    }else{
                        this.errorMsg = undefined;
                    }
                }
            },
            onCellMouseLeave(row, column, cell, event){
                !this.errorMsg || this.errorMsg();
            }
        },
        mounted(){
            //复制数据源
            this.setOriginalData(this.data);

            //初始化分页
            this.loadData('bottom');
        }
    }
</script>

<style>
    .el-table .el-table__body tr.insertError td,
    .el-table .el-table__body tr.updateError td{
        background: #FDE2E2;
    }
</style>