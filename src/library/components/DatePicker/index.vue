<template>
    <DatePicker
            :type="type"
            v-model="dateTime"
            :format="format"
            :placement="placement"
            :placeholder="placeholder"
            :options="options"
            :split-panels="splitPanels"
            :multiple="multiple"
            :show-week-numbers="showWeekNumbers"
            :start-date="startDate"
            :confirm="confirm"
            :open="open"
            :size="size"
            :disabled="inputDisabled"
            :clearable="clearable"
            :readonly="readonly"
            :editable="editable"
            :transfer="transfer"
            :element-id="elementId"
            :time-picker-options="timePickerOptions"
            :separator="separator"
            @on-change="onChange"
            @on-open-change="onOpenChange"
            @on-ok="$emit('on-ok')"
            @on-clear="$emit('on-clear')"
            @on-clickoutside="onClickoutside">
        <slot name="default"></slot>
    </DatePicker>
</template>

<script>
    import { DatePicker } from 'iview';
    import Emitter from 'iview/src/mixins/emitter'
    import { TYPE_VALUE_RESOLVER_MAP } from 'iview/src/components/date-picker/util';

    export default {
        nane: 'DatePicker',
        mixins: [ Emitter ],
        inject: {
            elForm: {
                default: ''
            },
            elFormItem: {
                default: ''
            }
        },
        components: {
            DatePicker
        },
        props:{
            type: {
                type: String,
                default: 'date'
            },
            format: {
                type: String
            },
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            editable: {
                type: Boolean,
                default: true
            },
            clearable: {
                type: Boolean,
                default: true
            },
            confirm: {
                type: Boolean,
                default: false
            },
            open: {
                type: Boolean,
                default: null
            },
            multiple: {
                type: Boolean,
                default: false
            },
            timePickerOptions: {
                default: () => ({}),
                type: Object,
            },
            splitPanels:{
                type: Boolean,
                default: true
            },
            showWeekNumbers: {
                type: Boolean,
                default: false
            },
            startDate: {
                type: Date
            },
            size: {
                type: String,
                default () {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
                }
            },
            placeholder: {
                type: String,
                default: ''
            },
            placement: {
                type: String,
                default: 'bottom-start'
            },
            transfer: {
                type: Boolean,
                default () {
                    return !this.$IVIEW || this.$IVIEW.transfer === '' ? true : this.$IVIEW.transfer;
                }
            },
            name: {
                type: String
            },
            elementId: {
                type: String
            },
            steps: {
                type: Array,
                default: () => []
            },
            value: {
                type: [Date, String, Array]
            },
            options: {
                type: Object,
                default: () => ({})
            },
            separator: {
                type: String,
                default: ' - '
            },
            valueFormat: String
        },
        data(){
            return {
              dateTime: undefined
            }
        },
        computed:{
            inputDisabled() {
                return this.disabled || (this.elForm || {}).disabled;
            }
        },
        watch:{
            dateTime(value){
                if(this.valueFormat){
                    //数据格式化
                    this.$emit('input', this.formatDate(value, this.valueFormat));
                }else{
                    this.$emit('input', value);
                }
            }
        },
        methods:{
            formatDate(value, format){
                if (this.multiple) {
                    const formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter;
                    return formatter(value, format, this.separator);
                } else {
                    const {formatter} = (
                        TYPE_VALUE_RESOLVER_MAP[this.type] ||
                        TYPE_VALUE_RESOLVER_MAP['default']
                    );
                    return formatter(value, format, this.separator);
                }
            },
            onChange(date, type){
                this.$emit('on-change', date, type);
                this.dispatch('ElFormItem', 'el.form.change', this.dateTime);
            },
            onOpenChange(open){
                this.$emit('on-open-change', open);
            },
            onClickoutside(event){
                this.$emit('on-clickoutside', event);
            }
        }
    }
</script>