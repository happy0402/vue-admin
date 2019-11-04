/**
 * Created by zkx on 2019/6/20.
 */
import Vue from 'vue';
import {
    locale,
    Card,

    Dropdown,
    DropdownMenu,
    DropdownItem,

    Message,
    LoadingBar
} from 'iview';

import '#/styles/iview-variable.less';

import i18n from '#/lang' // Internationalization

Vue.component('i-card', Card);
Vue.component('i-dropdown', Dropdown);
Vue.component('i-dropdown-menu', DropdownMenu);
Vue.component('i-dropdown-item', DropdownItem);

Vue.prototype.$loadingBar = LoadingBar;

Vue.prototype.$message = Message;
Message.config({
    duration: 3
});

locale(i18n.messages[i18n.locale]);

import '#/styles/iview.scss';//iview 组件样式覆盖