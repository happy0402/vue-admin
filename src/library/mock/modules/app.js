/**
 * Created by Administrator on 2019/5/13.
 */
//注：appCode需和项目文件夹名一致
export const apps ={
    'introduction': {
        appCode: 'introduction',
        appName: '开发助手'
    },
    'old-project': {
        appCode: 'old-project',
        appName: '系统开发'
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
    }
];