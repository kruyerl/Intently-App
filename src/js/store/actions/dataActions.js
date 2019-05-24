//  ?DATA ACTIONS
import moment from 'moment'
import firebase from '../firebase'
import { CLEAR_LOADING, SET_ERROR, SYNC_DATA } from '../types'

export async function loadUserDataAction(state, { dispatch }) {
    const dbData = await firebase.getUserDoc()
    const { db, creationTime, displayName, email, lastSignInTime, uid } = dbData
    const { ui, lastState } = state
    const { habits } = db
    const isYesterday = lastCompleted => moment(lastCompleted).isBefore(moment().format(), 'day')

    ui.downloadPending = false
    ui.authenticated = true

    const newHabits = []
    habits.forEach(habit => {
        if (habit.complete && isYesterday(habit.lastCompleted)) {
            habit.complete = false
            return newHabits.push(habit)
        }
        return newHabits.push(habit)
    })
    db.habits = newHabits

    const user = {
        creationTime,
        displayName,
        email,
        lastSignInTime,
        uid,
    }

    const newState = {
        ...state,
        user,
        db,
        ui,
        lastAction: {},
    }
    dispatch({ type: SYNC_DATA, payload: newState })
}

export function postUserDataAction(state) {
    const { creationTime, displayName, email, lastSignInTime, uid } = state.user
    const { db, ui } = state
    const dbstate = {
        db,
        creationTime,
        displayName,
        email,
        lastSignInTime,
        uid,
    }
    firebase.postUserDoc(dbstate)
    ui.syncPending = false

    return {
        ...state,
        ui,
    }
}

export function syncDataAction(state, payload) {
    return payload
}

export function undoStateDataAction(state) {
    const { undo, ui } = state

    ui.undoAble = false
    return {
        ...state,
        ui,
    }
}
export function cancelUndoStateDataAction(state) {
    const { ui } = state
    state.undo = {}
    ui.undoAble = false
    return {
        ...state,
        ui,
    }
}
