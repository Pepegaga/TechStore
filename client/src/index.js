import React from 'react'
import 'react-native-gesture-handler'
import Navigation from './navigation/Navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './redux/rootReducer'

const store = createStore(rootReducer)

export default () => (
    <Provider store={store}>
        <Navigation />
    </Provider>
)
