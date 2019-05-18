import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import HeroHeader from '../modules/HeroHeader'
import FooterCTA from '../organisms/FooterCTA'
import Action from '../modules/Action'
import AddActionForm from '../modules/AddActionForm'
import QuoteBar from '../modules/QuoteBar'
import TasksOrganism from '../organisms/TasksOrganism'
import { ADD_TASK } from '../../store/types'
import AppContext from '../../store/context'
import Loader from '../modules/Loader'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.white};
`
const MaxWidth = styled.div`
    padding: 54px 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
`
const ActionsContainer = styled.ul`
    padding: 0px;
    margin: 0px;
    margin-top: 30px;
    max-width: ${props => props.theme.screens.tablet};
`

const TaskPage = () => {
    const [state, setState] = useState({ value: '' })
    const context = useContext(AppContext)

    const handleClickButton = e => {}
    const handleChange = e => {
        setState({ value: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        context.dispatch({
            type: ADD_TASK,
            payload: {
                value: state.value,
                dispatch: context.dispatch,
            },
        })
        setState({
            value: '',
        })
        document.getElementById('ActionFormInput').focus()
    }

    return context.state && (context.state.ui.authenticated === true) ? (
        <>
            <HeroHeader h1="Other Actions" h2="I will intentionaly guard my time">
                <Text tag="h4" mod="black">
                    Its easy to be busy. I will prioritise & execute with my objectives in mind
                </Text>
            </HeroHeader>
            <QuoteBar />
            <Container>
                <MaxWidth>
                    <Text tag="h4" mod="black">
                        These are the secondary items I must take to stay on top of everything.
                    </Text>
                    <ActionsContainer>
                        {context.state && context.state.db.tasks ? (
                            context.state.db.tasks.map(({ uid, complete, body }) => (
                                <Action key={uid} index={uid} body={body} checked={complete} edit />
                            ))
                        ) : (
                            <Loader tag="p" />
                        )}

                        <AddActionForm
                            value={state.value}
                            onClickButton={handleClickButton}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                        />
                    </ActionsContainer>
                </MaxWidth>
            </Container>
            <FooterCTA h4="Being busy doesn't mean I am being effective. I must prioritise and execute" />
        </>
    ) : (<div><br /><br /><br /><h1>{`Loading: AUTH${context.state.ui.authenticated}    and    STATE: ${context.state.stringify()}`}</h1></div>)
}

TaskPage.propTypes = {}

export default TaskPage
