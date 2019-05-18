//  ?DATA ACTIONS
import firebase from '../firebase'
import { CLEAR_LOADING, SET_ERROR, SYNC_DATA } from '../types'

export async function loadUserDataAction(state,{ dispatch }) {
    const dbData = await firebase.getUserDoc()
    console.log('dbdata',dbData)
    const { db, creationTime, displayName, email, lastSignInTime, uid } = dbData
    const {ui} = state
    ui.downloadPending= false
    ui.authenticated= true
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
        ui
    }
    dispatch({ type: SYNC_DATA, payload: newState })
}

export async function postUserDataAction(state) {
    const { createdAt, creationTime, displayName, email, lastSignInTime, uid } = state.user
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
