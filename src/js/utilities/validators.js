export const isEmail = email => {
    // eslint-disable-next-line no-useless-escape
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (email.match(regEx)) return true
    return false
}
const isEmpty = string => {
    if (string.trim() === '') return true
    return false
}

export const validateReset = email => {
    const errors = {}
    if (isEmpty(email)) {
        errors.email = 'Must not be empty'
    } else if (!isEmail(email)) {
        errors.email = 'Must be a valid email address'
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0,
    }
}

export const validateSignUp = data => {
    const errors = {}

    if (isEmpty(data.name)) {
        errors.name = 'Must not be empty'
    }
    if (isEmpty(data.email)) {
        errors.email = 'Must not be empty'
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address'
    }
    if (isEmpty(data.password)) errors.password = 'Must not be empty'
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match'
    return {
        errors,
        valid: Object.keys(errors).length === 0,
    }
}

export const validateSignIn = data => {
    const errors = {}
    if (isEmpty(data.email)) errors.email = 'Must not be empty'
    else if (!isEmail(data.email)) errors.email = 'Must be a valid email address'
    if (isEmpty(data.password)) errors.password = 'Must not be empty'
    return {
        errors,
        valid: Object.keys(errors).length === 0,
    }
}
