/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import Button from '../atoms/Button'
import AppContext from '../../store/context'
import { UNDO_DATA, CANCEL_UNDO_DATA } from '../../store/types'

const UndoButton = styled(Button)`
    position: fixed;
    bottom: 16px;
    right: 16px;
    padding: 8px 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    ${props => props.theme.shadows.z2};
    &:hover {
        ${props => props.theme.shadows.active};
        background: ${props => props.theme.colors.layout.grey};
    }
`
const Icon = styled.i`
    line-height: 0.95;
    margin-right: 8px;
`
const Undo = () => {
    const { state, dispatch } = useContext(AppContext)

    const {
        ui: { undoAble },
    } = state

    function onClick(e) {
        e.preventDefault()
        console.log('undoing')
        dispatch({
            type: UNDO_DATA,
        })
    }
    useEffect(() => {
        if (undoAble === true) {
            setTimeout(() => {
                dispatch({
                    type: CANCEL_UNDO_DATA,
                })
            }, 5000)
        }
    }, [undoAble])

    return state && undoAble ? (
        <UndoButton onClick={onClick} mod="white">
            <Icon className="material-icons">undo</Icon> Undo
        </UndoButton>
    ) : (
        <></>
    )
}
export default Undo
