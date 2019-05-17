//  !UI ACTIONS
export const setErrorAction = (state, payload) => {
    const { ui } = state
    ui.errors = payload
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
    return {
        ...state,
        ui,
    }
}
export const setAuthenticatedAction = state => {
    let { authenticated } = state
    authenticated = true
    return {
        ...state,
        authenticated,
    }
}
export const setUnAuthenticatedAction = state => {
    let { authenticated } = state
    authenticated = false
    return {
        ...state,
        authenticated,
    }
}
