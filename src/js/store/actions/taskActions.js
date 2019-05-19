import uuidv4 from 'uuid/v4'
import { POST_DATA } from '../types'
//  !TASK ACTIONS
export const addTaskAction = (state, { value, objectiveUid }) => {
    const { db, ui } = state
    const newTask = {
        createdAt: Date.now(),
        uid: uuidv4(),
        body: value,
        complete: false,
        due: null,
        sheduled: null,
    }
    db.tasks.push(newTask)
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}

export const updateTaskAction = (state, { value, dispatch }) => {
    const { db, ui } = state
    const newTasks = []
    db.tasks.forEach(task => {
        if (task.uid === value.uid) {
            return newTasks.push(value)
        }
        return newTasks.push(task)
    })
    db.tasks = newTasks
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}

export const deleteTaskAction = (state, payload) => {
    const { db, ui } = state
    const updates = db.tasks.filter(task => task.uid !== payload)
    db.tasks = updates
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}

export const reorderTaskAction = (state, payload) => {
    const { db, ui } = state
    db.tasks = payload
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}
