import uuidv4 from 'uuid/v4'
import { POST_DATA } from '../types'
//  !TASK ACTIONS
export const addTaskAction = (state, { value, dispatch }) => {
    const { db } = state
    const newTask = {
        createdAt: Date.now(),
        uid: uuidv4(),
        body: value,
        complete: false,
        due: null,
        sheduled: null,
    }
    console.log('newTask', newTask)
    db.tasks.push(newTask)
    dispatch({
        type: POST_DATA,
        payload: {
            dispatch,
        },
    })
    return {
        ...state,
        db,
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

export const deleteTaskAction = (state, { value }) => {
    const { db, ui } = state
    const updates = db.tasks.filter(task => task.uid !== value.uid)
    db.tasks = updates
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}
