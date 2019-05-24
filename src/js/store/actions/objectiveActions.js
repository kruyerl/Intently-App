import uuidv4 from 'uuid/v4'
import moment from 'moment'
import {} from '../types'
//  !OBJECTIVE ACTIONS
export const addObjectiveAction = (state, { value }) => {
    const { db, ui } = state
    const { title, why, due, category } = value
    const projectedDue = moment(Date.now())
        .add(due, 'weeks')
        .format()
    // todo
    const newObjective = {
        uid: uuidv4(),
        category,
        title,
        why,
        due: projectedDue,
        createdAt: Date.now(),
        totalTasks: 0,
        totalHabits: 0,
        log: [],
    }
    db.objectives.push(newObjective)
    ui.loading = false
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}
export const deleteObjectiveAction = (state, payload) => {
    const { db, ui } = state
    const updatedObjects = db.objectives.filter(obj => obj.uid !== payload)
    const updatedActions = db.actions.filter(act => act.objective !== payload)
    const updatedHabits = db.habits.filter(hab => hab.objective !== payload)

    db.objectives = updatedObjects
    db.actions = updatedActions
    db.habits = updatedHabits

    ui.loading = false
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}
