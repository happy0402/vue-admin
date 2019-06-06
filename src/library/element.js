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
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    Button,
    ButtonGroup,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Icon,
    Row,
    Col,
    Container,
    Header,
    Aside,
    Main,
    Divider,
    Message,

    Table,
    TableColumn
} from 'element-ui';

import './styles/element-variables.scss'

import i18n from './lang' // Internationalization
import ElementLocale from 'element-ui/lib/locale';

// import Cookies from 'js-cookie';

Vue.prototype.$ELEMENT = { size: 'medium' };//Cookies.get('size') || 'small'

Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Divider);

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);

Vue.use(Tooltip);

Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);

Vue.use(Scrollbar);

Vue.use(Icon);

Vue.use(Row);
Vue.use(Col);

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
Vue.use(Autocomplete);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Link);

Vue.use(Table);
Vue.use(TableColumn);

Vue.prototype.$message = Message;

ElementLocale.i18n((key, value) => i18n.t(key, value));