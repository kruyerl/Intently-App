/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { validateReview } from '../../utilities/validators'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import { Input, TextArea, Label, Range } from '../atoms/Form'
import img from '../../../assets/img/lookforward.png'
import AppContext from '../../store/context'
import { Loader } from './Loader'
import { ADD_REVIEW, SET_ERROR, CLEAR_ERROR } from '../../store/types'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.white};
`
const MaxWidth = styled.div`
    padding: 32px 24px;
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
    margin-top: 16px;
    ${props => (props.formIsOpen ? 'max-height: 2000px' : null)}
`
const Labels = styled(Label)`
    margin-bottom: 24px;
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
const RangeContainer = styled.div`
    display: flex;
    align-items: center;
    p {
        margin: 0px;
        margin-right: 16px;
    }
    input {
        width: 100%;
    }
`

const AfterActionReviews = ({ match }) => {
    const context = useContext(AppContext)
    const initialState = {
        description: '',
        differently: '',
        grateful: '',
        effective: '',
        ineffective: '',
        rating: 5,
        formIsOpen: false,
        submitted: false,
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
            category: match.params.id,
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
        const validated = validateReview(state)
        if (validated.valid) {
            setState(initialState)
            context.dispatch({
                type: ADD_REVIEW,
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
        context.dispatch({
            type: CLEAR_ERROR,
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
            if (context.state.ui.loading) return <Loader align="center" />
        } catch (error) {
            return null
        }
    }

    return (
        <Container>
            <MaxWidth>
                <ContentBox>
                    <Text tag="h4">
                        {state && state.formIsOpen ? `Great! Let's Begin` : 'When all is said and done'}
                    </Text>
                    <Text tag="h3">
                        {state && state.formIsOpen
                            ? `Reflecting on your day`
                            : 'Look back and be intentional about how you plan to move forward'}
                    </Text>

                    <form noValidate onSubmit={handleSubmit}>
                        <StyledFormElements formIsOpen={state.formIsOpen}>
                            <Labels>
                                <Text tag="p">What happened today?</Text>
                                <TextArea
                                    type="text"
                                    placeholder=""
                                    value={state.description}
                                    name="description"
                                    onChange={handleChange}
                                />
                                {isError('description', 'right')}
                            </Labels>
                            <Labels>
                                <Text tag="p">Rate your performance?</Text>
                                {isError('rating', 'right')}

                                <RangeContainer>
                                    <Text tag="p">{state.rating}</Text>

                                    <Range
                                        type="range"
                                        placeholder="5"
                                        value={state.rating}
                                        name="rating"
                                        min="0"
                                        max="10"
                                        onChange={handleChange}
                                    />
                                </RangeContainer>
                            </Labels>
                            <Labels>
                                <Text tag="p">How were you most effective?</Text>
                                <Input
                                    type="text"
                                    placeholder=""
                                    value={state.effective}
                                    name="effective"
                                    onChange={handleChange}
                                />
                                {isError('effective', 'right')}
                            </Labels>
                            <Labels>
                                <Text tag="p">How were you most ineffective?</Text>
                                <Input
                                    type="text"
                                    placeholder=""
                                    value={state.ineffective}
                                    name="ineffective"
                                    onChange={handleChange}
                                />
                                {isError('ineffective', 'right')}
                            </Labels>
                            <Labels>
                                <Text tag="p">What will you do differently tomorrow?</Text>
                                <TextArea
                                    type="text"
                                    placeholder=""
                                    value={state.differently}
                                    name="differently"
                                    onChange={handleChange}
                                />
                                {isError('differently', 'right')}
                            </Labels>
                            <Labels>
                                <Text tag="p">What is one thing you are grateful for?</Text>
                                <Input
                                    type="text"
                                    placeholder=""
                                    value={state.grateful}
                                    name="grateful"
                                    onChange={handleChange}
                                />
                                {isError('grateful', 'right')}
                            </Labels>
                            <Status>
                                {isError('general', 'center')}
                                {isLoading()}
                            </Status>
                        </StyledFormElements>
                        <StyledButtons mod={state && state.formIsOpen ? 'interactive' : 'brand'} onClick={handleClick}>
                            {state && state.formIsOpen ? 'Submit this review' : 'Review your day'}
                        </StyledButtons>
                        {state.formIsOpen && (
                            <StyledButtons mod="invisible" onClick={handleClose} unactive>
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

export default AfterActionReviews
