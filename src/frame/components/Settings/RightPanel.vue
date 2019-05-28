<template>
    <div ref="rightPanel" :class="{'show-rightPanel':show}" class="rightPanel-container">
        <div class="rightPanel-background" @click="!clickNotClose ? show = !show : ''"></div>
        <div class="rightPanel">
            <div
                    v-drag
                    @drag="drag"
                    class="toggle-button"
                    :style="'top:' + buttonTop + 'px;'"
                    @click="toggle">
                <i :class="show ? 'el-icon-close':'el-icon-setting'"></i>
            </div>
            <div class="rightPanelContent">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import drag from '@/directive/drag'

    export default {
        name: 'RightPanel',
        directives:{
          drag
        },
        data(){
          return {
              show: false,
              buttonTop: 250,
              dragging: false
          }
        },
        props:{
            clickNotClose: {
                default: false,
                type: Boolean
            }
        },
        watch:{
          show(value){
              let body = document.querySelector('body')
              if(value){
                  body.classList.add('showRightPanel')
              }else{
                  body.classList.remove('showRightPanel')
              }
          }
        },
        methods:{
          drag(param){
              this.dragging = true
              let positionY = this.buttonTop + param.offsetY
              this.buttonTop = positionY > 0 && positionY < (document.body.clientHeight - 35) ? positionY : this.buttonTop
          },
          toggle(){
              if(!this.dragging) this.show = !this.show
              this.dragging = false
          }
        },
        mounted(){
            let body = document.querySelector('body')
            body.insertBefore(this.$refs.rightPanel, body.firstChild)
        }
    }
</script>

<style lang="scss" scoped="">
    @import '~@/styles/variables.scss';

    .showRightPanel{
        overflow: hidden;
    }

    .rightPanel-container{
        .rightPanel-background{
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            -webkit-transition: opacity .3s cubic-bezier(.7,.3,.1,1);
            transition: opacity .3s cubic-bezier(.7,.3,.1,1);
            opacity: 0;
            background-color: rgba(0,0,0,0.2);
            z-index: 1;
        }

        .rightPanel{
            position: fixed;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 2500;
            -webkit-transition: all .25s cubic-bezier(.7,.3,.1,1);
            transition: all .25s cubic-bezier(.7,.3,.1,1);
            -webkit-transform: translate(100%);
            transform: translate(100%);
            background-color: $white;
            padding: 0 20px;

            .toggle-button{
                position: absolute;
                left: -35px;
                display: inline-block;
                width: 35px;
                height: 35px;
                padding: 8px 0 0 9px;
                background-color: $light-blue;
                color: $white;
                border-radius: 5px 0 0 5px;
                font-size: 18px;
                cursor: pointer;
            }
        }
    }

    .show-rightPanel{
        -webkit-transition: all .3s cubic-bezier(.7,.3,.1,1);
        transition: all .3s cubic-bezier(.7,.3,.1,1);

        .rightPanel-background{
            width: 100%;
            height: 100%;
            opacity: 1;
            z-index: 2000;
        }

        .rightPanel{
            transform: translate(0);
        }
    }
</style>