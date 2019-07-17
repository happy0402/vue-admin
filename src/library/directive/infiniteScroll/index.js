/**
 * Created by zkx on 2019/7/9.
 */
export default {
    bind(el, binding, vnode){
        var selectWrap = el;

        //指令配置项处理
        var configDistance = 50;
        if(binding.value){
            if(typeof binding.value === 'string'){
                selectWrap = el.querySelector(binding.value);
            }else{
                configDistance = binding.value.scrollDistance || configDistance;
                selectWrap = el.querySelector(binding.value.target);
            }
        }

        //防止重复触发标志
        var bottomFlag = false;
        selectWrap.addEventListener('scroll', function() {
            //触顶
            if(this.scrollTop == 0){
                vnode.data.on.reachEdge('top');
            }

            const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight;
            //触底
            if (!bottomFlag && scrollDistance <= configDistance) {
                vnode.data.on.reachEdge('bottom');
                bottomFlag = true;
            }

            //防止重复触发
            if(scrollDistance > configDistance){
                bottomFlag = false;
            }
        })
    }
}