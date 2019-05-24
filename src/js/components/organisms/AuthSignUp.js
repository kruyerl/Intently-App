/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { validateSignUp } from '../../utilities/validators'
import Text from '../atoms/Text'
import { Input, Label } from '../atoms/Form'
import Button from '../atoms/Button'
import AppContext from '../../store/context'
import { REGISTER_USER, SET_LOADING, CLEAR_LOADING, CLEAR_ERROR, SET_ERROR } from '../../store/types'
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

const AuthSignUp = ({ history }) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const context = useContext(AppContext)

    useEffect(
        () => () => {
            context.dispatch({
                type: CLEAR_ERROR,
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
        const validated = validateSignUp(state)
        if (validated.valid) {
            context.dispatch({
                type: REGISTER_USER,
                payload: {
                    ...state,
                    history,
                    dispatch: context.dispatch,
                },
            })
        } else {
            context.dispatch({
                type: SET_ERROR,
                payload: validated.errors,
            })
            context.dispatch({
                type: CLEAR_LOADING,
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
            if (context.state.ui.loading) return <Loader align="center" tag="p" />
        } catch (error) {
            return null
        }
    }

    return (
        <>
            <form noValidate onSubmit={handleSubmit}>
                <Text tag="h4" align="center" mod="black">
                    Hello Stranger!
                </Text>
                <Text tag="p" align="center" mod="black">
                    <strong>Register below to start your journey</strong>
                </Text>
                <Label>
                    <StyledLabel>
                        <div>First Name</div>
                        {isError('name', 'right')}
                    </StyledLabel>
                    <Input type="text" value={state.name} name="name" onChange={handleChange} />
                </Label>
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
                <Label>
                    <StyledLabel>
                        <div>Confirm Password</div>
                        {isError('confirmPassword', 'right')}
                    </StyledLabel>
                    <Input
                        type="password"
                        value={state.confirmPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                    />
                </Label>
                <Status>
                    {isError('general', 'center')}
                    {isLoading()}
                </Status>
                <StyledButtons mod="interactive">Sign up</StyledButtons>
            </form>
        </>
    )
}
AuthSignUp.propTypes = {}

export default AuthSignUp
