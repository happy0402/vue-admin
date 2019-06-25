/**
 * 主键嵌套表数据解析
 * @param options.data          Object  数据源
 * @param options.key           Array   主键
 * @param options.label         Array   名称
 * @author zkx
 * @version 1.0
 */
export default function(options) {
    var data = options.data,
        key = options.key,//节点key 的 key值
        label = options.label,//节点label 的 key 值
        parentKeyLen = -1,
        childKeyLen = -1,
        currentKeyLen = 0,
        level = -1,
        result = [];

    var dataMap = {}
    for(var i = 0; i < data.length; i++){
        var nodeData = data[i];
        dataMap[nodeData[key]] = {
            'data': nodeData,
            'nodeKey': nodeData[key],
            'label': nodeData[label]
        };
    }

    for(let keyVal in dataMap){
        currentKeyLen = keyVal.length;

        if(currentKeyLen !== childKeyLen){
            parentKeyLen = childKeyLen;
            childKeyLen = currentKeyLen;
            level++;
        }

        if(parentKeyLen !== -1){
            let parentKeyVal = keyVal.substr(0, parentKeyLen);

            if(dataMap[parentKeyVal] !== undefined){
                if(dataMap[parentKeyVal].children == undefined){
                    dataMap[parentKeyVal].children = [];
                }

                dataMap[keyVal].parentNodeKey = parentKeyVal;
                dataMap[keyVal].level = level;
                dataMap[parentKeyVal].children.push(dataMap[keyVal]);
            }else{
                // eslint-disable-next-line
                console.error('此表存在脏数据,节点主键为:' + keyVal + ',请检查数据源!');
            }
        }else{
            dataMap[keyVal].level = level;
            result.push(dataMap[keyVal]);
        }
    }
    return result;
}