/**
 * Created by tx on 2019/7/26.
 */
import Mock from 'mockjs'

const issues = [];
for (let i = 0; i < 50; i++) {
    issues.push(Mock.mock({
        'id': '@increment',
        'title': '@ctitle',
        'project|1': ['introduction','old-project'],
        'assign': '@cname',
        'state|1': ['open', 'close'],
        'grade|1': [1, 2, 3, 4],
        'type|1': ['bug', 'design', 'optimize', 'capability', 'config', 'standard', 'others'],
        'result|1': ['fixed', 'repeat', 'notBug', 'noReproduce', 'noSolve', 'byDesign', 'delay'],
        'ownerId': 'Random.natural()',
        'owner': '@cname',
        'createTime':'@datetime',
        'assigneesId': 'Random.natural()',
        'assignees': '@cname',
        'modifierId': 'Random.natural()',
        'modifier': '@cname',
        'modifyTime':'@datetime',
    }));
}

export default [
    {
        url: 'issues/list',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: issues
            }
        }
    },
    {
        url: 'issues/detail',
        type: 'get',
        response: config => {
            for(let i = 0; i < issues.length; i++){
                if(issues[i].id == config.query.id){
                    return {
                        code: 20000,
                        data: issues[i]
                    }
                }
            }

            return {
                code: 20000,
                data: {}
            };
        }
    },
    {
        url: 'issues/content',
        type: 'get',
        response: () => {
            var content = Mock.mock({
                'content|5-15' : [{
                    'id|+1': 0,
                    'content': '@cparagraph',
                    'modifier': '@cname',
                    'modifyTime':'@datetime'
                }]
            });

            return {
                code: 20000,
                data: content.content
            }
        }
    }
];