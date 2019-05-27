import uuidv4 from 'uuid/v4'
import moment from 'moment'
import {} from '../types'
//  !OBJECTIVE ACTIONS
export const addReviewAction = (state, { value }) => {
    const { db, ui } = state
    const { description, differently, grateful, effective, ineffective, rating } = value

    const newReview = {
        uid: uuidv4(),
        description,
        differently,
        grateful,
        effective,
        ineffective,
        rating,
        createdAt: moment(Date.now()).format(),
    }
    db.reviews.unshift(newReview)
    ui.loading = false
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}

export const deleteReviewAction = (state, payload) => {
    const { db, ui } = state
    const updatedReviews = db.reviews.filter(rev => rev.uid !== payload)

    db.reviews = updatedReviews

    ui.loading = false
    ui.syncPending = true
    return {
        ...state,
        db,
        ui,
    }
}
