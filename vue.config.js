'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

const name = defaultSettings.title || 'vue Element Admin' // page title
module.exports = {
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
                '@': path.resolve(__dirname, 'src')
            }
        }
    }
}