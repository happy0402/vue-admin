'use strict'
const path = require('path')
const defaultSettings = require('./src/library/settings.js')

const name = defaultSettings.title || 'vue Element Admin' // page title
module.exports = {
    // publicPath: process.env.NODE_ENV === 'production'
    //     ? '/'
    //     : './',
    publicPath: './',
    //代码配置展示时使用
    //https://cli.vuejs.org/zh/config/#lintonsave
    //https://cn.vuejs.org/v2/guide/installation.html#对不同构建版本的解释
    runtimeCompiler: true,
    configureWebpack: {
        // mode: 'production',//development | production
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '#': path.resolve(__dirname, 'src/library'),
                '@': path.resolve(__dirname, 'src')
            }
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    },
    chainWebpack(config) {
        // set preserveWhitespace 去空格
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        //加快开发环境下的打包速度 但是会加大打包的文件
        // config
        // // https://webpack.js.org/configuration/devtool/#development
        //     .when(process.env.NODE_ENV === 'development',
        //         config => config.devtool('cheap-source-map')
        //     )

        //模块切割
        config
            .optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                    name: 'chunk-elementUI', // split elementUI into a single package
                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                    name: 'chunk-commons',
                    test: path.resolve(__dirname, 'src/library'), // can customize your rules
                    minChunks: 3, //  minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        })

        config.optimization.runtimeChunk('single')
    }
}