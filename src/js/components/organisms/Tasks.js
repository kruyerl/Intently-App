import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Anchor from '../atoms/Anchor'
import Button from '../atoms/Button'
import NonDragAction from '../modules/NonDragAction'
import FooterCTA from './FooterCTA'
import AppContext from '../../store/context'
import moment from 'moment'
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



    const tasksPick =(taskArr)=>{

        const chosenTasks = taskArr.filter(task=>{

            if (task.lastComplete === null ){
                return true
            }
            if (moment({ hours: 0 }).diff(task.lastComplete, 'days') <= 0 ){
                return true
            }
        })
        return chosenTasks
    }
    return (
        <Container>
            <MaxWidth>
                <Text tag="h3" mod="brand">
                    Get things done:
                </Text>
                <ActionsContainer>
                    {context.state && context.state.db.tasks
                        ? tasksPick(context.state.db.tasks)
                              .slice(0, number)
                              .map(task => <NonDragAction key={task.uid} type="task" obj={task} />)
                        : null}
                    {context.state && context.state.db.tasks.length < 1 ? (
                        <>
                            <Text tag="p" mod="black">
                                We get it, you have things you need to do. After you set up your tasks a handful of them will apear here.
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
