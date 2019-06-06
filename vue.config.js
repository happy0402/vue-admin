'use strict'
const path = require('path')
const defaultSettings = require('./src/library/settings.js')

const name = defaultSettings.title || 'vue Element Admin' // page title
module.exports = {
    // mode: 'production',
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? '/'
    //     : './',
    publicPath: './',
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '#': path.resolve(__dirname, 'src/library'),
                '@': path.resolve(__dirname, 'src'),
                //代码配置展示时使用
                //https://cn.vuejs.org/v2/guide/installation.html#对不同构建版本的解释
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    }
}