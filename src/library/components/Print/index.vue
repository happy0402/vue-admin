<template>
    <div ref="printWrap" class="print-wrap" v-show="visible">
        <div :class="pageSize">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'Print',
        props:{
            value: {
                type: Boolean,
                default: false
            },
            pageSize: {
                type: String,
                default: 'A4'
            }
        },
        data(){
            return {
                visible: this.value
            }
        },
        watch:{
          visible(value){
              document.querySelector('#app').style.display = value ? 'none' : 'block';
          }
        },
        methods:{
            print(){
                this.visible = true;
                this.$nextTick(() => {
                    if(document.execCommand('print')) this.visible = false;
                });
            },
            toBase64(){
                //html 转 base64,待开发
            }
        },
        mounted(){
            let body = document.querySelector('body');
            body.insertBefore(this.$refs.printWrap, body.firstChild);

            //app隐藏判断
            document.querySelector('#app').style.display = this.visible ? 'none' : 'block';
        }
    }
</script>

<style scoped="">
    .print-wrap{
        color: #000;
    }

    .A4{
        width: 189mm;
        margin: 0 auto;
    }
</style>