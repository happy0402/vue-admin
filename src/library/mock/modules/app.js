/**
 * Created by Administrator on 2019/5/13.
 */
//注：appCode需和项目文件夹名一致
//数据源直接在mock/modules/user.js中使用
export const apps ={
    'introduction': {
        appCode: 'introduction',
        appName: '开发助手',
        description: '此框架的开发帮助文档'
    },
    'old-project': {
        appCode: 'old-project',
        appName: '系统开发',
        description: '一个老系统的开发帮助文档'
    }
};

export default [
    {
        url: 'app/list',
        type: 'get',
        response: () => {
            return {
                code: 20000,
                data: Object.values(apps)
            }
        }
    },
    {
        url: 'app/info',
        type: 'get',
        response: config => {
            return {
                code: 20000,
                data: apps[config.query.appCode]
            }
        }
    }
];