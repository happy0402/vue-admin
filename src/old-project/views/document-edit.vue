<template>
    <el-container class="documentEditContainer">
        <el-aside width="35%">
            <el-container class="leftContainer">
                <el-aside width="auto">
                    <el-scrollbar wrap-class="scrollbarWrapper">
                        <draggable
                                class="dragArea typeList"
                                :list="controlType"
                                :group="{ name: 'control', pull: 'clone', put: false }"
                                :clone="cloneItem"
                        >
                            <div
                                    class="listItem"
                                    v-for="(element,index) in controlType"
                                    :class="element.controllerIndex == selected.target.controllerIndex ? 'activeItem' : ''"
                                    :key="index"
                                    @click="selectedController(element, index, controlType)"
                                    @dblclick="pushController(element)"
                            >
                                {{ element.type }}
                            </div>
                        </draggable>
                    </el-scrollbar>
                </el-aside>
                <el-container>
                    <el-aside width="auto">
                        <el-scrollbar wrap-class="scrollbarWrapper">
                            <draggable
                                    class="dragArea"
                                    :list="configList"
                                    group="control"
                            >
                                <div
                                        class="listItem"
                                        v-for="(element,index) in configList"
                                        :class="element.controllerIndex == selected.target.controllerIndex ? 'activeItem' : ''"
                                        :key="index"
                                        @click="selectedController(element, index, configList)"
                                >
                                    {{ element.type }}
                                    <i class="el-icon-circle-close" @click.stop="deleteController(index)"></i>
                                </div>
                            </draggable>
                        </el-scrollbar>
                    </el-aside>
                    <el-main>

                        <el-form :model="selected.target" label-width="70px" label-position="left">

                            <el-form-item v-show="selected.target.type !== 'Row' && selected.target.type !== 'Col' && selected.target.type !== 'Text'" label="名称">
                                <el-input v-model="selected.target.name"></el-input>
                            </el-form-item>

                            <div v-show="selected.target.sourceType">
                                <!-- 数据源配置 -->
                                <el-form-item label="数据源" style="margin-bottom: 5px;">
                                    <el-radio-group v-model="selected.target.sourceType">
                                        <el-radio label="fixed">固定数据源</el-radio>
                                        <el-radio label="dynamic">动态数据源</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item v-show="selected.target.sourceType === 'fixed'">
                                    <!-- 固定数据源配置 -->
                                    <template v-if="selected.target.type === 'Text' || selected.target.type === 'Input' || selected.target.type === 'Area'">
                                        <el-input v-model="selected.target.fixedSource"></el-input>
                                    </template>
                                    <template v-else>
                                        <template
                                                v-for="(item, index) in selected.target.fixedSource">
                                            <el-row :gutter="5" style="margin-bottom: 5px;" :key="index">
                                                <el-col :span="10">
                                                    <el-input v-model="item.code" placeholder="code"></el-input>
                                                </el-col>
                                                <el-col :span="10">
                                                    <el-input v-model="item.name" placeholder="name"></el-input>
                                                </el-col>
                                                <el-col :span="4" class="alignRight">
                                                    <el-button @click.prevent="removeSourceItem(index)" type="danger" icon="el-icon-minus" circle></el-button>
                                                </el-col>
                                            </el-row>
                                        </template>
                                        <el-form-item class="alignRight">
                                            <el-col :span="24" class="alignRight">
                                                <el-button @click.prevent="addSourceItem()" type="primary" icon="el-icon-plus" circle></el-button>
                                            </el-col>
                                        </el-form-item>
                                    </template>

                                </el-form-item>
                                <el-form-item v-show="selected.target.sourceType === 'dynamic'">
                                    <!-- 动态数据源配置 -->
                                    <el-input type="textarea" v-model="selected.target.dynamicSource"></el-input>
                                </el-form-item>
                            </div>

                            <div v-show="selected.target.defaultType">
                                <!-- 默认值配置 -->
                                <el-form-item label="默认值" style="margin-bottom: 5px;">
                                    <el-radio-group v-model="selected.target.defaultType">
                                        <el-radio label="fixed">固定默认值</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>

                            <div v-show="selected.target.type === 'Row'">
                                <el-form-item label="栅格间隔">
                                    <el-input-number v-model="selected.target.config.gutter" :min="0"></el-input-number>
                                </el-form-item>
                                <el-form-item label="padding">
                                    <el-input v-model="selected.target.config.padding"></el-input>
                                </el-form-item>
                                <el-form-item label="margin">
                                    <el-input v-model="selected.target.config.margin"></el-input>
                                </el-form-item>
                            </div>

                            <div v-show="selected.target.type === 'Col'">
                                <el-form-item label="栅格宽度">
                                    <el-input-number v-model="selected.target.config.span" :min="1" :max="24 - selected.target.config.offset"></el-input-number>
                                </el-form-item>
                                <el-form-item label="偏移量">
                                    <el-input-number v-model="selected.target.config.offset" :min="0" :max="24 - selected.target.config.span"></el-input-number>
                                </el-form-item>
                                <el-form-item label="对齐方式">
                                    <el-radio-group v-model="selected.target.config.textAlign">
                                        <el-radio label="left">左对齐</el-radio>
                                        <el-radio label="center">居中</el-radio>
                                        <el-radio label="right">右对齐</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>

                            <div v-show="selected.target.type === 'Text'">
                                <el-form-item label="字体大小">
                                    <el-input-number v-model="selected.target.config.fontSize" :min="12" :max="100"></el-input-number>
                                </el-form-item>
                                <el-form-item label="字体间隔">
                                    <el-input-number v-model="selected.target.config.letterSpacing" :min="0" :max="100"></el-input-number>
                                </el-form-item>
                                <el-form-item label="加粗">
                                    <el-switch v-model="selected.target.config.fontWeight"></el-switch>
                                </el-form-item>
                            </div>

                            <el-form-item v-show="selected.target.type === 'Input' || selected.target.type === 'Select'" label="宽度">
                                <el-input v-model="selected.target.config.width"></el-input>
                            </el-form-item>

                            <el-form-item
                                    v-show="selected.target.type === 'Input' || selected.target.type === 'Select' || selected.target.type === 'Area'"
                                    label="提示语">
                                <el-input v-model="selected.target.config.placeholder"></el-input>
                            </el-form-item>

                            <el-form-item label="style">
                                <el-input v-model="selected.target.config.style"></el-input>
                            </el-form-item>

                            <el-form-item class="alignRight">
                                <el-button type="primary" @click="onSubmit">保存</el-button>
                            </el-form-item>
                        </el-form>

                    </el-main>
                </el-container>
            </el-container>
        </el-aside>
        <el-main>

            <document-show ref="documentShow" :config="configList" :selected="selected.target"></document-show>

        </el-main>
    </el-container>
</template>

<script>
    import Draggable from 'vuedraggable'
    import DocumentShow from '@/old-project/components/DocumentShow'
    import { shortcutJS } from 'shortcutjs'

    //test-data
    import ConfigData from '@/old-project/test-data/document-config'
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";

    var idGlobal = 1;
    export default {
        components: {
            ElFormItem,
            Draggable,
            DocumentShow
        },
        data(){
            return {
                controlType: [
                    {
                        controllerIndex: 'controllerRow',
                        type: "Row",
                        config: {
                            gutter: 0,
                            padding:'',
                            margin:'',
                            style: ''
                        }
                    },
                    {
                        controllerIndex: 'controllerCol',
                        type: "Col",
                        config: {
                            span: 24,
                            offset: 0,
                            textAlign: 'left',
                            style: ''
                        }
                    },
                    {
                        controllerIndex: 'controllerText',
                        type: "Text",
                        sourceType: 'fixed',
                        fixedSource: 'text',
                        dynamicSource: '',
                        config: {
                            fontSize: 16,
                            letterSpacing: 0,
                            fontWeight: false,
                            style: ''
                        }
                    },
                    {
                        controllerIndex: 'controllerRadio',
                        type: "Radio",
                        name: 'radio',
                        sourceType: 'fixed',
                        fixedSource: [
                            {
                                code: 'key',
                                name: 'value'
                            }
                        ],
                        dynamicSource: '',
                        defaultType: 'fixed',
                        defaultValue: '',
                        config: {
                            style: ''
                        }
                    },
                    {
                        controllerIndex: 'controllerCheck',
                        type: "Check",
                        name: 'check',
                        sourceType: 'fixed',
                        fixedSource: [
                            {
                                code: 'key',
                                name: 'value'
                            }
                        ],
                        dynamicSource: '',
                        defaultType: 'fixed',
                        defaultValue: "[]",
                        config: {
                            style: ''
                        }
                    },
                    {
                        controllerIndex: 'controllerSelect',
                        type: "Select",
                        name: 'select',
                        sourceType: 'fixed',
                        fixedSource: [
                            {
                                code: 'key',
                                name: 'value'
                            }
                        ],
                        dynamicSource: '',
                        defaultType: 'fixed',
                        defaultValue: '',
                        config: {
                            width: '100%',
                            placeholder: '请选择',
                            style: ''
                        }
                    },
                    {
                        controllerIndex: 'controllerInput',
                        type: "Input",
                        name: 'input',
                        defaultType: 'fixed',
                        defaultValue: '',
                        config: {
                            width: '100%',
                            placeholder: '请输入内容',
                            style: ''
                        }
                    },
                    {
                        controllerIndex: 'controllerDate',
                        type: "Date",
                        name: 'date',
                        defaultType: 'fixed',
                        defaultValue: '',
                        config: {
                            style: ''
                        }
                    },
                    {
                        controllerIndex: 'controllerArea',
                        type: "Area",
                        name: 'area',
                        defaultType: 'fixed',
                        defaultValue: '',
                        config: {
                            placeholder: '请输入内容',
                            style: ''
                        }
                    },
                    {
                        controllerIndex: 'controllerTable',
                        type: "Table",
                        name: 'table',
                        sourceType: 'fixed',
                        fixedSource: 'table',
                        dynamicSource: '',
                        config: {
                            style: ''
                        }
                    }
                ],
                configList: undefined,
                selected: {
                    index: 0,
                    arr: undefined,
                    target: undefined,
                }
            }
        },
        methods:{
            getConfigList(configData){
                //data -> config
                configData.forEach((item) => {
                    item.controllerIndex = ++idGlobal;
                    if(item.sourceType === 'fixed'){
                        if(item.type === 'Radio' || item.type === 'Check' || item.type === 'Select'){
                            item.fixedSource = JSON.parse(item.sourceValue);
                        }else{
                            item.fixedSource = item.sourceValue;
                        }
                        item.dynamicSource = '';
                    }else{
                        item.fixedSource = '';
                        item.dynamicSource = item.sourceValue;
                    }

                    item.config = JSON.parse(item.configs);
                });

                return configData;
            },
            getDataList(defaultValue){
                //config -> data
                return JSON.parse(JSON.stringify(this.configList)).map((item) => {
                    if(item.sourceType === 'fixed'){
                        if(item.type === 'Radio' || item.type === 'Check' || item.type === 'Select'){
                            item.sourceValue = JSON.stringify(item.fixedSource);
                        }else{
                            item.sourceValue = item.fixedSource;
                        }
                    }else{
                        item.sourceValue = item.dynamicSource;
                    }

                    if(item.defaultType === 'fixed'){
                        if(item.type === 'Check'){
                            item.defaultValue = JSON.stringify(defaultValue[item.name]);
                        }else{
                            item.defaultValue = defaultValue[item.name];
                        }
                    }

                    delete item.config.controllerStyle;
                    item.configs = JSON.stringify(item.config);

                    //可不删除元素，代码测试使用
                    delete item.children;
                    delete item.config;
                    delete item.fixedSource;
                    delete item.dynamicSource;
                    delete item.source;
                    delete item.controllerIndex;

                    return item;
                });
            },
            cloneItem(defaultConfig) {
                var controller = JSON.parse(JSON.stringify(defaultConfig));
                controller.controllerIndex = ++idGlobal;
                if(controller.type !== 'Row' && controller.type !== 'Col' && controller.type !== 'Text'){
                    controller.name += (new Date().getTime()).toString() + idGlobal;
                }
                return controller;
            },
            pushController(defaultConfig){
                var controller = this.cloneItem(defaultConfig);
                this.configList.push(controller);
            },
            deleteController(index){
                this.configList.splice(index, 1)
            },
            selectedController(item, index, arr){
                this.selected.target = item;
                this.selected.index = index;
                this.selected.arr = arr;
            },
            addSourceItem(){
                this.selected.target.fixedSource.push({
                    code: '',
                    name: ''
                });
            },
            removeSourceItem(index){
                this.selected.target.fixedSource.splice(index, 1)
            },
            onSubmit(){
                let answer = this.$refs.documentShow.getAnwser();
                console.log(JSON.stringify(this.getDataList(answer)));
            }
        },
        created(){
            this.$store.dispatch('app/setFixedPage', true);

            //加载configList

            //configList数据源预处理 sourceValue -> fixedSource | dynamicSource
            this.configList = this.getConfigList(ConfigData);


            //默认选中项
            this.selected.target = this.configList[0];
            this.selected.index = 0;
            this.selected.arr = this.configList;
        },
        mounted(){
            var that = this;
            shortcutJS.subscribe('up', () => {
                if(that.selected.index - 1 < 0){
                    that.selected.index = that.selected.arr.length - 1;
                    that.selected.target = that.selected.arr[that.selected.index];
                }else{
                    that.selected.index --;
                    that.selected.target = that.selected.arr[that.selected.index];
                }
            });
            shortcutJS.subscribe('down', () => {
                if(that.selected.index + 1 < that.selected.arr.length){
                    that.selected.index ++;
                    that.selected.target = that.selected.arr[that.selected.index];
                }else{
                    that.selected.index = 0;
                    that.selected.target = that.selected.arr[0];
                }
            });
        }
    }
</script>

<style lang="scss">
    @import "~#/styles/variables.scss";

    .alignRight{
        text-align: right;
    }

    .documentEditContainer{
        .leftContainer{
            .el-aside{
                margin-right: 10px;
                border: $firstBorder;
                min-width: 20px;

                .el-scrollbar{
                    height: 100%;

                    .scrollbarWrapper {
                        overflow-x: hidden !important;
                    }
                }

                .dragArea{
                    min-height: 300px;
                    padding-bottom: 500px;

                    .listItem{
                        padding: 5px;

                        .el-icon-circle-close{
                            cursor: pointer;
                            float: right;
                            margin-left: 5px;
                        }
                    }

                    .activeItem{
                        background-color: $light-blue;
                        color: $white;
                    }
                }

                .typeList{
                    cursor: move;
                }
            }
        }

    }
</style>