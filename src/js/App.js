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
import TodayPage from './components/pages/TodayPage'
import NotFoundPage from './components/pages/NotFoundPage'
import AppContext from './store/context'
import { LOAD_USERDATA, POST_DATA } from './store/types'

const App = props => {
    const { state, dispatch } = useContext(AppContext)
    const { initialising, user } = useAuthState(firebase.auth)

    // manage ALL state transfers to & from firebase

    useEffect(() => {
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

    return initialising !== true ? (
        <>
            <Router>
                <NavBar />
                <Switch>
                    <UnAuthRoute path="/" exact component={LandingPage} />
                    <UnAuthRoute path="/login" exact component={AuthPage} />
                    <UnAuthRoute path="/login/:id" exact component={AuthPage} />
                    <AuthRoute path="/today" exact component={TodayPage} />
                    <AuthRoute path="/objectives" exact component={ObjectivesPage} />
                    <AuthRoute path="/objectives/:id" exact component={ObjectivesPage} />
                    <AuthRoute path="/other" exact component={TaskPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </>
    ) : (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h1>Loading</h1>
        </div>
    )
}

export default App
