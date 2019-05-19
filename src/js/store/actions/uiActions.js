import { initialState } from '../initialState'
//  !UI ACTIONS
export const setErrorAction = (state, payload) => {
    const { ui } = state
    ui.errors = payload
    ui.loading = false
    return {
        ...state,
        ui,
    }
}
export const clearErrorAction = state => {
    const { ui } = state
    ui.errors = null
    ui.loading = false
    return {
        ...state,
        ui,
    }
}
export const setLoadingAction = state => {
    const { ui } = state
    ui.loading = true
    return {
        ...state,
        ui,
    }
}
export const clearLoadingAction = state => {
    const { ui } = state
    ui.loading = false
    ui.errors = null
    return {
        ...state,
        ui,
    }
}
export const setAuthenticatedAction = state => {
    const { authenticated, ui } = state
    ui.authenticated = true
    return {
        ...state,
        ui,
    }
}
export const setUnAuthenticatedAction = state => {
    const { authenticated, ui } = state
    ui.authenticated = false
    return { ...initialState }
}
