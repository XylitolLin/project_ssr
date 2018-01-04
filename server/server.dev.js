require('babel-polyfill')

require('babel-register')({
    presets: [
        ['env', { targets: { node: 'current' } }],
        ["react"]
    ],
    plugins: ['add-module-exports']
})

const hook = require('css-modules-require-hook')
const lessParser = require('postcss-less').parse

hook({
    extensions: ['.css'],
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:8]'
})

hook({
    extensions: ['.less'],
    camelCase: true,
    processorOpts: {parser: lessParser},
    generateScopedName: '[name]__[local]__[hash:base64:8]'
})

const app = require('./app.js'),
    path = require('path'),
    webpack = require('webpack'),
    convert = require('koa-convert'),
    // koaWebpack = require('koa-webpack'),
    devMiddleware = require('koa-webpack-dev-middleware'),
    hotMiddleware = require('koa-webpack-hot-middleware'),
    views = require('koa-views'),
    config = require('../config/webpack.dev.config'),
    fs = require('fs'),
    clientRoute = require('./middleware/clientRoute'),
    router = require('./routes'),
    port = process.env.port || 2333,
    compiler = webpack(config)

compiler.plugin('emit', (compilation, callback) => {
    const assets = compilation.assets
    let file, data

    Object.keys(assets).forEach(key => {
        if (key.match(/\.html$/)) {
            file = path.resolve(__dirname, key)
            data = assets[key].source()
            fs.writeFileSync(file, data)
        }
    })
    callback()
})

console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)

app.use(devMiddleware(compiler, {
    serverSideRender: true,
    publicPath: config.output.publicPath
}))
app.use(views(path.resolve(__dirname, '../views/tpl'), {map: {html: 'ejs'}}))
app.use(clientRoute)
app.use(router.routes())
app.use(router.allowedMethods())
app.use(convert(hotMiddleware(compiler, {
    reload: true
})))

app.listen(port)
