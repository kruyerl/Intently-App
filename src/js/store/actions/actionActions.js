import uuidv4 from 'uuid/v4'
import moment from 'moment'
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
        lastComplete: null,
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

export const updateActionAction = (state, { value, updateType }) => {
    const { db, ui } = state
    const newActions = []
    if (updateType === 'completed') {
        value.lastComplete = moment().format().slice(0, 10)
    }
    db.actions.forEach(action => {
        if (action.uid === value.uid) {
            return newActions.push(value)
        }
        return newActions.push(action)
    })

    if (updateType === 'completed') {
        const actionObjective = db.objectives.filter(obj => obj.uid === value.objective)[0]
        actionObjective.totalTasks += 1

        const log = {
            type: 'task',
            item: value,
            timeStamp: moment().format().slice(0, 10),
        }
        actionObjective.log.push(log)
        const objectives = db.objectives.filter(obj => obj.uid !== value.objective)
        objectives.push(actionObjective)
    }

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
