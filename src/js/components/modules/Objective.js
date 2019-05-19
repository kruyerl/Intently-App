import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Action from './Action'
import AddActionForm from './AddActionForm'
import AppContext from '../../store/context'
import { DELETE_OBJECTIVE } from '../../store/types'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.grey};
`
const MaxWidth = styled.div`
    padding: 54px 24px;
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

const Objective = ({ obj }) => {
    const { state, dispatch } = useContext(AppContext)
    const [habitCount, setHabitCount] = useState(0)
    const handleDelete = () => {
        dispatch({ type: DELETE_OBJECTIVE, payload: obj.uid })
    }

    const { actions, habits } = state.db
    function countHabits() {
        return habits.filter(habit => habit.objective === obj.uid).length
    }
    return (
        <Container>
            <MaxWidth>
                <Text tag="h4">Regarding my health</Text>
                <Text tag="h3">{`I will ${obj.title}`}</Text>
                <Text tag="p">This matters to me because {obj.why}</Text>
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
                <Text tag="h4">These habits will foster the behaviour I need to succeed</Text>

                <ActionBox>
                    {/* TODO: THIS IS WHERE HABITS GO */}
                    {habits &&
                        habits
                            .filter(habit => habit.objective === obj.uid)
                            .map(habit => <Action key={habit.uid} type="habit" obj={habit} edit />)}
                    {habits && countHabits() < 2 ? <AddActionForm type="habit" objectiveUid={obj.uid} /> : null}
                </ActionBox>

                <ActionsContainer>
                    <Text tag="h4">These are the actions I will take to accomplish my objective</Text>
                    {actions &&
                        actions
                            .filter(action => action.objective === obj.uid)
                            .map(action => <Action key={action.uid} type="action" obj={action} edit />)}

                    <AddActionForm type="action" objectiveUid={obj.uid} />
                </ActionsContainer>

                <ButtonBox>
                    <Button mod="interactive">I achieved this objective</Button>
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
