import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../../client/common/store/configureStore'
import App from '../../client/App'
import clientRoutes from '../../client/routes'

import homeModel from '../../common/models/home'

import * as dva from 'dva-core'

// const store = configureStore()

async function clientRoute(ctx, next) {
    let _renderProps, context = {}, nextProps = {}, callbackProps, renderingInfo = {}
    const foundRoute = clientRoutes.find((item, index) => {
        return ctx.path === item.path
    })
    if (foundRoute) {
        let app = dva.create()
        app.model({...foundRoute.model})
        app.start()
        const store = app._store
        const ctxForOutside = {
            pathname: ctx.path,
            query: ctx.query,
            req: ctx.req,
            res: ctx.res,
            dispatch: store.dispatch,
            getState: store.getState
        }
        Object.assign(renderingInfo, {
            pathname: ctx.path,
            query: ctx.query
        })

        let assetsByChunkName = process.env.NODE_ENV !== 'production' ? ctx.state.webpackStats.toJson().assetsByChunkName : {}
        const routeGetInitialProps = foundRoute.component.getInitialProps
        if (typeof routeGetInitialProps === 'function') {
            console.log(routeGetInitialProps.constructor.name)
            // if (routeGetInitialProps.constructor.name === 'AsyncFunction') {
                callbackProps = await routeGetInitialProps(ctxForOutside)
            // } else {
                // callbackProps = routeGetInitialProps(ctxForOutside)
            // }
        }
        Object.assign(nextProps, callbackProps)
        // console.log(nextProps)
        await ctx.render('index', {
            root: renderToString(
                <Provider store={store}>
                    <StaticRouter location={ctx.url} context={context}>
                        <App { ...nextProps } dispatch={store.dispatch} />
                    </StaticRouter>
                </Provider>
            ),
            state: store.getState(),
            propsFormServer: nextProps,
            renderingInfo,
            assets: assetsByChunkName
        })
        app = null
    } else {
        await next()
    }
}

export default clientRoute
