import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Action from './Action'
import NonDragAction from './NonDragAction'
import AddActionForm from './AddActionForm'
import AppContext from '../../store/context'
import { DELETE_OBJECTIVE, REORDER_ACTION } from '../../store/types'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.grey};
`
const MaxWidth = styled.div`
    padding: 32px 24px;
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

String.prototype.uncapitalizeFirstLetter = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}
const Objective = ({ obj, history }) => {
    const { state, dispatch } = useContext(AppContext)
    const handleDelete = () => {
        dispatch({ type: DELETE_OBJECTIVE, payload: obj.uid })
    }

    const { actions, habits } = state.db
    function countHabits() {
        return habits.filter(habit => habit.objective === obj.uid).length
    }

    const onDragEnd = result => {
        const { destination, source, draggableId } = result
        if (!destination) {
            return
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        // action to move
        const actionToMove = state.db.actions.filter(action => action.uid === draggableId)[0]
        // filtered out current objective
        const otherObjectivesActions = actions.filter(action => action.objective !== obj.uid)
        // current objectives actions
        const objectivesActions = actions.filter(action => action.objective === obj.uid)

        objectivesActions.splice(source.index, 1)
        objectivesActions.splice(destination.index, 0, actionToMove)

        const allActionsOrder = [...objectivesActions, ...otherObjectivesActions]

        dispatch({
            type: REORDER_ACTION,
            payload: allActionsOrder,
        })

        return null
    }
    const achieveObjective = () => {
        // achieve
        history.push(`/objectives/complete/${obj.uid}`)
    }

    return (
        <Container>
            <MaxWidth>
                <Text tag="h3">Regarding my {obj.category}</Text>
                <Text tag="h2">{`I will ${obj.title.uncapitalizeFirstLetter()} by the ${moment(obj.due).format('Do [of] MMMM')}`}</Text>
                <Text tag="p">
                    <strong>This matters to me because {obj.why}</strong>
                </Text>
                <Stats>
                    <Text tag="small">
                        Objective created <strong>{moment({ hours: 0 }).diff(obj.createdAt, 'days') * -1}</strong> days
                        ago.
                    </Text>
                    <Text tag="small">
                        <strong>{moment({ hours: 0 }).diff(obj.due, 'days') * -1}</strong> days left to complete this
                        objective.
                    </Text>
                    <Text tag="small">
                        I have completed <strong>{obj.totalTasks}</strong> tasks.
                    </Text>
                    <Text tag="small">
                        I have finished <strong>{obj.totalHabits}</strong> habits.
                    </Text>
                </Stats>
                <Text tag="h3">These habits will foster the behaviour I need to succeed</Text>


                <ActionBox>
                    {habits &&
                        habits
                            .filter(habit => habit.objective === obj.uid)
                            .map(habit => <NonDragAction key={habit.uid} type="habit" obj={habit} edit />)}
                    {habits && countHabits() < 2 ? <AddActionForm type="habit" objectiveUid={obj.uid} /> : null}
                </ActionBox>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="obj.uid">
                        {provided => (
                            <ActionsContainer ref={provided.innerRef} {...provided.droppableProps}>
                                <Text tag="h3">These are the actions I will take to accomplish my objective</Text>
<Text tag="p" > You can arrange and prioritise these actions by dragging them around</Text>
                                {actions &&
                                    actions
                                        .filter(action => action.objective === obj.uid)
                                        .map((action, index) => (
                                            <Action key={action.uid} index={index} type="action" obj={action} edit />
                                        ))}

                                {provided.placeholder}
                                <AddActionForm type="action" objectiveUid={obj.uid} />
                            </ActionsContainer>
                        )}
                    </Droppable>
                </DragDropContext>

                <ButtonBox>
                    <Button mod="interactive" onClick={achieveObjective}>
                        I achieved this objective
                    </Button>
                    <Button mod="grey" onClick={handleDelete} unactive>
                        I give up
                    </Button>
                </ButtonBox>
            </MaxWidth>
        </Container>
    )
}

Objective.propTypes = {
    obj: PropTypes.object.isRequired,
}

export default Objective
