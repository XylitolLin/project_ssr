import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../../client/common/store/configureStore'
import App from '../../client/App'
import clientRoutes from '../../client/routes'

const store = configureStore()

async function clientRoute(ctx, next) {
    let _renderProps, context = {}, msg
    console.log(matchPath(ctx.path, clientRoutes))
    const foundRoute = clientRoutes.find((item, index) => {
        return ctx.path === item.path
    })
    if (foundRoute) {
        const ctxForOutside = {
            pathname: ctx.path,
            query: ctx.query,
            req: ctx.req,
            res : ctx.res,
        }
        let assetsByChunkName = process.env.NODE_ENV !== 'production' ? ctx.state.webpackStats.toJson().assetsByChunkName : {}
        const routeGetInitialProps = foundRoute.component.getInitialProps
        if (typeof routeGetInitialProps === 'function') {
            if (routeGetInitialProps instanceof Promise) {
                msg = await routeGetInitialProps(ctxForOutside)
            } else {
                msg = routeGetInitialProps(ctxForOutside)
            }
        }
        console.log(msg)
        await ctx.render('index', {
            root: renderToString(
                <Provider store={store}>
                    <StaticRouter location={ctx.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            ),
            state: store.getState(),
            assets: assetsByChunkName
        })
    } else {
        await next()
    }
}

export default clientRoute
