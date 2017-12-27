require('babel-polyfill')

require('babel-register')({
    presets: [
        ['env', { targets: { node: 'current' } }],
        ["react"]
    ],
    plugins: ['add-module-exports']
})

const app = require('./app.js'),
    path = require('path'),
    webpack = require('webpack'),
    convert = require('koa-convert'),
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

app.use(views(path.resolve(__dirname, '../views/dev'), {map: {html: 'ejs'}}))
app.use(clientRoute)
app.use(router.routes())
app.use(router.allowedMethods())
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))
app.use(convert(hotMiddleware(compiler)))
app.listen(port)