/**
 * Created by Administrator on 2019/4/28.
 */
import Vue from 'vue';
import {
    Link,
    Scrollbar,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    Upload,
    Rate,
    Button,
    ButtonGroup,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tag,
    Row,
    Col,
    Container,
    Header,
    Aside,
    Main,
    Footer,

    Timeline,
    TimelineItem,

    Divider,

    Table,
    TableColumn,
    Tree,

    Notification
} from 'element-ui';

import '#/styles/element-variables.scss'

import i18n from '#/lang' // Internationalization
import ElementLocale from 'element-ui/lib/locale';

// import Cookies from 'js-cookie';

//由于iview的部分引用无法进行全局配置，请不要改变此处配置
Vue.prototype.$ELEMENT = { size: 'small' };//Cookies.get('size') || 'small'

Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);

Vue.use(Row);
Vue.use(Col);

Vue.use(Divider);

Vue.use(Timeline);
Vue.use(TimelineItem);

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);

Vue.use(Tooltip);

Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);

Vue.use(Scrollbar);

Vue.use(Tabs);
Vue.use(TabPane);

Vue.use(Tag);

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.use(Form);
Vue.use(FormItem);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Switch);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Autocomplete);
Vue.use(Select);
Vue.use(Option);
Vue.use(Upload);
Vue.use(Rate);

Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Link);



Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tree);

Vue.prototype.$notify = Notification;

ElementLocale.i18n((key, value) => i18n.t(key, value));

import '#/styles/element.scss' //element-ui 样式覆盖