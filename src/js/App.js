/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDocument } from 'react-firebase-hooks/firestore'
import { AuthRoute, UnAuthRoute } from './utilities/AuthRoute'
import firebase from './store/firebase'
//  Nav
import NavBar from './components/organisms/NavBar'
//  Pages
import LandingPage from './components/pages/LandingPage'
import AuthPage from './components/pages/AuthPage'
import TaskPage from './components/pages/TaskPage'
import ObjectivesPage from './components/pages/ObjectivesPage'
import TodayPage from './components/pages/TodayPage'
import NotFoundPage from './components/pages/NotFoundPage'
//  Actions
import AppContext from './store/context'
import { SET_LOADING, CHECK_AUTH, LOAD_USERDATA, POST_DATA } from './store/types'

const App = props => {
    const { state, dispatch } = useContext(AppContext)
    // eslint-disable-next-line no-console
    console.log('State Updated! New State:', state)

    // post & fetch ALL state changes to firebase
    useEffect(() => {
        if (firebase.auth.currentUser && state.syncPending === true) {
            dispatch({ type: POST_DATA })
        }
        if (firebase.auth.currentUser && state.downloadPending === true) {
            dispatch({ type: LOAD_USERDATA, payload: { dispatch } })
        }
    }, [state])

    return (
        <>
            <Router>
                <NavBar />
                <Switch>
                    <UnAuthRoute path="/" exact component={LandingPage} />
                    <UnAuthRoute path="/login" exact component={AuthPage} />
                    <UnAuthRoute path="/login/:id" exact component={AuthPage} />
                    <AuthRoute path="/today" exact component={TodayPage} />
                    <AuthRoute path="/objectives" exact component={ObjectivesPage} />
                    <AuthRoute path="/other" exact component={TaskPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </>
    )
}

export default App
