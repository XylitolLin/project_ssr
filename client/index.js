import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import configureStore from './common/store/configureStore'

import App from './App'

const store = configureStore(window.REDUX_STATE)
const history = createHistory()

hydrate(
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)
