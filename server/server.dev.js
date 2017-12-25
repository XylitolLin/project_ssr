require('babel-polyfill')

require('babel-register')({
    presets: [
        ['env', { targets: { node: 'current' } }]
    ]
})

const app = require('./app.js').default,
    path = require('path'),
    webpack = require('webpack'),
    devMiddleware = require('koa-webpack-dev-middleware'),
    hotMiddleware = require('./middleware/koa-webpack-hot-middleware'),
    views = require('koa-views'),
    config = require('../config/webpack.dev.config'),
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

console.log(app)

app.use(views(path.resolve(__dirname, '../views/dev'), {map: {html: 'ejs'}}))
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))
app.use(hotMiddleware(compiler))
app.listen(port)