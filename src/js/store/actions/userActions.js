//  *USER ACTIONS
import firebase from '../firebase'

import { SET_ERROR, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_LOADING, CLEAR_LOADING, LOAD_USERDATA } from '../types'

export const checkUserAuthAction = async ({ state, dispatch }) => state

export const loginUserAction = async ({ email, password, history, dispatch }) => {
    try {
        await firebase
            .login(email, password)
            .then(res => {

                dispatch({ type: SET_AUTHENTICATED })
                history.push('/today')
                dispatch({ type: CLEAR_LOADING })
                dispatch({
                    type: LOAD_USERDATA,
                    payload: {dispatch,}
                })
            })
            .catch(err => {
                dispatch({ type: CLEAR_LOADING })
                dispatch({
                    type: SET_ERROR,
                    payload: { general: err.message },
                })
            })

    } catch (error) {
        console.log(error)
    }
}

export const logoutUserAction = async ({ dispatch }) => {
    await firebase
        .logout()
        .then(res => {
            dispatch({ type: SET_UNAUTHENTICATED })
        })
        .catch(err => {
            dispatch({
                type: SET_ERROR,
                payload: { general: err.message },
            })
        })
}

export const registerUserAction = async ({ name, email, password, history, dispatch }) => {
    dispatch({ type: SET_LOADING })
    firebase
        .register(name, email, password)
        .then(res => {
            dispatch({ type: SET_AUTHENTICATED })
            history.push('/today')
            dispatch({ type: CLEAR_LOADING })
        })
        .catch(err => {
            dispatch({ type: CLEAR_LOADING })
            dispatch({
                type: SET_ERROR,
                payload: { general: err.message },
            })
        })
}
export const setUserAction = (state, payload) => {
    const {ui} = state
    const { displayName, uid, email } = payload.user
    const { lastSignInTime, creationTime } = payload.user.metadata
    const newUser = {
        displayName,
        email,
        uid,
        lastSignInTime,
        creationTime,
    }
    ui.authenticated = true
    return {
        ...state,
        ui,
        user: newUser,
    }
}
