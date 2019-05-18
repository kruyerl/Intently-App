import React, { useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import Text from '../atoms/Text'
import AppContext from '../../store/context'
import { UPDATE_TASK, DELETE_TASK } from '../../store/types'

const Container = styled.section`
    padding: 8px;
    background: ${props => rgba(props.theme.colors.brand.base, 0)};
    border-top: 1px solid ${props => rgba(props.theme.colors.layout.grey, 0.5)};
    border-bottom: 1px solid ${props => rgba(props.theme.colors.layout.grey, 0.5)};

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
    color: ${props => rgba(props.theme.colors.layout.black, 0.5)};
    margin-left: 12px;

    transition: all 300ms cubic-bezier(0.66, 0.01, 0.43, 1.01);
    &:hover {
        color: ${props => rgba(props.theme.colors.interactive.base, 0.9)};
        cursor: pointer;
    }
    opacity: 0.2;
    ${Container}:hover & {
        opacity: 1;
    }
`
const Checkbox = styled.div`
    margin: 0px;
    padding: 8px;
    width: 24px;
    height: 24px;

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

const Action = ({ checked, body, index, edit }) => {
    const {
        state: {
            db: { tasks },
        },
        dispatch,
    } = useContext(AppContext)

    const handleCheck = e => {
        const thisTask = tasks.filter(task => task.uid === index)[0]
        thisTask.complete = !thisTask.complete
        dispatch({
            type: UPDATE_TASK,
            payload: {
                value: thisTask,
                dispatch,
            },
        })
    }
    const handleDelete = e => {
        e.preventDefault()
        const thisTask = tasks.filter(task => task.uid === index)[0]
        dispatch({
            type: DELETE_TASK,
            payload: {
                value: thisTask,
                dispatch,
            },
        })
    }

    return tasks ? (
        <Container>
            <Task onClick={handleCheck}>
                <Checkbox checked={checked} />

                <Description tag="p" checked={checked}>
                    {body && body}
                </Description>
            </Task>
            {edit && (
                <Tools>
                    <li>
                        <Tool>✎</Tool>
                    </li>
                    <li>
                        <Tool onClick={handleDelete}>×</Tool>
                    </li>
                </Tools>
            )}
        </Container>
    ) : null
}

Action.propTypes = {}

export default Action
