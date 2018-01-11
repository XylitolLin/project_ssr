const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin')

const commonStyleLoader = [{
    loader: 'style-loader'
}, {
    loader: 'css-loader',
    options: {
        modules: true,
        camelCase: true,
        importLoaders: 1,
        localIdentName: '[name]__[local]__[hash:base64:8]'
    }
}, {
    loader: 'postcss-loader',
    options: {
        plugins: (loader) => [
            require('postcss-pxtorem')({
                rootValue: 75,
                propList: ['*', '!font-size']
            })
        ]
    }
}]

module.exports = {
    devtool: 'eval-source-map',
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
                    presets: ['env', 'react', 'stage-0'],
                    plugins: ['transform-runtime', 'react-hot-loader/babel', ["import", { libraryName: "antd-mobile", style: true }]],
                    cacheDirectory: true
                }
            }
        }, {
            test: /\.css$/,
            include: /node_modules/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: (loader) => [
                        require('postcss-pxtorem')({
                            rootValue: 75,
                            propList: ['*', '!font-size']
                        })
                    ]
                }
            }]
        }, {
            test: /\.less$/,
            include: /node_modules/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: (loader) => [
                        require('postcss-pxtorem')({
                            rootValue: 75,
                            propList: ['*', '!font-size']
                        })
                    ]
                }
            }, {
                loader: 'less-loader',
                options: {modifyVars: { '@hd': '2px' }}
            }]
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: commonStyleLoader
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: commonStyleLoader.concat([{
                loader: 'less-loader'
            }])
        }, {
            test: /\.html$/,
            use: {
                loader: 'html-loader'
            }
        }, {
            test: /\.(jpg|png|gif|webp)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
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
        new webpack.DefinePlugin({
            'process.env.SERVER_ENV': JSON.stringify(process.env.SERVER_ENV) || 'development'
        }),
        // new HtmlWebpackPlugin({
        //     filename: '../views/dev/index.html',
        //     template: './views/tpl/index.tpl.html'
        // }),
        new ProgressBarPlugin({ summary: false })
    ]
}