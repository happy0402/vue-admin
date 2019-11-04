/**
 * Created by zkx on 2019/7/5.
 */
const MapHelper = (function () {
    function MapHelper(list, key, val){
        this.data = undefined;
        this.size = 0;

        //检索参数个数
        var data = [];
        if(arguments[2] !== undefined && list.constructor == Array){
            //key-value
            for(let i = 0; i < list.length; i++ ){
                data.push([list[i][key],list[i][val]]);
            }

            this.data = new Map(data);
        }else if(arguments[1] !== undefined && list.constructor == Array){
            //key-object
            for(let i = 0; i < list.length; i++ ){
                data.push([list[i][key],list[i]]);
            }

            this.data = new Map(data);
        }else if(arguments[0] !== undefined && list.constructor == Map){
            this.data = list;
        }else{
            //若参数个数与参数类型不符合要求，则新建对象
            this.data = new Map();
        }

        this.size = this.data.size;
        return this;
    }

    MapHelper.prototype = {
        constructor:MapHelper,
        set:function(key,val){
            this.data.set(key,val);
            this.size = this.data.size;
            return this;
        },
        get:function(key){
            return this.data.get(key);
        },
        find:function(val){
            var result = [];

            for (let [key, value] of this.data.entries()) {
                if(value == val){
                    result.push(key);
                }
            }

            return result;
        },
        has:function(key){
            return this.data.has(key);
        },
        delete:function(key){
            this.data.delete(key);
            this.size = this.data.size;
            return this;
        },
        clear:function(){
            this.data.clear();
            this.size = this.data.size;
            return this;
        },
        keys:function(){
            return this.data.keys();
        },
        values:function(){
            return this.data.values();
        },
        entries:function(){
            return this.data.entries();
        },
        forEach:function(){
            return this.data.forEach();
        },
        toList:function(){
            var result = [];

            for (let [key, value] of this.data.entries()) {
                result.push(value);
            }

            return result;
        }
    }
    return MapHelper;
})();

export default {
    toMap: (list, key, val) => {
        return new MapHelper(list, key, val);
    }
}