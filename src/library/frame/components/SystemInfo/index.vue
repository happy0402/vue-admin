<template>
    <div class="title-container">
        <div class="left-title">
            <breadcrumb></breadcrumb>
        </div>
        <div class="right-title">
            <lang-select></lang-select>
            <user-controller></user-controller>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from './Breadcrumb.vue'
    import LangSelect from '#/components/LangSelect'
    import UserController from './UserController.vue'

    export default {
        name: 'SystemInfo',
        components: {
            Breadcrumb,
            LangSelect,
            UserController
        }
    }
</script>

<style lang="scss" scoped="">
    @import "~#/styles/variables.scss";

    .title-container{
        height: 40px;
        line-height: 38px;
        padding: 2px 15px 0;
        /*border-bottom: 1px solid #eee;*/
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);;

        .left-title{
            display: inline-block;
        }

        .right-title{
            float: right;

            .international{
                margin-right: 15px;

                &:hover{
                    color: $light-blue;
                }
            }
        }
    }

</style>