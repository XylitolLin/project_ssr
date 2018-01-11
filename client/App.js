import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import asyncComponent from './components/asyncComponent'
import routes from './routes'

import './app.less'

export default (props) => {
    return (
        <Switch>
            {
                routes.map(item => {
                    const Comp = asyncComponent(item, props.dispatch)
                    return (
                        <Route key={item.path} exact={item.exact} path={item.path} render={() => <Comp {...props} />} />
                    )
                })
            }
        </Switch>
    )
}