import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledAuth = styled.section`
    background-color: ${props => props.theme.colors.layout.white};
    max-width: 400px;
    width: 100%;

    padding: 40px 24px 24px 24px;
    border-radius: 2px;
    ${props => props.theme.shadows.z1};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`
const AuthModule = ({ children }) => <StyledAuth>{children}</StyledAuth>

AuthModule.propTypes = {
    children: PropTypes.node,
}

export default AuthModule
