/**
 * Created by zkx on 2019/6/27.
 */
import Vue from 'vue';
import Dialog from './components/Dialog';
import DatePicker from './components/DatePicker';

Vue.component('sf-dialog', Dialog);
Vue.component('sf-datePicker', DatePicker);

Vue.prototype.$modal = Dialog;