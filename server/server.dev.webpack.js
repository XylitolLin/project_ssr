import app from './app'
import path from 'path'
import webpack from 'webpack'
import convert from 'koa-convert'
import devMiddleware from 'koa-webpack-dev-middleware'
import hotMiddleware from 'koa-webpack-hot-middleware'
import views from 'koa-views'
import config from '../config/webpack.dev.config'
import fs from 'fs'
import clientRoute from './middleware/clientRoute'
// import router from './routes/index'
import cssHook from 'css-modules-require-hook'

const port = process.env.port || 2333,
    compiler = webpack(config)

cssHook({
    extensions: ['.css'],
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:8]'
})

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
// app.use(router.routes())
// app.use(router.allowedMethods())
app.use(convert(hotMiddleware(compiler, {
    reload: true
})))

app.listen(port)
