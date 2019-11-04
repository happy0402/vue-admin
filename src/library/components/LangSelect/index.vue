<template>
  <i-dropdown slot="extra" class="international" @on-click="handleSetLanguage" trigger="click" transfer>
    <el-link type="primary" :underline="false"><i class="sf-icon-language"></i></el-link>
    <i-dropdown-menu slot="list">
      <i-dropdown-item v-for="(lang, index) in langOptions" :key="index" :disabled="language === lang" :name="lang">
        {{ languages[lang] || lang }}
      </i-dropdown-item>
    </i-dropdown-menu>
  </i-dropdown>
</template>

<script>
export default {
    name: 'LangSelect',
    data(){
        return {
            languages: {
                en: 'English',
                zh: '简体中文'
            }
        }
    },
    computed: {
        language() {
            return this.$store.getters.language
        },
        langOptions(){
            return this.$i18n.availableLocales
        }
    },
    methods: {
        handleSetLanguage(lang) {
            this.$i18n.locale = lang;
            this.$store.dispatch('app/setLanguage', lang);
            this.$message.success('Switch Language Success');
        }
    }
}
</script>
