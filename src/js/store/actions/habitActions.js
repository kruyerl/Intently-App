import uuidv4 from 'uuid/v4'
import moment from 'moment'
import { POST_DATA } from '../types'
//  !HABIT ACTIONS
export const addHabitAction = (state, { value, objectiveUid }) => {
    const { db, ui } = state
    ui.undoAble = true
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

    ui.undoAble = true

    db.habits = updates
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}

export const updateHabitAction = (state, { value, updateType, dispatch }) => {
    const { db, ui } = state
    const newHabits = []

    ui.undoAble = true
    if (updateType === 'completed') {
        const habitsObjective = db.objectives.filter(obj => obj.uid === value.objective)[0]
        habitsObjective.totalHabits += 1
        const log = {
            type: 'habit',
            item: value,
            timeStamp: moment().format(),
        }
        habitsObjective.log.push(log)
        const objectives = db.objectives.filter(obj => obj.uid !== value.objective)
        objectives.push(habitsObjective)
    }
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
