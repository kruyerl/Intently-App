import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

//! Styles:
const Styled = styled.p`
    color: red;
`

//! Component:
const StatelessTemplate = props => (
    <>
        <Styled>This is a Stateless Component</Styled>
    </>
)

StatelessTemplate.propTypes = {}

export default StatelessTemplate
