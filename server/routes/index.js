import fs from 'fs'
import path from 'path'
import Router from 'koa-router'

const router = new Router({prefix: '/api'})

fs.readdirSync(__dirname)
    .filter(filename =>
        filename !== path.basename(__filename)
    )
    .forEach(filename => {
        let subRouter = require(`./${filename}`)
        router.use(subRouter.routes(), subRouter.allowedMethods())
    })

export default router