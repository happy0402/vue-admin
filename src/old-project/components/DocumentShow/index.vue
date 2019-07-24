<template>
    <div class="documentContainer">
        <el-row
                v-for="(row, rowIndex) in showConfig"
                :key="rowIndex"
                :gutter="row.config.gutter"
                :class="selected && row.controllerIndex == selected.controllerIndex ? 'activeController' : ''"
                :style="row.config.controllerStyle">
            <el-col
                    v-for="(col, colIndex) in row.children"
                    :key="colIndex"
                    :span="col.config.span"
                    :offset="col.config.offset"
                    :class="selected && col.controllerIndex == selected.controllerIndex ? 'activeController' : ''"
                    :style="col.config.controllerStyle"
                    @click.native="$emit('selected-item', col , col._index, config)">
                <template v-for="(controller, index) in col.children">
                    <span
                            v-if="controller.type==='Text'"
                            :key="index"
                            :class="selected && controller.controllerIndex == selected.controllerIndex ? 'activeController' : ''"
                            :style="controller.config.controllerStyle">
                        {{ controller.source }}
                    </span>
                    <el-radio-group
                            v-if="controller.type==='Radio'"
                            :key="index"
                            :class="selected && controller.controllerIndex == selected.controllerIndex ? 'activeController' : ''"
                            v-model="answer[controller.name]"
                            :style="controller.config.controllerStyle">
                        <el-radio
                                v-for="(item,index) in controller.source"
                                :key="index"
                                :label="item.code">
                            {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                    <el-checkbox-group
                            v-if="controller.type==='Check'"
                            :key="index"
                            :class="selected && controller.controllerIndex == selected.controllerIndex ? 'activeController' : ''"
                            v-model="answer[controller.name]"
                            :style="controller.config.controllerStyle">
                        <el-checkbox
                                v-for="(item,index) in controller.source"
                                :key="index"
                                :label="item.code"
                                :value="item.name">
                        </el-checkbox>
                    </el-checkbox-group>
                    <el-select
                            v-if="controller.type==='Select'"
                            :key="index"
                            :class="selected && controller.controllerIndex == selected.controllerIndex ? 'activeController' : ''"
                            v-model="answer[controller.name]"
                            :style="controller.config.controllerStyle"
                            :placeholder="controller.config.placeholder">
                        <el-option
                                v-for="(item,index) in controller.source"
                                :key="index"
                                :label="item.name"
                                :value="item.code"></el-option>
                    </el-select>
                    <el-input
                            v-if="controller.type === 'Input'"
                            :key="index"
                            :class="selected && controller.controllerIndex == selected.controllerIndex ? 'activeController' : ''"
                            v-model="answer[controller.name]"
                            :style="controller.config.controllerStyle"
                            :placeholder="controller.config.placeholder"></el-input>
                    <el-input
                            v-if="controller.type === 'Area'"
                            :key="index"
                            :class="selected && controller.controllerIndex == selected.controllerIndex ? 'activeController' : ''"
                            v-model="answer[controller.name]"
                            :style="controller.config.controllerStyle"
                            type="textarea"
                            autosize
                            :placeholder="controller.config.placeholder"></el-input>
                </template>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default{
        name: 'DocumentShow',
        props: {
            config: {
                type: Array,
                required: true
            },
            answer: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            selected: Object
        },
        data(){
            return {
                documentShow: undefined
            }
        },
        computed: {
            showConfig(){
                var showConfig = [];
                var Row = undefined,
                    Col = undefined;

                this.config.forEach((controller, index) => {
                    this.analyseSource(controller);
                    controller._index = index;

                    if(controller.type === 'Row'){
                        controller.children = [];
                        controller.config.controllerStyle = controller.config.style +
                            'padding:' + controller.config.padding + ';' +
                            'margin:' + controller.config.margin + ';';
                        showConfig.push(controller);
                        Row = controller;
                        Col = undefined;
                        return ;
                    }

                    if(Row && controller.type === 'Col'){
                        controller.children = [];
                        controller.config.controllerStyle = controller.config.style +
                            'text-align:' + controller.config.textAlign + ';';
                        Row.children.push(controller);
                        Col = controller;
                        return ;
                    }

                    if(Col){
                        if(controller.type === 'Text'){
                            controller.config.controllerStyle = controller.config.style + 'fonts-size:' + controller.config.fontSize + 'px;';
                            controller.config.controllerStyle += 'letter-spacing:' + controller.config.letterSpacing + 'px;';
                            controller.config.fontWeight ?
                                controller.config.controllerStyle += 'fonts-weight: bold;' : '';
                        }else if(controller.type === 'Input' || controller.type === 'Select'){
                            if(isNaN(Number(controller.config.width))){
                                controller.config.controllerStyle = controller.config.style + 'width:' + controller.config.width;
                            }else{
                                controller.config.controllerStyle = controller.config.style + 'width:' + controller.config.width + 'px;';
                            }
                        }else{
                            controller.config.controllerStyle = controller.config.style;
                        }

                        Col.children.push(controller);
                    }
                });

                return showConfig;
            }
        },
        methods:{
            analyseSource(item){
                if(!this.answer[item.name]){
                    if(item.defaultType === 'fixed'){
                        //固定默认值
                        if(item.type === 'Check'){
                            //复选控件
                            this.$set(this.answer, item.name, JSON.parse(item.defaultValue));
                        }else{
                            this.$set(this.answer, item.name, item.defaultValue);
                        }
                    }
                }

                if(this.selected){
                    //配置
                    if(item.sourceType){
                        if(item.sourceType === 'fixed'){
                            //固定数据源
                            if(item.type === 'Radio' || item.type === 'Check' || item.type === 'Select'){
                                item.source = item.fixedSource;
                            }else{
                                item.source = item.fixedSource;
                            }
                        }
                    }
                }else{
                    //使用
                    item.config = JSON.parse(item.configs);

                    if(item.sourceType){
                        if(item.sourceType === 'fixed'){
                            //固定数据源
                            if(item.type === 'Radio' || item.type === 'Check' || item.type === 'Select'){
                                item.source = JSON.parse(item.sourceValue);
                            }else{
                                item.source = item.sourceValue;
                            }
                        }
                    }
                }
            },
            getAnwser(){
                return this.answer;
            }
        }
    }
</script>

<style lang="scss">
    @import "~#/styles/variables.scss";

    .documentContainer{
        width: 210mm;
        margin: 0 auto;
        padding: 20px;
        margin-bottom: 50px;

        .el-checkbox-group{
            display: inline-block;
        }

        .el-row{
            margin-bottom: 5px;
        }

        .activeController{
            border: 1px dashed $tiffany;
        }

        .el-input__inner{
            height: 17.5px;
            line-height: 17.5px;
            font-size: 16px;
            border-top: none;
            border-left: none;
            border-right: none;
            padding: 0 0 1px 0;
        }

        .el-input__icon{
            line-height: 18.25px;
        }
    }
</style>