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
        userName: 'frame',
        roles: ['frame'],
        power: 9
    },
    'business-token': {
        userName: 'business',
        roles: ['business'],
        power: 9
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
            const token = tokens[userName];

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