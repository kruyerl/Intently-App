import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

//! Styles:
const Styled = styled.p`
    color: red;
`

//! Component:
const StatefullTemplate = props => {
    useEffect(() => {}, [])

    return (
        <>
            <Styled>This is a Stateless Component</Styled>
        </>
    )
}

StatefullTemplate.propTypes = {}

export default StatefullTemplate
