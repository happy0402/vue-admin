<template>
    <el-container>
        <el-header height="auto">
            <p>使用时在CSS中引入文件：<span class="importantLetter">@import "~@/styles/variables.scss";</span></p>
        </el-header>
        <el-main>
            <el-divider>主色</el-divider>
            <el-row :gutter="6">
                <el-col :span="8">
                    <div class="demo-color-box" style="background-color: #3A71A8;">
                        $light-blue
                        <p>#3A71A8</p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="demo-color-box" style="background-color: #304156;">
                        $blue
                        <p>#304156</p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="demo-color-box" style="background-color: #4AB7BD;">
                        $tiffany
                        <p>#4AB7BD</p>
                    </div>
                </el-col>
            </el-row>

            <el-divider>辅色</el-divider>
            <el-row :gutter="6">
                <el-col :span="6">
                    <div class="demo-color-box" style="background-color: #30B08F;">
                        $green
                        <p>#30B08F</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="demo-color-box" style="background-color: #C03639;">
                        $red
                        <p>#C03639</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="demo-color-box" style="background-color: #E65D6E;">
                        $pink
                        <p>#E65D6E</p>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="demo-color-box" style="background-color: #FEC171;">
                        $yellow
                        <p>#FEC171</p>
                    </div>
                </el-col>
            </el-row>

            <el-divider>中性色</el-divider>
            <el-row :gutter="6">
                <el-col :span="8">
                    <div class="demo-color-box" style="background-color: #FFF;border: 1px solid #DCDFE6;color: #000;">
                        $white
                        <p>#FFF</p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="demo-color-box" style="background-color: #000;">
                        $black
                        <p>#000</p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="demo-color-box" style="background-color: #DCDFE6;color: #000;">
                        $firstBorder
                        <p>1px solid #DCDFE6</p>
                    </div>
                </el-col>
            </el-row>

        </el-main>
    </el-container>
</template>

<script>
    export default{
        name: 'Color'
    }
</script>

<style lang="scss" scoped="">
    @import "~@/styles/variables.scss";

    .el-main{
        padding: 0 10px;
    }

    .importantLetter{
        color: $light-blue;
    }

    .demo-color-box{
        position: relative;
        border-radius: 4px;
        padding: 20px;
        margin: 5px 0;
        box-sizing: border-box;
        color: #fff;
        font-size: 14px;

        p{
            margin-bottom: 0;
        }
    }
</style>