/**
 * Created by tx on 2019/6/20.
 */
import Vue from 'vue';
import {
    DatePicker,
    Message,
    Modal
} from 'iview';

import 'iview/dist/styles/iview.css';

Vue.component('DatePicker', DatePicker);
Vue.component('Modal', Modal);

Vue.prototype.$message = Message;
Message.config({
    duration: 3
});