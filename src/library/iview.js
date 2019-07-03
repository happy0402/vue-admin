/**
 * Created by tx on 2019/6/20.
 */
import Vue from 'vue';
import {
    locale,
    DatePicker,
    Message,
    Modal
} from 'iview';

import './styles/iview-variable.less';

import i18n from './lang' // Internationalization

Vue.component('DatePicker', DatePicker);
Vue.component('Modal', Modal);

Vue.prototype.$message = Message;
Message.config({
    duration: 3
});

Vue.prototype.$modal = Modal;

locale(i18n.messages[i18n.locale]);