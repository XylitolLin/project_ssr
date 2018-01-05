import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import asyncComponent from './components/asyncComponent'
import routes from './routes'

import './app.css'

export default (props) => {
    console.log(props)
    return (
        <Switch>
            {
                routes.map(item => {
                    const Comp = asyncComponent(item)
                    return (
                        <Route key={item.path} exact={item.exact} path={item.path} render={() => <Comp {...props} />} />
                    )
                })
            }
        </Switch>
    )
}