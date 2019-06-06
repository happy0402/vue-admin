import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// directory | includesSubdirs | filter -> .keys() -> [fileDirectory, ...]
const modulesFiles = require.context('./modules', false, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
// reduce(function(total, crrentValue[, currentIndex, originalArray]), initialValue)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    // ./app.js -> export (Object)
    const value = modulesFiles(modulePath)
    // export default
    modules[moduleName] = value.default
    // { app: {(default)}}
    return modules
}, {});

const store = new Vuex.Store({
    modules,
    getters
})

export function resetStore(appCode){
    let { default: module } = require('@/' + appCode + '/store')
    store.registerModule(appCode, module)
}

export default store