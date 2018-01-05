import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from './common/store/configureStore'
import { AppContainer } from 'react-hot-loader'

import App from './App'

const store = configureStore(window.REDUX_STATE)

const renderApp = (Component) => {
    hydrate(
        <AppContainer warnings={false}>
            <Provider store={store}>
                <Router>
                    <Component {...window.PROPS_FORM_SERVER} />
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


