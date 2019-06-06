<template>
    <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
            {{ $t('header.hello') + userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changePassword">{{ $t('header.changePassword') }}</el-dropdown-item>
            <el-dropdown-item command="logout">{{ $t('header.logout') }}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
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
                        this.$store.dispatch('user/resetUserInfo')
                        this.$router.push({ path: '/login' })
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