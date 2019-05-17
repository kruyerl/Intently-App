import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Anchor from '../atoms/Anchor'

const StyledAuth = styled.li`
    margin-left: 16px;
`
const SignedOutNav = () => (
    <>
        <StyledAuth>
            <Anchor mod="" tag="navlink" to="/login">
                Sign in
            </Anchor>
        </StyledAuth>
        <StyledAuth>
            <Anchor mod="" tag="navlink" to="/login/signup">
                Sign up
            </Anchor>
        </StyledAuth>
    </>
)

SignedOutNav.propTypes = {}

export default SignedOutNav
