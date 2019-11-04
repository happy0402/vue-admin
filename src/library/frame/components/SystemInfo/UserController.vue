<template>
    <i-dropdown slot="extra" @on-click="handleCommand" trigger="click" transfer>
        <el-link :underline="false">{{ $t('header.hello') + userName }}<i class="el-icon-arrow-down el-icon--right"></i></el-link>
        <i-dropdown-menu slot="list">
            <i-dropdown-item name="changePassword">{{ $t('header.changePassword') }}</i-dropdown-item>
            <i-dropdown-item name="logout">{{ $t('header.logout') }}</i-dropdown-item>
        </i-dropdown-menu>
    </i-dropdown>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'UserController',
        computed: {
            ...mapGetters([
                'userName'
            ])
        },
        methods: {
            handleCommand(command) {
                switch(command){
                    case 'changePassword':
                        this.changePassword();
                        break;
                    case 'logout':
                        this.$store.dispatch('user/resetUserInfo');
                        this.$router.push({ path: '/login' });
                        this.$store.dispatch('tagsView/clearViews');

                        break;
                    default:
                        break;
                }
            },
            changePassword(){

            }
        }
    }
</script>

<style lang="scss" scoped="">
    @import "~#/styles/variables.scss";

    .el-dropdown{
        cursor: pointer;

        &:hover{
            color: $light-blue;
        }
    }
</style>