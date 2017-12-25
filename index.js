const Koa = require('koa')
const app = new Koa()

app.keys = ['i am a haha']

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
    ctx.cookies.set('name', 'tobi', { signed: true })
    // console.log(ctx.response)
})

app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

app.use(async ctx => {
    ctx.body = 'Hello World'
    // console.log(ctx.request)
    // ctx.throw(400, 'name required', { user: 'lin' })
    
})

app.on('error', err => {
    console.error('server error', err.message)
})

app.listen(2333)