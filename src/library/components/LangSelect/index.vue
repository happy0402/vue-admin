<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div style="cursor: pointer;">
      <i class="el-icon-more-outline"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(lang, index) in langOptions" :key="index" :disabled="language === lang" :command="lang">
        {{ languages[lang] || lang }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
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
            this.$i18n.locale = lang
            this.$store.dispatch('app/setLanguage', lang)
            this.$message({
                message: 'Switch Language Success',
                type: 'success'
            })
        }
    }
}
</script>
