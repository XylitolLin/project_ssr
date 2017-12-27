import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(preloaderState) {
    const store = createStore(
        rootReducer,
        preloaderState
    )

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')

            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}
