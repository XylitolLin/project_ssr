import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'

import './app.css'

export default () => {
    return (
        <div>
            <div>
                <Link to="/">Home</Link>
                <hr />
                <Link to="/users">Users</Link>
            </div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={Users} />
            </Switch>
        </div>
    )
}