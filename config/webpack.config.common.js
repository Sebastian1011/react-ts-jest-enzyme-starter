const { resolve, join } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';
console.log('Node Env:' + process.env.NODE_ENV);
console.log('Is dev:' + IS_DEV);

module.exports = {
    target: 'web',
    entry: ['./src/index.tsx'],
    output: {
        publicPath: '/',
        path: resolve(__dirname, '..', 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: { sourceMap: IS_DEV }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: IS_DEV
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: { plugins: () => [require('autoprefixer')], sourceMap: IS_DEV }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: IS_DEV }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|mp4|ogg|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: IS_DEV
        }),
        new webpack.EnvironmentPlugin(['NODE_ENV'])
    ],
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    stats: {
        assetsSort: '!size',
        children: false,
        chunks: false,
        colors: true,
        entrypoints: false,
        modules: false
    }
};
