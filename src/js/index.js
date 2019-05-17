import 'babel-polyfill'
import React, { useReducer, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { theme } from './theme/theme'
//  Data
import { GlobalStyle } from './theme/GlobalStyle'
import App from './App.js'
import AppContext from './store/context'
import { GrandLoader } from './components/modules/Loader'
import { initialState } from './store/initialState'
import appReducer from './store/appReducer'
import firebase from './store/firebase'
import { SET_USER } from './store/types'

const Index = () => {
    const [state, dispatch] = useReducer(appReducer, initialState)
    const { initialising, user } = useAuthState(firebase.auth)

    useEffect(() => {
        if (!initialising && user) {
            dispatch({
                type: SET_USER,
                payload: { user },
            })
        }
    }, [initialising, user])

    return (
        <ThemeProvider theme={theme}>
            <>
                <AppContext.Provider
                    value={{
                        state,
                        dispatch,
                    }}
                >
                    <GlobalStyle />

                    <App />
                </AppContext.Provider>
            </>
        </ThemeProvider>
    )
}
ReactDOM.render(<Index />, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
