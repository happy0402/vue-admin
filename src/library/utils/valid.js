import i18n from '#/lang' // Internationalization
import stringUtil from './string'

export default {
    message:{
        type: (type) => {
            // 请输入正确的<type>
            return i18n.t('valid.inputRight') + i18n.t('valid.' + type);
        },
        required: (item) => {
            // <item>不能为空!
            return item + i18n.t('valid.isRequired');
        },
        range: (min, max) => {
            // 长度在 <min> 到 <max> 个字符
            return stringUtil.format(i18n.t('valid.range'), [min, max]);
        },
        len: (len) => {
            // 长度在 <len> 个字符
            return stringUtil.format(i18n.t('valid.len'), [len]);
        },
        whitespace: ()=> {
            // 请不要只输入空格
            return i18n.t('valid.whitespace');
        },
        phone: () => {
            return '手机号码错误!';
        },
        tel: () => {
            return '座机号码错误!';
        },
        postalCode: () => {
            return '邮政编码错误!';
        }
    },
    phone: /^1[3|4|5|7|8][0-9]{9}$/,
    tel: /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/,
    postalCode: /[1-9]\d{5}(?!\d)/,
    checkIdCard: (idCard) => {
        if (!/^\d{17}(\d|x)$/i.test(idCard)){
            return '身份证长度或格式错误';//身份证长度或格式错误
        }

        var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
        idCard = idCard.replace(/x$/i, "a");
        if (aCity[parseInt(idCard.substr(0, 2))] == null){
            return '身份证地区非法';//身份证地区非法;
        }

        var sBirthday = idCard.substr(6, 4) + "-" + Number(idCard.substr(10, 2)) + "-" + Number(idCard.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"));
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())){
            return '身份证上的出生日期非法';//身份证上的出生日期非法;
        }

        var iSum = 0;
        for (var i = 17; i >= 0; i--){
            iSum += (Math.pow(2, i) % 11) * parseInt(idCard.charAt(17 - i), 11);
        }
        if (iSum % 11 != 1){
            return '身份证号非法';//身份证号非法;
        }

        return undefined;
    }
}