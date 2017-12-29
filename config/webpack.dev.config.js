const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
    devtool: 'eval',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: [
            'react-hot-loader/patch',
            './client/index.js',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
        ],
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                    plugins: ['transform-runtime', 'react-hot-loader/babel'],
                    cacheDirectory: true
                }
            }
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    camelCase: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]__[hash:base64:8]'
                }
            }
            ]
        }, {
            test: /\.html$/,
            use: {
                loader: 'html-loader'
            }
        }]
    },
    resolve: {
        extensions: [ '.js', '.json' ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].js'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new HtmlWebpackPlugin({
        //     filename: '../views/dev/index.html',
        //     template: './views/tpl/index.tpl.html'
        // }),
        new ProgressBarPlugin({ summary: false })
    ]
}