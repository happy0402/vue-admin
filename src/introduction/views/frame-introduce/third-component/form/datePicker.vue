<!-- 布局 -->
<template>
    <show-config-code :code="codeCreate">
        <p>此处配置为常用配置,所有配置请查看
            <el-link
                    href="https://iviewui.com/components/date-picker"
                    target="_blank"
                    type="primary"
                    :underline="false">
                iview官方网站<i class="el-icon-view el-icon--right"></i>
            </el-link>
        </p>

        <template v-slot:show>
            <DatePicker type="date" placeholder="选择日期"></DatePicker>
        </template>

        <template v-slot:config>
            <el-form
                    label-position="left"
                    :model="paramForm"
                    label-width="80px">

            </el-form>
        </template>
    </show-config-code>
</template>

<script>
    import ShowConfigCode from '../ShowConfigCode.vue'

    export default {
        components:{
            ShowConfigCode
        },
        data(){
            return {
                typeArray: [],
                paramForm:{
                    type: ''
                }
            }
        },
        computed: {
            codeCreate(){
                return `<DatePicker type="date" placeholder="选择日期"></DatePicker>`
            }
        }
    }
</script>