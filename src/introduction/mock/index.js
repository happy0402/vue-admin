/**
 * Created by zkx on 2019/7/30.
 */
const modulesFiles = require.context('./modules', false, /\.js$/)

export default modulesFiles.keys().reduce((mocks, modulePath) => {
    // ./app.js -> export (Object)
    const value = modulesFiles(modulePath);
    // export default
    mocks = mocks.concat(value.default);
    // { app: {(default)}}
    return mocks;
}, []);