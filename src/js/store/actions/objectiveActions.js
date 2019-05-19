import uuidv4 from 'uuid/v4'
import { POST_DATA } from '../types'
//  !OBJECTIVE ACTIONS
export const addObjectiveAction = (state, { value, dispatch }) => {
    const { db, ui } = state
    const { title, why, due, category } = value
    const newObjective = {
        uid: uuidv4(),
        category,
        title,
        why,
        due,
        createdAt: Date.now(),
        totalTasks: 0,
        totalHabits: 0,
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
    db.objectives = updatedObjects
    ui.loading = false
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}
