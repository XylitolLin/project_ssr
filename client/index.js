import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from './common/store/configureStore'
import { AppContainer } from 'react-hot-loader'

import App from './App'

import * as dva from 'dva-core'

import homeModel from '../common/models/home'
import autosModel from '../common/models/autos'

const app = dva.create({
    initialState: window.REDUX_STATE
})
app.model({...homeModel})
app.model({...autosModel})
app.start()

console.log(app)

delete window.REDUX_STATE

// const store = configureStore(window.REDUX_STATE)

const renderApp = (Component) => {
    hydrate(
        <AppContainer warnings={false}>
            <Provider store={app._store}>
                <Router>
                    <Component {...window.PROPS_FORM_SERVER} dispatch={app._store.dispatch } />
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
}

renderApp(App)

if (module.hot) {
    module.hot.accept('./App', () => {
        const nextApp = require('./App').default
        renderApp(nextApp)
    })
}


