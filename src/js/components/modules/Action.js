import React, { useContext, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import { Draggable } from 'react-beautiful-dnd'
import Text from '../atoms/Text'
import AppContext from '../../store/context'
import { UPDATE_TASK, DELETE_TASK, UPDATE_HABIT, DELETE_HABIT, UPDATE_ACTION, DELETE_ACTION } from '../../store/types'
import { Input } from '../atoms/Form'

const Container = styled.form`
    padding: 8px;
    background: ${props => rgba(props.theme.colors.brand.base, 0)};
    border-top: 1px solid ${props => rgba(props.theme.colors.layout.grey, 0.5)};
    border-bottom: 1px solid ${props => rgba(props.theme.colors.layout.grey, 0.5)};
    outline: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    &:hover {
        transition: all 300ms cubic-bezier(0.66, 0.01, 0.43, 1.01);
        background: ${props => rgba(props.theme.colors.brand.base, 0.02)};
        border-top: 1px solid ${props => rgba(props.theme.colors.layout.grey, 1)};
        border-bottom: 1px solid ${props => rgba(props.theme.colors.layout.grey, 1)};
    }
`
const Task = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
`

const Tools = styled.ul`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    margin: 0px;
    padding: 0px;
`
const Tool = styled.a`
    font-size: 24px !important;
    color: ${props => rgba(props.theme.colors.layout.black, 0.4)};
    margin-left: 12px;

    transition: all 600ms ease-in-out;
    &:hover {
        color: ${props => rgba(props.theme.colors.interactive.base, 0.9)};
        cursor: pointer;
    }
    opacity: 0.2;
    ${Container}:hover & {
        opacity: 1;
    }
`
const Save = styled(Tool)`
    color: ${props => rgba(props.theme.colors.brand.base, 0.8)};
    &:hover {
        color: ${props => rgba(props.theme.colors.interactive.base, 0.9)};
        cursor: pointer;
    }
`
const Checkbox = styled.a`
    margin: 0px;
    padding: 8px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    background: ${props => props.theme.colors.layout.grey};
    border: 1px solid grey;
    border-radius: 12px;
    transition: all 300ms cubic-bezier(0.66, 0.01, 0.43, 1.01);
    ${props => props.theme.shadows.z1};
    &:hover {
        ${props => props.theme.shadows.z2};
        transition: all 300ms cubic-bezier(0.66, 0.01, 0.43, 1.01);
    }
    ${props =>
        !props.checked
            ? `
            background-color: ${props.theme.colors.layout.grey};
        `
            : `
        background-color: ${props.theme.colors.interactive.base};
        `}
`
const Description = styled(Text)`
outline: 0px;
    margin: 0px 16px;
    flex: 1;
    transition: all 300ms cubic-bezier(0.66, 0.01, 0.43, 1.01);
    ${props =>
        props.checked
            ? `
            color: ${rgba(props.theme.colors.layout.black, 0.3)};
            text-decoration: line-through;
        `
            : `
        color: ${rgba(props.theme.colors.layout.black, 1)};
        `}
`
const Icon = styled.i`
    font-size: 18px;
`
const StyledInput = styled(Input)`
    font: 300 14px 'worksans-regular', sans-serif;
    margin: 0px;
    width: 100%;
`

const Action = ({ type, obj, edit, index }) => {
    const {
        state: { db },
        dispatch,
    } = useContext(AppContext)

    const [actionState, setActionState] = useState({
        value: obj.body,
        edit: false,
    })
    function toggleEdit() {
        setActionState({
            ...actionState,
            edit: !actionState.edit,
        })
    }
    function onEdit(e) {
        setActionState({
            ...actionState,
            value: e.target.value,
        })
    }
    function onSave(e) {
        e.preventDefault()
        const updateType = getType(type)
        const itemToCheck = db[`${type}s`].filter(item => item.uid === obj.uid)[0]
        itemToCheck.body = actionState.value
        setActionState({
            ...actionState,
            edit: false,
        })
        dispatch({
            type: updateType,
            payload: {
                value: itemToCheck,
                updateType: 'edit',
            },
        })
    }
    function getType(typeOf) {
        switch (typeOf) {
            case 'habit':
                return UPDATE_HABIT
            case 'task':
                return UPDATE_TASK
            case 'action':
                return UPDATE_ACTION
            default:
                break
        }
    }
    function getDeleteType(typeOf) {
        switch (typeOf) {
            case 'habit':
                return DELETE_HABIT
            case 'task':
                return DELETE_TASK
            case 'action':
                return DELETE_ACTION
            default:
                break
        }
    }

    const handleCheck = () => {
        const updateType = getType(type)
        const itemToCheck = db[`${type}s`].filter(item => item.uid === obj.uid)[0]
        itemToCheck.complete = !itemToCheck.complete
        const completed = itemToCheck.complete === true ? 'completed' : 'uncompleted'
        dispatch({
            type: updateType,
            payload: {
                value: itemToCheck,
                updateType: completed,
            },
        })
    }
    const handleDelete = e => {
        const deleteType = getDeleteType(type)
        e.preventDefault()
        const itemToDelete = db[`${type}s`].filter(item => item.uid === obj.uid)[0]
        dispatch({
            type: deleteType,
            payload: itemToDelete.uid,
        })
    }

    return db ? (
        <Draggable draggableId={obj.uid} index={index} onSubmit={onSave}>
            {provided => (
                <Container {...provided.draggableProps} ref={provided.innerRef} onSubmit={onSave}>
                    {actionState.edit === false && ( <Checkbox checked={obj.complete} onClick={handleCheck} />)}
                    <Task {...provided.dragHandleProps}>
                        {actionState.edit === true ? (
                            <StyledInput value={actionState.value} onChange={onEdit} />
                        ) : (
                            <>

                                <Description tag="small" checked={obj.complete}>
                                    {obj.body && obj.body}
                                </Description>
                            </>
                        )}
                    </Task>
                    {edit && (
                        <Tools>
                            {actionState.edit === true ? (
                                <li>
                                    <Save onClick={onSave}>
                                        <Icon className="material-icons">save</Icon>
                                    </Save>
                                </li>
                            ) : (
                                <li>
                                    <Tool onClick={toggleEdit}>
                                        <Icon className="material-icons">create</Icon>
                                    </Tool>
                                </li>
                            )}
                            <li>
                                <Tool onClick={handleDelete}>
                                    <Icon className="material-icons">clear</Icon>
                                </Tool>
                            </li>
                        </Tools>
                    )}
                </Container>
            )}
        </Draggable>
    ) : null
}

Action.propTypes = {
    type: PropTypes.string.isRequired,
    index: PropTypes.number,
    obj: PropTypes.object.isRequired,
    edit: PropTypes.bool,
}

export default Action
