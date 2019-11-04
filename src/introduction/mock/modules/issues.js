/**
 * Created by tx on 2019/7/26.
 */
import Mock from 'mockjs'

const issues = [];
for (let i = 0; i < 100; i++) {
    issues.push(Mock.mock({
        'id': '@increment',
        'title': '@ctitle',
        'project|1': ['introduction','old-project'],
        'assign': '@cname',
        'state|1': ['open','close'],
        'author': '@cname',
        'createdTime':'@datetime'
    }))
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
                    'author': '@cname',
                    'createdTime':'@datetime'
                }]
            });

            return {
                code: 20000,
                data: content.content
            }
        }
    }
];