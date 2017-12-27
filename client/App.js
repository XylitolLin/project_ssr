import React from 'react'
import { Route, Switch } from 'react-router'
import Home from './pages/Home'
import Users from './pages/Users'

export default () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={Users} />
        </Switch>
    )
}