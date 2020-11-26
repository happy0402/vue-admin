<template>
    <div style="display: inline-block;">
        <i-badge :dot="hasBugs" :offset="[10,1]">
            <el-dropdown>
                <el-button
                        type="primary"
                        icon="ivu-icon ivu-icon-ios-bug"
                        style="padding: 3px 4px;"
                ></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="bug1">bug1</el-dropdown-item>
                    <el-dropdown-item command="bug2">bug2</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </i-badge>

        <el-divider direction="vertical"></el-divider>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                hasBugs: true
            }
        }
    }
</script>