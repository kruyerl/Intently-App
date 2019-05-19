import React, { useContext } from 'react'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Text from '../atoms/Text'
import SidekickHeader from '../modules/SidekickHeader'
import FooterCTA from '../organisms/FooterCTA'
import Action from '../modules/Action'
import AddActionForm from '../modules/AddActionForm'
import AppContext from '../../store/context'
import Loader from '../modules/Loader'
import { REORDER_TASK } from '../../store/types'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.white};
`
const MaxWidth = styled.div`
    padding: 54px 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
`
const ActionsContainer = styled.div`
    padding: 0px;
    margin: 0px;
    margin-top: 30px;
    max-width: ${props => props.theme.screens.tablet};
`

const TaskPage = () => {
    const { state, dispatch } = useContext(AppContext)

    const onDragEnd = result => {
        console.log('dropped', result)
        const { destination, source, draggableId } = result
        if (!destination) {
            return
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }
        const taskToMove = state.db.tasks.filter(task => task.uid === draggableId)[0]
        const column = state.db.tasks
        const newTaskOrder = Array.from(column)
        newTaskOrder.splice(source.index, 1)
        newTaskOrder.splice(destination.index, 0, taskToMove)

        dispatch({
            type: REORDER_TASK,
            payload: newTaskOrder,
        })

        return null
    }

    return state && state.ui.authenticated === true ? (
        <>
            <SidekickHeader
                textMain="Other Actions"
                textSub="Its easy to be busy. I will prioritise & execute with my objectives in mind"
            />

            <Container>
                <MaxWidth>
                    <Text tag="h3" mod="black">
                        These are the tasks that need to get done but aren't crucial to achieving your objectives.
                    </Text>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="taskPage">
                            {provided => (
                                <ActionsContainer ref={provided.innerRef} {...provided.droppableProps}>
                                    {state && state.db.tasks ? (
                                        state.db.tasks.map((task, mapIndex) => (
                                            <Action key={task.uid} index={mapIndex} type="task" obj={task} edit />
                                        ))
                                    ) : (
                                        <Loader tag="p" />
                                    )}

                                    {provided.placeholder}
                                    <AddActionForm type="task" />
                                </ActionsContainer>
                            )}
                        </Droppable>
                    </DragDropContext>
                </MaxWidth>
            </Container>
            <FooterCTA h4="Being busy doesn't mean I am being effective. I must prioritise and execute" />
        </>
    ) : null
}

export default TaskPage
