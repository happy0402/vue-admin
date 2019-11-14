/**
 * Created by Administrator on 2019/5/13.
 */
import Cookies from 'js-cookie';

const tokens = {
    frame: {
        token: 'frame-token'
    },
    business: {
        token: 'business-token'
    }
}

const users = {
    'frame-token': {
        userId: 1,
        userName: 'frame',
        roles: ['frame']
    },
    'business-token': {
        userId: 2,
        userName: 'business',
        roles: ['developer']
    }
};

import { apps } from './app.js'

export default [
    // user login
    {
        url: 'user/login',
        type: 'post',
        response: config => {
            const { userName, appCode } = config.body;
            const token = tokens[userName.trim()];

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: '用户名密码不正确'
                }
            }

            Cookies.set(token.token, appCode);

            return {
                code: 20000,
                data: token
            }
        }
    },

    // get info
    {
        url: 'user/info',
        type: 'get',
        response: config => {
            const { token } = config.query;
            const app = apps[Cookies.get(token)];
            const user = users[token];

            // mock error
            if (!user || !app) {
                return {
                    code: 50008,
                    message: '无法获取用户信息'
                }
            }

            return {
                code: 20000,
                data: {
                    user: user,
                    app: app
                }
            }
        }
    }
];