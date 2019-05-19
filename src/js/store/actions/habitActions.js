import uuidv4 from 'uuid/v4'
import { POST_DATA } from '../types'
//  !HABIT ACTIONS
export const addHabitAction = (state, { value, objectiveUid }) => {
    const { db, ui } = state
    const newHabit = {
        createdAt: Date.now(),
        uid: uuidv4(),
        body: value,
        complete: false,
        lastCompleted: null,
        objective: objectiveUid,
    }

    db.habits.push(newHabit)
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}

export const deleteHabitAction = (state, payload) => {
    const { db, ui } = state
    const updates = db.habits.filter(habit => habit.uid !== payload)
    db.habits = updates
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}

export const updateHabitAction = (state, { value, dispatch }) => {
    const { db, ui } = state
    const newHabits = []
    db.habits.forEach(habit => {
        if (habit.uid === value.uid) {
            return newHabits.push(value)
        }
        return newHabits.push(habit)
    })
    db.habits = newHabits
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}
