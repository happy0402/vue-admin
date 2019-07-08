<template>
    <el-container>
        <el-header height="auto">
            <p>
                此处配置为常用配置,所有API请参考
                <el-link
                        href="https://iviewui.com/components/modal"
                        target="_blank"
                        type="primary"
                        :underline="false">
                    iview官方网站<i class="el-icon-view el-icon--right"></i>
                </el-link>
                <span style="font-size: 12px; padding-left: 10px;color: #E65D6E;">( 注：由于二次分装，官方上所有Modal events失效,封装后events请参考本页面 基础用法-显示对话框 )</span>
            </p>
        </el-header>
        <el-container>
            <el-aside width="40%">

                <el-divider>基础用法</el-divider>
                <p>
                    <el-button :plain="true" @click="modal1 = true">显示对话框</el-button>
                </p>
                <self-dialog
                        v-model="modal1"
                        title="标题"
                        :ok="ok"
                        :cancel="cancel"
                        :close="close">
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                </self-dialog>

                <el-divider>自定义样式</el-divider>
                <p>
                    <el-button :plain="true" @click="modal2 = true">自定义页头和页脚</el-button>
                    <el-button :plain="true" @click="modal3 = true">不带标题栏</el-button>
                    <el-button :plain="true" @click="modal4 = true">自定义按钮文字</el-button>
                </p>
                <self-dialog v-model="modal2" width="360">
                    <p slot="header" style="color: #E65D6E;text-align:center">
                        <span>Delete confirmation</span>
                    </p>
                    <div style="text-align:center">
                        <p>After this task is deleted, the downstream 10 tasks will not be implemented.</p>
                        <p>Will you delete it?</p>
                    </div>
                    <div slot="footer">
                        <el-button type="danger" style="width: 100%;" @click="modal2 = false">Delete</el-button>
                    </div>
                </self-dialog>
                <self-dialog v-model="modal3">
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                </self-dialog>
                <self-dialog v-model="modal4"
                             title="标题"
                             ok-text="OK"
                             cancel-text="Cancel">
                    <p>Something...</p>
                    <p>Something...</p>
                    <p>Something...</p>
                </self-dialog>

                <el-divider>异步关闭</el-divider>
                <p>
                    <el-button :plain="true" @click="modal5 = true">异步关闭</el-button>
                </p>
                <self-dialog
                        v-model="modal5"
                        title="标题"
                        :loading="true"
                        :ok="asyncOK">
                    <p>After you click ok, the dialog box will close in 2 seconds.</p>
                </self-dialog>

                <el-divider>禁用关闭</el-divider>
                <p>
                    <el-button :plain="true" @click="modal6 = true">禁用右上角关闭（含Esc键）</el-button>
                    <el-button :plain="true" @click="modal7 = true">禁用遮罩层关闭</el-button>
                </p>
                <self-dialog
                        v-model="modal6"
                        title="标题"
                        :closable="false">
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                </self-dialog>
                <self-dialog
                        v-model="modal7"
                        title="标题"
                        :mask-closable="false">
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                </self-dialog>

                <el-divider>全屏显示</el-divider>
                <p>
                    <el-button :plain="true" @click="modal8 = true">显示全屏对话框</el-button>
                </p>
                <self-dialog v-model="modal8" fullscreen title="全屏 对话框">
                    <p>设置属性 fullscreen 可以全屏显示。</p>
                    <p>设置属性 footer-hide 可以隐藏底部内容。</p>
                </self-dialog>

                <el-divider>拖拽移动</el-divider>
                <p>
                    <el-button :plain="true" @click="modal9 = true">对话框1</el-button>
                    <el-button :plain="true" @click="modal10 = true">对话框2</el-button>
                </p>
                <self-dialog v-model="modal9" draggable title="对话框 1">
                    <div>This is the first modal</div>
                </self-dialog>
                <self-dialog v-model="modal10" draggable title="对话框 2">
                    <div>This is the first modal</div>
                </self-dialog>

            </el-aside>
            <el-main>
                <vue-code-mirror :code="code"></vue-code-mirror>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    /* eslint-disable */
    import VueCodeMirror from '@/introduction/components/VueCodeMirror'

    export default {
        components:{
            VueCodeMirror
        },
        data(){
            return {
                code: '',
                modal1: false,
                modal2: false,
                modal3: false,
                modal4: false,
                modal5: false,
                modal6: false,
                modal7: false,
                modal8: false,
                modal9: false,
                modal10: false
            }
        },
        watch:{
            modal1(value){
              if(value){
                  this.code = `<template>
    <el-button @click="modal1 = true">显示对话框</el-button>
    <self-dialog
        v-model="modal1"
        title="标题"
        :ok="ok"
        :cancel="cancel"
        :close="close">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </self-dialog>
</template>

<script>
    export default{
        data(){
            return {
                modal1: false
            }
        },
        methods:{
            ok () {
                //确认按钮, return false 则弹框不关闭
                this.$message.info('Clicked ok');
            },
            cancel () {
                //取消按钮, return false 则弹框不关闭
                this.$message.info('Clicked cancel');
            },
            close(){
                //右上角关闭按钮
                this.$message.info('Clicked close');
            }
        }
    }
<\/script>`;
              }
          },
            modal2(value){
                if(value){
                    this.code = `<self-dialog v-model="modal2" width="360">
    <p slot="header" style="color: #E65D6E;text-align:center">
        <span>Delete confirmation</span>
    </p>
    <div style="text-align:center">
        <p>After this task is deleted, the downstream 10 tasks will not be implemented.</p>
        <p>Will you delete it?</p>
    </div>
    <div slot="footer">
        <el-button type="danger" style="width: 100%;" @click="modal2 = false">Delete</el-button>
    </div>
</self-dialog>`;
                }
            },
            modal3(value){
                if(value){
                    this.code = `<self-dialog v-model="modal3">
    <p>Content of dialog</p>
    <p>Content of dialog</p>
    <p>Content of dialog</p>
</self-dialog>`;
                }
            },
            modal4(value){
                if(value){
                    this.code = `<self-dialog v-model="modal4"
             title="标题"
             ok-text="OK"
             cancel-text="Cancel">
    <p>Something...</p>
    <p>Something...</p>
    <p>Something...</p>
</self-dialog>`;
                }
            },
            modal5(value){
                if(value){
                    this.code = `<template>
    <el-button @click="modal5 = true">异步关闭</el-button>
    <self-dialog
            v-model="modal5"
            title="标题"
            :loading="true"
            :ok="asyncOK">
        <p>After you click ok, the dialog box will close in 2 seconds.</p>
    </self-dialog>
</template>

<script>
    export default{
        data(){
            return {
                modal5: false
            }
        },
        methods:{
            asyncOK(){
                setTimeout(() => {
                    this.modal5 = false;
                }, 2000);
            }
        }
    }
<\/script>`;
                }
            },
            modal6(value){
                if(value){
                    this.code = `<template>
    <el-button @click="modal5 = true">异步关闭</el-button>
    <self-dialog
            v-model="modal6"
            title="标题"
            :closable="false">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </self-dialog>
</template>`;
                }
            },
            modal7(value){
                if(value){
                    this.code = `<template>
    <el-button @click="modal5 = true">异步关闭</el-button>
    <self-dialog
            v-model="modal7"
            title="标题"
            :mask-closable="false">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </self-dialog>
</template>`;
                }
            },
            modal8(value){
                if(value){
                    this.code = `<template>
    <el-button @click="modal8 = true">异步关闭</el-button>
    <self-dialog v-model="modal8" fullscreen title="全屏 对话框">
        <p>设置属性 fullscreen 可以全屏显示。</p>
        <p>设置属性 footer-hide 可以隐藏底部内容。</p>
    </self-dialog>
</template>`;
                }
            },
            modal9(value){
                if(value){
                    this.code = `<template>
    <el-button :plain="true" @click="modal9 = true">对话框1</el-button>
    <self-dialog v-model="modal9" draggable title="对话框 1">
        <div>This is the first modal</div>
    </self-dialog>
</template>`;
                }
            },
            modal10(value){
                if(value){
                    this.code = `<template>
    <el-button :plain="true" @click="modal9 = true">对话框1</el-button>
    <self-dialog v-model="modal9" draggable title="对话框 1">
        <div>This is the first modal</div>
    </self-dialog>
</template>`;
                }
            }
        },
        methods:{
            ok () {
                this.$message.info('Clicked ok');
            },
            cancel () {
                this.$message.info('Clicked cancel');
            },
            close(){
                this.$message.info('Clicked close');
            },
            asyncOK(){
                setTimeout(() => {
                    this.modal5 = false;
                }, 2000);
            }
        }
    }
</script>