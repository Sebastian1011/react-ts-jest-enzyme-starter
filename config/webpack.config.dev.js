const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        hotUpdateMainFilename: 'hot-update.[hash:6].json',
        hotUpdateChunkFilename: 'hot-update.[hash:6].js'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 9990,
        proxy: {
            '/api': {
                target: 'http://10.10.40.136:8087/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: resolve(__dirname, '..', 'src', 'index.html'),
            alwaysWriteToDisk: true
        }),
        new HtmlWebpackHarddiskPlugin({
            outputPath: resolve(__dirname, '..', 'build-dev')
        })
    ]
});
