/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { AuthRoute, UnAuthRoute } from './utilities/AuthRoute'
import firebase from './store/firebase'
import NavBar from './components/organisms/NavBar'
import LandingPage from './components/pages/LandingPage'
import AuthPage from './components/pages/AuthPage'
import TaskPage from './components/pages/TaskPage'
import ObjectivesPage from './components/pages/ObjectivesPage'
import Styles from './components/pages/Styles'
import TodayPage from './components/pages/TodayPage'
import NotFoundPage from './components/pages/NotFoundPage'
import AppContext from './store/context'
import { LOAD_USERDATA, POST_DATA } from './store/types'
import { useSync } from './utilities/sync'
import ScrollToTop from './utilities/ScrollToTop'
import { GrandLoader } from './components/modules/Loader'
import Undo from './components/modules/Undo'

const App = () => {
    const { state, dispatch } = useContext(AppContext)
    const { initialising, user } = useAuthState(firebase.auth)

    // manage ALL state transfers to & from firebase

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log('State Updated!', state)
        if (user && state && state.user && state.ui.syncPending) {
            dispatch({
                type: POST_DATA,
            })
        }
        if (user && state.ui.downloadPending) {
            dispatch({
                type: LOAD_USERDATA,
                payload: { dispatch },
            })
        }

        if (user && state.user.uid === undefined) {
            dispatch({
                type: LOAD_USERDATA,
                payload: { dispatch },
            })
        }
    }, [initialising, state])

    useSync(() => {
        dispatch({
            type: LOAD_USERDATA,
            payload: { dispatch },
        })
    }, 300000) // 300000

    return initialising !== true ? (
        <>
            <Router>
                <NavBar />
                <Switch>
                    <UnAuthRoute path="/" exact component={LandingPage} />
                    <AuthRoute path="/styles" exact component={Styles} />

                    <UnAuthRoute path="/login" exact component={AuthPage} />
                    <UnAuthRoute path="/login/:id" exact component={AuthPage} />
                    <AuthRoute path="/today" exact component={TodayPage} />
                    <AuthRoute path="/objectives" exact component={ObjectivesPage} />
                    <AuthRoute path="/objectives/:id" exact component={ObjectivesPage} />
                    <AuthRoute path="/tasks" exact component={TaskPage} />
                    <Route component={NotFoundPage} />
                </Switch>
                <Undo />
            </Router>
        </>
    ) : (
        <GrandLoader />
    )
}

export default App
