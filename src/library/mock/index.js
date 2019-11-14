/**
 * Created by zkx on 2019/7/29.
 */
import Mock from 'mockjs'
import { URLUtil } from '#/utils/string'

const modulesFiles = require.context('./modules', false, /\.js$/)

const mocks = modulesFiles.keys().reduce((mocks, modulePath) => {
    // ./app.js -> export (Object)
    const value = modulesFiles(modulePath);
    // export default
    mocks = mocks.concat(value.default);
    // { app: {(default)}}
    return mocks;
}, []);

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).

// mock patch
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
        this.custom.xhr.withCredentials = this.withCredentials || false

        if (this.responseType) {
            this.custom.xhr.responseType = this.responseType
        }
    }
    this.proxy_send(...arguments)
}

export function createMocks(mocks){
    function XHR2ExpressReqWrap(respond) {
        return function(options) {
            let result = null;

            if (respond instanceof Function) {
                const { body, type, url } = options;
                // https://expressjs.com/en/4x/api.html#req
                result = respond({
                    url: url,
                    type: type,
                    body: typeof body == 'string' ? JSON.parse(body) : body,
                    query: URLUtil.getUrlParam(url)
                });
            } else {
                result = respond;
            }
            return Mock.mock(result);
        }
    }

    for (const mock of mocks) {
        Mock.mock(new RegExp(`/mock/${mock.url}`), mock.type || 'get', XHR2ExpressReqWrap(mock.response))
    }
}

createMocks(mocks);