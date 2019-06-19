<template>
    <div>
        <p>
            <el-link
            href="https://github.com/PanJiaChen/vue-split-pane"
            target="_blank"
            type="primary"
            :underline="false">
            Github官方网址<i class="el-icon-view el-icon--right"></i>
            </el-link>
        </p>
        <div>
            <!--<el-row>-->
                <!--<el-col>-->
                    <!--<h4>-->
                        <!--Show-->
                    <!--</h4>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row>-->
                <!--<el-col>-->
                    <!--<div style="height: 200px;">-->
                        <!--<split-pane :min-percent='20' :default-percent='30' split="vertical">-->
                            <!--<template slot="paneL">-->
                                <!--<div style="background-color: #f38181; height: 100%;"></div>-->
                            <!--</template>-->
                            <!--<template slot="paneR">-->
                                <!--<split-pane split="horizontal">-->
                                    <!--<template slot="paneL">-->
                                        <!--<div style="background-color: #fce38a; height: 100%;"></div>-->
                                    <!--</template>-->
                                    <!--<template slot="paneR">-->
                                        <!--<div style="background-color: #95e1d3; height: 100%;"></div>-->
                                    <!--</template>-->
                                <!--</split-pane>-->
                            <!--</template>-->
                        <!--</split-pane>-->
                    <!--</div>-->
                <!--</el-col>-->
            <!--</el-row>-->

            <el-row>
                <el-col>
                    <h4>
                        How to use?
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror :code="howToUse"></vue-code-mirror>
                </el-col>
            </el-row>

            <el-row>
                <el-col>
                    <h4>
                        Example
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <vue-code-mirror :code="example"></vue-code-mirror>
                </el-col>
            </el-row>

            <el-row>
                <el-col>
                    <h4>
                        Options
                    </h4>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-table
                            :data="tableData"
                            border
                            stripe
                            highlight-current-row>

                        <el-table-column
                                prop="property"
                                label="Property">
                        </el-table-column>
                        <el-table-column
                                prop="description"
                                label="Description">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="Type">
                        </el-table-column>
                        <el-table-column
                                prop="default"
                                label="Default">
                        </el-table-column>

                    </el-table>
                </el-col>
            </el-row>

        </div>

    </div>
</template>

<script>
//    import SplitPane from 'vue-splitpane'
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default{
        name: 'SplitPane',
        components:{
//            SplitPane,
            VueCodeMirror
        },
        data(){
            return {
                howToUse: `//import
import splitPane from 'vue-splitpane'

components:{
    SplitPane
}`,
                example: `<split-pane v-on:resize="resize" :min-percent='20' :default-percent='30' split="vertical">
  <template slot="paneL">
    A
  </template>
  <template slot="paneR">
    B
  </template>
</split-pane>

//nested
<split-pane v-on:resize="resize" :min-percent='20' :default-percent='30' split="vertical">
  <template slot="paneL">
    A
  </template>
  <template slot="paneR">
    <split-pane split="horizontal">
      <template slot="paneL">
       B
      </template>
      <template slot="paneR">
        C
      </template>
    </split-pane>
  </template>
</split-pane>`,
                tableData: [
                    {
                        property: 'split',
                        description: 'the split type',
                        type: 'String [horizontal | vertical]',
                        default: 'must choose one type'
                    },
                    {
                        property: 'min-percent',
                        description: 'paneL max-min-percent',
                        type: 'Number',
                        default: '10'
                    },
                    {
                        property: 'max-percent',
                        description: 'paneL max-percent',
                        type: 'Number',
                        default: ''
                    },
                    {
                        property: 'default-percent',
                        description: 'paneL default-percent',
                        type: 'Number',
                        default: ''
                    }
                ]
            }
        }
    }
</script>