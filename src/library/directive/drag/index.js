/**
 * Created by zkx on 2019/5/26.
 */
export default {
    bind(el, binding, vnode){
        var selectWrap = el;

        //指令配置项处理
        if(binding.value){
            if(typeof binding.value === 'string'){
                selectWrap = el.querySelector(binding.value);
            }else{
                selectWrap = el.querySelector(binding.value.target);
            }
        }

        //鼠标移动
        var oldPosition = {}
        function move(e){
            if(typeof vnode.data.on.drag === 'function'){
                vnode.data.on.drag({
                    offsetX: e.x - oldPosition.x,
                    offsetY: e.y - oldPosition.y,
                    x: e.x,
                    y: e.y,
                    event: e
                }, arguments)
            }

            oldPosition.x = e.x
            oldPosition.y = e.y
        }

        //鼠标放开
        function up(e){
            if(typeof vnode.data.on.dragStop === 'function'){
                vnode.data.on.dragStop({
                    offsetX: e.x - startPosition.x,
                    offsetY: e.y - startPosition.y,
                    x: e.x,
                    y: e.y,
                    event: e
                })
            }

            document.body.removeEventListener('mousemove', move)
            document.body.removeEventListener('mouseup', up)
        }

        //功能入口
        var startPosition = {}
        selectWrap.onmousedown = (e) => {
            startPosition.x = e.x
            startPosition.y = e.y

            oldPosition = startPosition

            if(typeof vnode.data.on.dragStart === 'function'){
                vnode.data.on.dragStart({
                    x: e.x,
                    y: e.y,
                    event: e
                })
            }

            document.body.addEventListener('mousemove', move)
            document.body.addEventListener('mouseup', up)
        }
    }
}