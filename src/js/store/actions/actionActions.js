import uuidv4 from 'uuid/v4'
import {} from '../types'
//  !TASK ACTIONS
export const addActionAction = (state, { value, objectiveUid }) => {
    const { db, ui } = state
    const newAction = {
        createdAt: Date.now(),
        uid: uuidv4(),
        body: value,
        complete: false,
        due: null,
        sheduled: null,
        objective: objectiveUid,
    }
    db.actions.push(newAction)
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}

export const updateActionAction = (state, { value }) => {
    const { db, ui } = state
    const newActions = []
    db.actions.forEach(action => {
        if (action.uid === value.uid) {
            return newActions.push(value)
        }
        return newActions.push(action)
    })
    db.actions = newActions
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}

export const deleteActionAction = (state, payload) => {
    const { db, ui } = state
    console.log('valueuid', payload)

    const updates = db.actions.filter(action => action.uid !== payload)
    db.actions = updates
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}

export const reorderActionsAction = (state, payload) => {
    const { db, ui } = state
    db.actions = payload
    ui.loading = false
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}
