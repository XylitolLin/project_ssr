const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin')

let clientConfig, serverConfig

function getExternals() {
    return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
        .filter(filename => !filename.includes('.bin'))
        .reduce((externals, filename) => {
            externals[filename] = `commonjs ${filename}`

            return externals
        }, {})
}

clientConfig = {
    context: path.resolve(__dirname, '../'),
    entry: {
        bundle: './client',
        vendor: ['react', 'react-dom', 'react-router', 'react-redux', 'redux']
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js',
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
                    plugins: ['transform-runtime', ["import", { libraryName: "antd-mobile", style: "css" }]],
                    cacheDirectory: true
                }
            }
        }, {
            test: /\.css$/,
            include: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
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
            })
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
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
            })
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
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
                }, {
                    loader: 'less-loader'
                }]
            })
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
        extensions: ['.js', '.json']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
            filename: '[name].[chunkhash:8].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new HtmlWebpackPlugin({
            filename: '../../views/prod/index.html',
            template: './views/tpl/index.html',
            // chunksSortMode: 'none'
        }),
        new ExtractTextPlugin('[name].[contenthash:8].css', {allChunks: true})
    ]
}

serverConfig = {
    context: path.resolve(__dirname, '../'),
    entry: {
        server: './server/server.prod'
    },
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [['env', { targets: { node: 'current', uglify: true } }], 'react', 'stage-0'],
                    plugins: ['add-module-exports'],
                    cacheDirectory: true
                }
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [{
                loader: 'css-loader/locals',
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
        }, {
            test: /\.css$/,
            include: /node_modules/,
            use: [{
                loader: 'css-loader/locals'
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
            exclude: /node_modules/,
            use: [{
                loader: 'css-loader/locals',
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
            }, {
                loader: 'less-loader'
            }]
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
    externals: getExternals(),
    resolve: {
        extensions: ['.js', '.json']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.SERVER_ENV': JSON.stringify(process.env.SERVER_ENV)
        })
    ]
}

module.exports = [clientConfig, serverConfig]
