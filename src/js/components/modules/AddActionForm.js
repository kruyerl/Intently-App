import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import AppContext from '../../store/context'
import { ADD_TASK, ADD_HABIT, ADD_ACTION } from '../../store/types'

const ActionFormButton = styled.button`
    margin: 6px;
    border: 0px;
    transform: rotate(45deg);
    font-weight: bolder;
    height: 26px;
    width: 26px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.layout.grey};
    color: ${props => props.theme.colors.interactive.base};
    outline: none;
    margin-right: 12px;
    &:hover {
        ${props => props.theme.shadows.active};
        transition: all 300ms ease-in-out;
    }
`
const ActionFormInput = styled.input`
    width: 100%;
    outline: none;
    padding: 8px 0;
    background: transparent;
    border: 0px;
    border-bottom: 1px solid ${props => rgba(props.theme.colors.layout.black, 0.2)};
    transition: all 300ms ease-in-out;

    &:hover,
    &:focus,
    &:active {
        transition: all 300ms ease-in-out;
        border-bottom: 1px solid ${props => rgba(props.theme.colors.interactive.base, 1)};
    }
`
const ActionForm = styled.form`
    max-width: 300px;
    display: flex;
    flex-direction: row;
    margin: 8px 0;
`

const AddActionForm = ({ type, objectiveUid }) => {
    const { state, dispatch } = useContext(AppContext)
    const [formState, setFormState] = useState({
        value: '',
    })

    function getType(typeOf) {
        switch (typeOf) {
            case 'habit':
                return ADD_HABIT
            case 'task':
                return ADD_TASK
            case 'action':
                return ADD_ACTION
            default:
                break
        }
    }

    function onChange(e) {
        e.preventDefault()
        setFormState({ value: e.target.value })
    }
    function onSubmit(e) {
        e.preventDefault()
        const switchedType = getType(type)
        dispatch({
            type: switchedType,
            payload: {
                value: formState.value,
                objectiveUid,
            },
        })
        setFormState({ value: '' })
    }

    return state ? (
        <ActionForm noValidate onSubmit={onSubmit}>
            <ActionFormButton type="submit">✕</ActionFormButton>
            <ActionFormInput
                value={formState.value}
                onChange={onChange}
                type="text"
                name="value"
                id="ActionFormInput"
            />
        </ActionForm>
    ) : (
        <></>
    )
}

AddActionForm.propTypes = {
    type: PropTypes.string.isRequired,
    objectiveUid: PropTypes.string,
}

export default AddActionForm
