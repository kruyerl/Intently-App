/* eslint-disable no-console */

import {
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER,
    SET_ERROR,
    CLEAR_ERROR,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_LOADING,
    CLEAR_LOADING,
    SET_USER,
    CHECK_AUTH,
    LOAD_USERDATA,
    SYNC_DATA,
    POST_DATA,
    SET_NAME,
    ADD_TASK,
    REMOVE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
} from './types'

import {
    loginUserAction,
    logoutUserAction,
    registerUserAction,
    setUserAction,
    checkUserAuthAction,
} from './actions/userActions'
import {
    setErrorAction,
    clearErrorAction,
    setLoadingAction,
    clearLoadingAction,
    setAuthenticatedAction,
    setUnAuthenticatedAction,
} from './actions/uiActions'
import { loadUserDataAction, syncDataAction, postUserDataAction } from './actions/dataActions'
import { addTaskAction, updateTaskAction, deleteTaskAction } from './actions/taskActions'

//  !Reducer
const appReducer = (state, { type, payload }) => {
    console.log(`dispatched: ${type}`)
    switch (type) {
        //

        case ADD_TASK:
            return addTaskAction(state, payload)
        case UPDATE_TASK:
            return updateTaskAction(state, payload)
        case DELETE_TASK:
            return deleteTaskAction(state, payload)

        //  !UI

        case SET_ERROR:
            return setErrorAction(state, payload)
        case CLEAR_ERROR:
            return clearErrorAction(state)
        case SET_LOADING:
            return setLoadingAction(state)
        case CLEAR_LOADING:
            return clearLoadingAction(state)

        //  *USER

        case LOGIN_USER:
            loginUserAction(payload)
            return state
        case LOGOUT_USER:
            logoutUserAction(payload)
            return state
        case SET_AUTHENTICATED:
            return setAuthenticatedAction(state)
        case SET_UNAUTHENTICATED:
            return setUnAuthenticatedAction(state)
        case REGISTER_USER:
            registerUserAction(payload)
            return state
        case SET_USER:
            return setUserAction(state, payload)
        case CHECK_AUTH:
            return checkUserAuthAction(state, payload)

        //  ?DATA

        case LOAD_USERDATA:
            loadUserDataAction(state, payload)
            return state
        case SYNC_DATA:
            return syncDataAction(state, payload)
        case POST_DATA:
            postUserDataAction(state)
            return state
        case SET_NAME: {
            const { user } = state
            user.displayName = payload.name
            return { ...state, user }
        }
        default:
            return state
    }
}
export default appReducer
