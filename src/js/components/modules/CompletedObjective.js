/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import QuoteBar from './QuoteBar'
import { GrandLoader } from './Loader'
import NonDragAction from './NonDragAction'
import AddActionForm from './AddActionForm'
import AppContext from '../../store/context'
import { DELETE_OBJECTIVE, REORDER_ACTION } from '../../store/types'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.grey};
`
const MaxWidth = styled.div`
    padding: 32px 24px;
    padding-top: 120px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    position: relative;
    flex-wrap: wrap;
    min-height: 450px;
`
const Stats = styled.div`
    margin: 30px 0 40px 0;
    padding: 4px 24px;
    display: flex;
    flex-direction: column;
    border-left: 6px solid ${props => props.theme.colors.brand.light};
    small {
        margin: 6px;
    }
`
const ActionBox = styled.div`
    max-width: ${props => props.theme.screens.tablet};
    margin: 8px 0 0 0;
    display: grid;
    grid-gap: 0px 8px;
    grid-template-columns: 1fr 1fr;
    @media (max-width: ${props => props.theme.screens.tablet}) {
        display: flex;
        flex-direction: column;
    }
`
const ActionsContainer = styled.ul`
    background: ${props => props.theme.colors.layout.white};
    padding: 24px;
    margin: 0px;
    margin-top: 30px;
    max-width: ${props => props.theme.screens.tablet};
`

const ButtonBox = styled.div`
    margin: 30px 0;
    button {
        margin-right: 16px;
    }
`

const Objective = ({ history, match }) => {
    const { state, dispatch } = useContext(AppContext)
    const { objectives, actions, habits } = state.db
    const { displayName } = state.user
    const [localState, setLocalState] = useState({
        loaded: false,
    })

    useEffect(() => {
        // getObject
        const objective = objectives.filter(obj => obj.uid === match.params.id)[0]
        setLocalState({
            loaded: true,
            objective,
        })
    }, [state])

    const handleDelete = () => {
        dispatch({ type: DELETE_OBJECTIVE, payload: localState.objective.uid })
        history.push(`/objectives/${localState.objective.category}`)
    }
    const handleUndo = () => {
        history.push(`/objectives/${localState.objective.category}`)
    }
    console.log(localState)
    return state && localState.objective ? (
        <Container>
            <MaxWidth>
                <Text tag="h2">{`Congratulations${` ${displayName}` || ''},`}</Text>
                <Text tag="h1">You Succeeded!</Text>

                <hr />
                <Text tag="h3">{` On the ${moment(localState.objective.createdAt).format(
                    'Do [of] MMM YYYY'
                )} you set out to ${localState.objective.title.replace(/I/g, 'you').replace(/my/, 'your')}`}</Text>

                <Text tag="h4">
                    {`Today, after ${moment({ hours: 0 }).diff(localState.objective.createdAt, 'days') * -1} days, ${
                        localState.objective.totalHabits
                    } habits and ${localState.objective.totalTasks} tasks
            you completed this objective`}
                </Text>

                <Text tag="p">
                    From all of us at Intently, we would like to thank you for allowing us to partner with you in order
                    to make great things happen in your life. Our single purpose is to empower people like yourself to
                    reach higher and higher, to take back your life and to help you fulfill your true potential and we
                    could not be more proud of you for your achievements, no matter how small they may be. <br />
                    <br />
                    Today you demonstrated that by being intentional, anybody can make great things happen. So
                    congratulations, and thank you. We hope you are encouraged and proud of your achievements and most
                    importantly we hope you feel hungry for more. <br />
                    <br />
                    If you feel that this tool added value to your life I would have please share this with one other
                    person you feel could benefit from using this product. It really goes a long way to help us grow so
                    that we can empower the many millions of people who need to find this tool.
                    <br />
                    <br />
                </Text>

                <ButtonBox>
                    <Button mod="interactive" onClick={handleDelete}>
                        Complete this objective
                    </Button>
                    <Button mod="grey" onClick={handleUndo} unactive>
                        I'm not done yet
                    </Button>
                </ButtonBox>
            </MaxWidth>
            <QuoteBar />
        </Container>
    ) : (
        <GrandLoader />
    )
}

Objective.propTypes = {}

export default Objective
