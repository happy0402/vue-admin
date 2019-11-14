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
            :class-name="modalClass"
            :z-index="zIndex"
            :transition-names="transitionNames"
            :transfer="transfer"
            @on-cancel="onCancel('close')">

        <!-- close -->
        <template slot="close">
            <slot name="close"></slot>
        </template>

        <!-- header -->
        <template slot="header">
            <slot name="header"></slot>
        </template>

        <!-- content -->
        <slot name="default"></slot>

        <!-- footer -->
        <template slot="footer">
            <slot name="footer">
                <el-button
                        size="small"
                        @click="onCancel('cancel')"
                >{{ cancelText || $t('i.modal.cancelText') }}</el-button>
                <el-button
                        size="small"
                        type="primary"
                        @click="onOk"
                        :loading="loadingButton"
                >{{ okText || $t('i.modal.okText') }}</el-button>
            </slot>
        </template>
    </Modal>
</template>

<script>
    import { Modal } from 'view-design';

    export default {
        nane: 'Dialog',
        components:{
            Modal
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            closable: {
                type: Boolean,
                default: true
            },
            maskClosable: {
                type: Boolean,
                default () {
                    return !this.$IVIEW || this.$IVIEW.modal.maskClosable === '' ? true : this.$IVIEW.modal.maskClosable;
                }
            },
            title: {
                type: String
            },
            width: {
                type: [Number, String],
                default: 520
            },
            okText: {
                type: String
            },
            cancelText: {
                type: String
            },
            styles: {
                type: Object
            },
            className: {
                type: String
            },
            // for instance
            footerHide: {
                type: Boolean,
                default: false
            },
            scrollable: {
                type: Boolean,
                default: false
            },
            transitionNames: {
                type: Array,
                default () {
                    return ['ease', 'fade'];
                }
            },
            transfer: {
                type: Boolean,
                default () {
                    return !this.$IVIEW || this.$IVIEW.transfer === '' ? true : this.$IVIEW.transfer;
                }
            },
            fullscreen: {
                type: Boolean,
                default: false
            },
            mask: {
                type: Boolean,
                default: true
            },
            draggable: {
                type: Boolean,
                default: false
            },
            zIndex: {
                type: Number,
                default: 1000
            },
        },
        data(){
            return {
                loadingButton: false,
                modalClass: 'ordinaryModule' //默认样式
            }
        },
        methods: {
            onVisiableChange(status){
                if(this.loading && status === false){
                    this.loadingButton = false;
                }
                this.$emit('on-visible-change', status);
                this.$emit('input', status);
            },
            onOk(){
                //若函数返回false,则不关闭弹窗
                if(this.$emit('on-ok') === false || this.loading){
                    this.loadingButton = true;
                    return;
                }
                this.visible = false;
                this.$emit('input', false);
            },
            onCancel(type){
                //若函数返回false,则不关闭弹窗
                if(this.$emit('on-cancel', type) === false){
                    return;
                }
                this.visible = false;
                this.$emit('input', false);
            }
        },
        mounted(){
            if(!this.className){
                if(this.footerHide){
                    this.modalClass = 'footerHideModule';
                }
            }else{
                this.modalClass = this.className;
            }
        },
        confirm: Modal.confirm,
        info: Modal.info,
        success: Modal.success,
        warning: Modal.warning,
        error: Modal.error,
        remove: Modal.remove
    }
</script>