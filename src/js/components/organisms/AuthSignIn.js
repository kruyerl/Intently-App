/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { validateSignIn } from '../../utilities/validators'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import { Input, Label } from '../atoms/Form'
import AppContext from '../../store/context'
import { SET_LOADING, CLEAR_LOADING, CLEAR_ERROR, SET_ERROR, LOGIN_USER } from '../../store/types'
import { Loader } from '../modules/Loader'

const StyledButtons = styled(Button)`
    width: 100%;
    margin-top: 16px;
    display: block;
`
const StyledLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20px;
`
const Warning = styled(Text)`
    margin: 0px;
`
const Status = styled.div`
    margin: 10px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const AuthSignIn = ({ history }) => {
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const context = useContext(AppContext)

    useEffect(
        () => () => {
            context.dispatch({
                type: CLEAR_ERROR,
            })
            context.dispatch({
                type: CLEAR_LOADING,
            })
        },
        []
    )

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        context.dispatch({ type: SET_LOADING })
        // validate form
        const validated = validateSignIn(state)

        if (validated.valid) {
            context.dispatch({
                type: LOGIN_USER,
                payload: {
                    ...state,
                    history,
                    dispatch: context.dispatch,
                },
            })
        } else {
            context.dispatch({
                type: CLEAR_LOADING,
            })
            context.dispatch({
                type: SET_ERROR,
                payload: validated.errors,
            })
        }
    }

    const isError = (input, alignment) => {
        try {
            if (context.state.ui.errors)
                return (
                    <Warning tag="small" align={alignment} mod="warning">
                        {context.state.ui.errors[input] && `*${context.state.ui.errors[input]}`}
                    </Warning>
                )
        } catch (error) {
            return null
        }
    }
    const isLoading = () => {
        try {
            if (context.state.ui.loading) return <Loader tag="p" align="center" />
        } catch (error) {
            return null
        }
    }

    return (
        <>
            <form noValidate onSubmit={handleSubmit}>
                <Text tag="h4" align="center" mod="black">
                    Hello, Good Day!
                </Text>
                <Text tag="p" align="center" mod="black">
                    <strong>Please log in or sign up to continue</strong>
                </Text>
                <Label>
                    <StyledLabel>
                        <div>Email</div>
                        {isError('email', 'right')}
                    </StyledLabel>
                    <Input type="email" value={state.email} name="email" onChange={handleChange} />
                </Label>
                <Label>
                    <StyledLabel>
                        <div>Password</div>
                        {isError('password', 'right')}
                    </StyledLabel>
                    <Input type="password" value={state.password} name="password" onChange={handleChange} />
                </Label>
                <Status>
                    {isError('general', 'center')}
                    {isLoading()}
                </Status>
                <StyledButtons mod="interactive">Sign in</StyledButtons>
            </form>
        </>
    )
}
AuthSignIn.propTypes = {}

export default AuthSignIn
