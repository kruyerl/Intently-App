import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

//! Styles:
const Styled = styled.h1`
    color: red;
`

//! Component:
const NotFoundPage = () => (
    <>
        <br />
        <br />
        <br />
        <Styled>NotFound</Styled>
    </>
)

NotFoundPage.propTypes = {}

export default NotFoundPage
