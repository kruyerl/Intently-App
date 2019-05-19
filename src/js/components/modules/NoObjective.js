/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { validateObjective } from '../../utilities/validators'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Anchor from '../atoms/Anchor'
import { Input, TextArea, Select, Label } from '../atoms/Form'
import img from '../../../assets/img/home1.png'
import AppContext from '../../store/context'
import { ADD_OBJECTIVE, SET_ERROR, SET_LOADING, CLEAR_ERROR, CLEAR_LOADING } from '../../store/types'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.grey};
`
const MaxWidth = styled.div`
    padding: 54px 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
    display: flex;
    position: relative;
    flex-wrap: wrap;
    min-height: 450px;
`
const ContentBox = styled.div`
    z-index: 5;
`
const StlyedImg = styled.img`
    align-self: flex-end;
    max-width: 100%;
    @media (min-width: ${props => props.theme.screens.tablet}) {
        position: absolute;
        right: 72px;
        top: 72px;
    }
`

const StyledButtons = styled(Button)`
    margin-bottom: 16px;
`

const StyledFormElements = styled.div`
    height: auto;
    max-height: 0px;
    overflow: hidden;
    transition: all 1000ms ease;
    margin: 16px 0;
    ${props => (props.formIsOpen ? 'max-height: 600px' : null)}
`
const Labels = styled(Label)`
    margin-bottom: 8px;
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

const NoObjective = ({ match }) => {
    const context = useContext(AppContext)

    const initialState = {
        category: match.params.id,
        title: '',
        why: '',
        due: moment()
            .format()
            .slice(0, 10),
        formIsOpen: false,
    }
    const [state, setState] = useState(initialState)

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
    const handleClick = e => {
        if (state.formIsOpen === false) {
            e.preventDefault()
            setState({
                ...state,
                formIsOpen: true,
            })
        } else {
            // submit form
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        const validated = validateObjective(state)
        if (validated.valid) {
            setState(initialState)

            context.dispatch({
                type: ADD_OBJECTIVE,
                payload: {
                    value: state,
                    dispatch: context.dispatch,
                },
            })
        } else {
            context.dispatch({
                type: SET_ERROR,
                payload: validated.errors,
            })
        }
    }
    const handleClose = e => {
        e.preventDefault()
        setState({
            ...state,
            formIsOpen: false,
        })
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
            if (context.state.ui.loading)
                return (
                    <Warning tag="p" align="center" mod="brand">
                        Loading...
                    </Warning>
                )
        } catch (error) {
            return null
        }
    }

    return (
        <Container>
            <MaxWidth>
                <ContentBox>
                    <Text tag="h4">No Objectives? All Finished?</Text>
                    <Text tag="h3">Wrong. Time to be intentional and move forward.</Text>

                    <form noValidate onSubmit={handleSubmit}>
                        <StyledFormElements formIsOpen={state.formIsOpen}>
                            <Labels>
                                <Text tag="p">What do you want to achieve?</Text>
                                <Input
                                    type="text"
                                    placeholder="I will..."
                                    value={state.title}
                                    name="title"
                                    onChange={handleChange}
                                />
                                {isError('title', 'right')}
                            </Labels>
                            <Labels>
                                <Text tag="p">When will you reach your objective?</Text>
                                <Input
                                    type="date"
                                    placeholder="I will..."
                                    value={state.due}
                                    name="due"
                                    onChange={handleChange}
                                />
                                {isError('due', 'right')}
                            </Labels>
                            <Labels>
                                <Text tag="p">Why is it important to you that you achieve this objective?</Text>
                                <TextArea
                                    type="text"
                                    placeholder="This matters to me because..."
                                    value={state.why}
                                    name="why"
                                    onChange={handleChange}
                                />
                                {isError('why', 'right')}
                            </Labels>
                            <Status>
                                {isError('general', 'center')}
                                {isLoading()}
                            </Status>
                        </StyledFormElements>
                        <StyledButtons mod={state && state.formIsOpen ? 'interactive' : 'brand'} onClick={handleClick}>
                            {state && state.formIsOpen ? 'Submit new objective' : 'Create a new objective'}
                        </StyledButtons>
                        {state.formIsOpen && (
                            <StyledButtons mod="grey" onClick={handleClose} unactive>
                                Nevermind
                            </StyledButtons>
                        )}
                    </form>
                </ContentBox>
                <StlyedImg src={img} alt="" />
            </MaxWidth>
        </Container>
    )
}

NoObjective.propTypes = {}

export default NoObjective
