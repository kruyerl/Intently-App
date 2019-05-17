//  ?DATA ACTIONS
import firebase from '../firebase'
import { CLEAR_LOADING, SET_ERROR, SYNC_DATA } from '../types'

export async function loadUserDataAction({ dispatch }) {
    const dbData = await firebase.getUserDoc()
    dispatch({ type: SYNC_DATA, payload: dbData })
    return dbData
}

export async function postUserDataAction(state) {
    const { createdAt, creationTime, displayName, email, lastSignInTime, uid } = state.user
    const { db } = state
    const dbstate = {
        db,
        creationTime,
        displayName,
        email,
        lastSignInTime,
        uid,
    }
    firebase.postUserDoc(dbstate)
    return {
        ...state,
        syncPending: false,
    }
}

export function syncDataAction(state, data) {
    const { db, creationTime, displayName, email, lastSignInTime, uid } = data
    const user = {
        creationTime,
        displayName,
        email,
        lastSignInTime,
        uid,
    }

    return {
        ...state,
        user,
        db,
        downloadPending: false,
    }
}
