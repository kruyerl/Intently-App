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
    const { db } = state
    const newTasks = []
    db.tasks.forEach(task => {
        if (task.uid === value.uid) {
            return newTasks.push(value)
        }
        return newTasks.push(task)
    })
    db.tasks = newTasks
    return {
        ...state,
        db,
        syncPending: true,
    }
}

export const deleteTaskAction = (state, { value }) => {
    const { db } = state
    const updates = db.tasks.filter(task => task.uid !== value.uid)
    db.tasks = updates
    return {
        ...state,
        db,
        syncPending: true,
    }
}
