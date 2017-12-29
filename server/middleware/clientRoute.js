import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../../client/common/store/configureStore'
import App from '../../client/App'

const store = configureStore()

async function clientRoute(ctx, next) {
    let _renderProps, context = {}
    if (ctx.url === '/users' || ctx.url === '/') {
        const assetsByChunkName = ctx.state.webpackStats.toJson().assetsByChunkName
        console.log(assetsByChunkName)
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
