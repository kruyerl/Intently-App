import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Anchor from '../atoms/Anchor'
import AppContext from '../../store/context'
import { LOGOUT_USER } from '../../store/types'

const StyledAuth = styled.li`
    margin-left: 16px;
    line-height: 0.9;
`
const StyledAnchor = styled(Anchor)`
    margin: 0px;
    line-height: 1;
`
const Icon = styled.i`
    line-height: 0.95;
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
                <Anchor mod="" tag="navlink" to="/reviews">
                    Reviews
                </Anchor>
            </StyledAuth>
            <StyledAuth>
                <Anchor mod="" tag="navlink" to="/tasks">
                    Tasks
                </Anchor>
            </StyledAuth>
            <StyledAuth>
                <StyledAnchor mod="" tag="link" to="/" onClick={handleLogout}>
                    <Icon className="material-icons">exit_to_app</Icon>
                </StyledAnchor>
            </StyledAuth>
        </>
    )
}
SignedInNav.propTypes = {}

export default SignedInNav
