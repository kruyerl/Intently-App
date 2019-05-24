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
    UNDO_DATA,
    CANCEL_UNDO_DATA,
    SET_NAME,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    REORDER_TASK,
    ADD_OBJECTIVE,
    UPDATE_OBJECTIVE,
    DELETE_OBJECTIVE,
    ADD_HABIT,
    UPDATE_HABIT,
    DELETE_HABIT,
    ADD_ACTION,
    UPDATE_ACTION,
    DELETE_ACTION,
    REORDER_ACTION,
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

import {
    loadUserDataAction,
    syncDataAction,
    postUserDataAction,
    undoStateDataAction,
    cancelUndoStateDataAction,
} from './actions/dataActions'

import { addTaskAction, updateTaskAction, deleteTaskAction, reorderTaskAction } from './actions/taskActions'

import { addObjectiveAction, deleteObjectiveAction } from './actions/objectiveActions'
import { addHabitAction, deleteHabitAction, updateHabitAction } from './actions/habitActions'
import { addActionAction, deleteActionAction, updateActionAction, reorderActionsAction } from './actions/actionActions'

//  !Reducer
const appReducer = (state, { type, payload }) => {
    console.log(`dispatched: ${type}`)
    switch (type) {
        // ?HABITS

        case ADD_ACTION:
            return addActionAction(state, payload)
        case UPDATE_ACTION: // todo
            return updateActionAction(state, payload)
        case DELETE_ACTION:
            return deleteActionAction(state, payload)
        case REORDER_ACTION:
            return reorderActionsAction(state, payload)

        // ?HABITS

        case ADD_HABIT:
            return addHabitAction(state, payload)
        case UPDATE_HABIT: // todo
            return updateHabitAction(state, payload)
        case DELETE_HABIT:
            return deleteHabitAction(state, payload)

        // ?objectives

        case ADD_OBJECTIVE:
            return addObjectiveAction(state, payload)
        case UPDATE_OBJECTIVE: // todo
            return state
        case DELETE_OBJECTIVE:
            return deleteObjectiveAction(state, payload)

        // ?TASK

        case ADD_TASK:
            return addTaskAction(state, payload)
        case UPDATE_TASK:
            return updateTaskAction(state, payload)
        case DELETE_TASK:
            return deleteTaskAction(state, payload)
        case REORDER_TASK:
            return reorderTaskAction(state, payload)

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
            return logoutUserAction(payload)
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

        case UNDO_DATA:
            return undoStateDataAction(state)
        case CANCEL_UNDO_DATA:
            return cancelUndoStateDataAction(state)
        case LOAD_USERDATA:
            loadUserDataAction(state, payload)
            return state
        case SYNC_DATA:
            return syncDataAction(state, payload)
        case POST_DATA:
            return postUserDataAction(state)
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
