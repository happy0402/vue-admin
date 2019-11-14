'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Element Admin' // page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = 50000 // dev port
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    // publicPath: process.env.NODE_ENV === 'production' // 'development'
    //     ? '/'
    //     : './',
    publicPath: './',
    //代码配置展示时使用
    //https://cli.vuejs.org/zh/config/#lintonsave
    //https://cn.vuejs.org/v2/guide/installation.html#对不同构建版本的解释
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    runtimeCompiler: true,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    configureWebpack: {
        // mode: 'production',//development | production
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        // bable -> es5 转换
        entry: [
            'babel-polyfill',
            resolve("src/main.js"),
        ],//vue router 路由懒加载
        resolve: {
            alias: {
                '@': resolve('src'),
                '#': resolve('src/library')
            }
        },
        // bable -> es5 转换
        module:{
            rules:[
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                }
            ]
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
        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )

        //模块切割
        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
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
                            // iview: {
                            //     name: 'chunk-iview', // split elementUI into a single package
                            //     priority: 15, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                            //     test: /[\\/]node_modules[\\/]_?iview(.*)/ // in order to adapt to cnpm
                            // },
                            commons: {
                                name: 'chunk-library',
                                test: resolve('src/library'), // can customize your rules
                                minChunks: 3, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true
                            }
                        }
                    })
                    config.optimization.runtimeChunk('single')
                }
            )
    }
}