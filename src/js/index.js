import 'babel-polyfill'
import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { theme } from './theme/theme'
//  Data
import { GlobalStyle } from './theme/GlobalStyle'
import App from './App.js'
import { initialState } from './store/initialState'
import appReducer from './store/appReducer'
import AppContext from './store/context'

const Index = () => {
    const [state, dispatch] = useReducer(appReducer, initialState)
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
