<template>
    <Modal
            :value="value"
            @on-visible-change="onVisiableChange"
            :title="title"
            :closable="closable"
            :mask-closable="maskClosable"
            :scrollable="scrollable"
            :fullscreen="fullscreen"
            :draggable="draggable"
            :mask="mask"
            :width="width"
            :footer-hide="footerHide"
            :styles="styles"
            :class-name="className"
            :z-index="zIndex"
            :transition-names="transitionNames"
            :transfer="transfer"
            @on-cancel="close">
        <template slot="header">
            <slot name="header"></slot>
        </template>
        <slot name="default"></slot>
        <template
                v-if="$slots.footer"
                slot="footer">
            <slot name="footer"></slot>
        </template>
        <template v-else
             slot="footer">
            <el-button
                    size="small"
                    @click="onCancel"
            >{{ cancelText || $t('i.modal.cancelText') }}</el-button>
            <el-button
                    size="small"
                    type="primary"
                    @click="onOk"
                    :loading="loadingButton"
            >{{ okText || $t('i.modal.okText') }}</el-button>
        </template>
    </Modal>
</template>

<script>
    export default{
        name: 'selfDialog',
        props:{
            value: Boolean,
            title: String,
            closable: {
                type: Boolean,
                default: true
            },
            maskClosable: {
                type: Boolean,
                default: true
            },
            loading: Boolean,
            scrollable: Boolean,
            fullscreen: Boolean,
            draggable: Boolean,
            mask: {
                type: Boolean,
                default: true
            },
            okText: String,
            cancelText: String,
            width: [String, Number],
            footerHide: Boolean,
            styles: Object,
            className: {
                type: String,
                default(){
                    if(this.footerHide){
                        return 'footerHideModule';
                    }
                    return 'ordinaryModule';
                }
            },
            zIndex: Number,
            transitionNames: Array,
            transfer: {
                type: Boolean,
                default: true
            },
            ok: {
                type: Function,
                default: () => {}
            },
            cancel: {
                type: Function,
                default: () => {}
            },
            close: {
                type: Function,
                default: () => {}
            }
        },
        data(){
            return {
                loadingButton: false
            }
        },
        methods: {
            onVisiableChange(status){
                if(this.loading && status === false){
                    this.loadingButton = false;
                }
                this.$emit('input', status);
            },
            onOk(){
                //若函数返回false,则不关闭弹窗
                if(this.ok() === false || this.loading){
                    this.loadingButton = true;
                    return;
                }
                this.$emit('input', false);
            },
            onCancel(){
                //若函数返回false,则不关闭弹窗
                if(this.cancel() === false){
                    return;
                }
                this.$emit('input', false);
            }
        }
    }
</script>