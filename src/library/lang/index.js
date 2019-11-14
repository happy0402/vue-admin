/**
 * Created by Administrator on 2019/4/28.
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import iviewEnLocale from 'view-design/dist/locale/en-US';
import iviewZhLocale from 'view-design/dist/locale/zh-CN';
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n);

const systemLangTypes = ['en', 'zh']

var messages = {
    en: {
        ...enLocale,
        ...elementEnLocale,
        ...iviewEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale,
        ...iviewZhLocale
    }
}

function getLanguage() {
    const chooseLanguage = Cookies.get('language')
    if (chooseLanguage) return chooseLanguage

    // if has not choose language
    const language = (navigator.language || navigator.browserLanguage).toLowerCase()
    const locales = Object.keys(messages)
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            Cookies.set('language', locale);
            return locale
        }
    }
    Cookies.set('language', 'en');
    return 'en'
}

const i18n = new VueI18n({
    // set locale
    // options: en | zh | es
    locale: getLanguage(),
    // set locale messages
    messages,
})

export function resetLang(appCode){
    systemLangTypes.forEach(function(item){
        let { default: lang } = require('@/' + appCode + '/lang/' + item)
        messages[item] = {
            ...messages[item],
            ...lang
        }
    })
}

export default i18n