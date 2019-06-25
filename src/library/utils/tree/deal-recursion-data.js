/**
 * 递归表数据解析
 * @param options.data          Object  数据源
 * @param options.key           Array   主键
 * @param options.parentKey     Array   父节点主键
 * @param options.label         Array   名称
 * @author zkx
 * @version 1.0
 */
export default function(options){
    var data = options.data,
        key = options.key,//节点id 的 key值
        parentKey = options.parentKey,//父节点id 的 key值
        label = options.label,//节点name 的 key 值
        length = data.length;//此层的数据个数

    var dataMap = {};
    for(let i = 0; i < length; i++){
        let nodeData = data[i];
        dataMap[nodeData[key]] = {
            'data': nodeData,
            'nodeKey': nodeData[key],
            'label': nodeData[label],
            'parentNodeKey': nodeData[parentKey]
        };
    }

    var result = [];
    for(let i = 0; i < length; i++){
        let parentKeyVal = data[i][parentKey]||'0';
        if(dataMap[parentKeyVal] !== undefined){
            if(dataMap[parentKeyVal].children == undefined){
                dataMap[parentKeyVal].children = [];
            }
            dataMap[parentKeyVal].children.push(dataMap[data[i][key]]);
        }else{
            result.push(dataMap[data[i][key]])
        }
    }

    return result;
}