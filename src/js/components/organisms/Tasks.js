import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Anchor from '../atoms/Anchor'
import Button from '../atoms/Button'
import NonDragAction from '../modules/NonDragAction'
import FooterCTA from './FooterCTA'
import AppContext from '../../store/context'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.white};
`
const MaxWidth = styled.div`
    padding: 32px 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
`
const ActionsContainer = styled.ul`
    padding: 0px;
    margin: 0px;
    margin-top: 16px;
    max-width: ${props => props.theme.screens.tablet};
`
const Tasks = ({ number }) => {
    const context = useContext(AppContext)
    return (
        <Container>
            <MaxWidth>
                <Text tag="h3" mod="brand">
                    Get things done:
                </Text>
                <ActionsContainer>
                    {context.state && context.state.db.tasks
                        ? context.state.db.tasks
                              .slice(0, number)
                              .map(task => <NonDragAction key={task.uid} type="task" obj={task} />)
                        : null}
                    {context.state && context.state.db.tasks.length < 1 ? (
                        <>
                            <Text tag="p" mod="black">
                                The next tasks of each of your objectives show up here everyday
                            </Text>
                            <Anchor tag="link" mod="interactive" to="/tasks">
                                Create some tasks
                            </Anchor>
                        </>
                    ) : null}
                </ActionsContainer>
            </MaxWidth>
        </Container>
    )
}

Tasks.propTypes = {}

export default Tasks
