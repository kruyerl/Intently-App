import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Anchor from '../atoms/Anchor'
import AppContext from '../../store/context'
import { LOGOUT_USER } from '../../store/types'

const StyledAuth = styled.li`
    margin-left: 16px;
`
const SignedInNav = () => {
    const { dispatch } = useContext(AppContext)

    const handleLogout = e => {
        e.preventDefault()
        dispatch({
            type: LOGOUT_USER,
            payload: { dispatch },
        })
    }

    return (
        <>
            <StyledAuth>
                <Anchor mod="" tag="navlink" to="/today">
                    Today
                </Anchor>
            </StyledAuth>
            <StyledAuth>
                <Anchor mod="" tag="navlink" to="/objectives">
                    Objectives
                </Anchor>
            </StyledAuth>
            <StyledAuth>
                <Anchor mod="" tag="navlink" to="/other">
                    Other actions
                </Anchor>
            </StyledAuth>
            <StyledAuth>
                <Anchor mod="" tag="a" onClick={handleLogout}>
                    Sign out
                </Anchor>
            </StyledAuth>
        </>
    )
}
SignedInNav.propTypes = {}

export default SignedInNav
