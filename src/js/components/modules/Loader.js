import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Text from '../atoms/Text'

//! Styles:
const Styled = styled(Text)`
    color: blank;
`

//! Component:
export const Loader = ({ tag }) => {
    const [state, setState] = useState('')
    useEffect(() => {
        setTimeout(() => {
            if (state === '...') {
                setState('')
            } else setState(`${state}.`)
        }, 300)
    }, [state])

    return <Styled tag="h4" mod="black">{`Loading${state}`}</Styled>
}

const GrandContainer = styled.div`
    postion: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: ${props => props.theme.colors.layout.white};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const StyledGrandLoader = styled(Text)``
export const GrandLoader = ({ tag }) => {
    const [state, setState] = useState('')
    useEffect(() => {
        setTimeout(() => {
            if (state === '...') {
                setState('')
            } else setState(`${state}.`)
        }, 300)
    }, [state])

    return (
        <GrandContainer>
            <GrandLoader tag="h2" mod="brand">{`Loading${state}`}</GrandLoader>
        </GrandContainer>
    )
}

Loader.propTypes = {}
