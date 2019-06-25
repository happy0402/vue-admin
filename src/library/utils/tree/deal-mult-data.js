/**
 * 多级表数据解析
 * @param options.data          Object  数据源
 * @param options.tableNames    Array   表名
 * @param options.key           Array   主键
 * @param options.parentKey     Array   父节点主键
 * @param options.label         Array   名称
 * @author zkx
 * @version 1.0
 */
export default function(options){
    //检验参数配置
    if(typeof options.data !== 'object'){
        throw new Error("参数配置错误，data 非 object 类型，无法解析，请检查配置！");
    }

    var tableNames = options.tableNames,
        tableslength = tableNames.length;

    if(options.key.length !== tableslength || options.parentKey.length !== tableslength || options.label.length !== tableslength){
        throw new Error("参数配置错误，表的长度与 key、parentKey、label 的长度不符，无法解析，请检查配置！");
    }

    var data = options.data,
        childMap = undefined;

    //添加子节点 倒置遍历数据源 将子节点绑定在父节点上
    for(let i = tableslength - 1; i > 0; i--){
        var key = options.key[i],//节点key 的 key值
            parentKey = options.parentKey[i],//父节点key 的 key值
            singleTable = data[tableNames[i]];//此层的数据对象

        //建立父节点MAP
        var parentTalbe = data[tableNames[i-1]],
            parentMap = {};
        for(let k = 0; k < parentTalbe.length; k++){
            var parentRow = parentTalbe[k];
            parentMap[parentRow[options.key[i-1]]] = {
                'data': parentRow,
                'nodeKey': (i-1).toString() + '-' + parentRow[options.key[i-1]],
                'label': parentRow[options.label[i-1]],
                'level': i-1,
                'parentNodeKey': parentRow[options.parentKey[i-1]]
            }
        }

        //将子节点绑定在父节点上
        for(var j = 0; j < singleTable.length; j++){
            var val = singleTable[j],
                keyVal = val[key],
                parentKeyVal = val[parentKey] || 0;

            //存在此父节点
            if(parentMap[parentKeyVal] !== undefined){
                //判断是否存在子节点，建立数组
                if(parentMap[parentKeyVal].children == undefined){
                    parentMap[parentKeyVal].children = [];
                }

                //最末级节点没有childMap
                if(childMap){
                    parentMap[parentKeyVal].children.push(childMap[keyVal]);
                }else{
                    //最末级节点
                    parentMap[parentKeyVal].children.push({
                        'data': val,
                        'nodeKey': (i).toString() + '-' + keyVal,
                        'label': val[options.label[i]],
                        'level': i,
                        'parentNodeKey': parentKeyVal
                    });
                }
            }
        }
        childMap = parentMap;
    }

    return Object.values(parentMap);
}