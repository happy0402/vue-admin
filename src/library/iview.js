/**
 * Created by zkx on 2019/6/20.
 */
import Vue from 'vue';
import {
    locale,
    // DatePicker,
    Message
} from 'iview';

import '#/styles/iview-variable.less';

import i18n from '#/lang' // Internationalization

// Vue.component('DatePicker', DatePicker);

Vue.prototype.$message = Message;
Message.config({
    duration: 3
});

locale(i18n.messages[i18n.locale]);

import '#/styles/iview.scss';//iview 组件样式覆盖