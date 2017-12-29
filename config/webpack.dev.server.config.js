
const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");

module.exports = {
    entry: [ "webpack/hot/poll?1000", "./server/server.dev.webpack.js" ],
    watch: true,
    target: "node",
    externals: [ nodeExternals({ whitelist: [ "webpack/hot/poll?1000" ] }) ],
    resolve: {
        extensions: [ '.js', '.json' ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['env', { targets: { node: 'current' } }], 'react'],
                        plugins: ['transform-runtime', 'add-module-exports'],
                        cacheDirectory: true
                    }
                }
            }, {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        camelCase: true,
                        importLoaders: 1,
                        localIdentName: '[name]__[local]__[hash:base64:8]'
                    }
                }
                ]
            }
        ],
    },
    plugins: [
        new StartServerPlugin("server.js"),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    output: {
        path: path.join(__dirname, "../serverBuild"),
        filename: "server.js"
    },
};