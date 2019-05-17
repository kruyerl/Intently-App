import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useAuthState } from 'react-firebase-hooks/auth'
import AppContext from '../store/context'
import firebase from '../store/firebase'

export const AuthRoute = ({ component: Component, ...rest }) => {
    const { initialising, user } = useAuthState(firebase.auth)
    const Auth = !!user
    return <Route {...rest} render={props => (Auth === false ? <Redirect to="/login" /> : <Component {...props} />)} />
}

AuthRoute.propTypes = {
    //
}

export const UnAuthRoute = ({ component: Component, ...rest }) => {
    const { initialising, user } = useAuthState(firebase.auth)
    const Auth = !!user
    return <Route {...rest} render={props => (Auth === true ? <Redirect to="/today" /> : <Component {...props} />)} />
}
UnAuthRoute.propTypes = {
    //
}
