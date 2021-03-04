// const path = require('path')
// const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// 打包静态资源 start
const path = require('path');

const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'html']
//打包静态资源 end



module.exports = {
    
    devServer: {
        disableHostCheck: true
    },

    

    configureWebpack: {
        //cdn资源命名
        externals: {
            'vue': "Vue",
            "element-ui": "ELEMENT",
            "vue-router": "VueRouter",
            'vuex': "Vuex",
            "axios" : "axios",
            'XLSX' : "XLSX"
        },
        //资源压缩
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@i': path.resolve(__dirname, './src/assets'),
            }
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

            // 下面是下载的插件的配置
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 5,
                minChunkSize: 100
            })
        ]
    },
    //不打包map文件
    productionSourceMap: false,
    chainWebpack: config => {
        //标题title
        config.plugin('html').tap(args => {
            args[0].title = '文本批量替换工具 - 在线多词替换工具'
            return args
        });
        // 移除 prefetch/preload 的link
        config.plugins.delete('preload');

        //防止打包多份的lodash
        config.module.rule('eslint').use('eslint-loader')
            .tap(opts => ({ ...opts, emitWarning: false }));
        config.resolve.alias
            .set('@', resolve('src'))
            .set('api', resolve('src/api'))
            .set('components', resolve('src/components'))
            .set('lodash', resolve('node_modules/lodash'));
    }
}