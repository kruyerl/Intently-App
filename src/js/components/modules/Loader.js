import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Text from '../atoms/Text'
import logo from '../../../assets/img/logo.svg'
//! Styles:
const Container = styled.section`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.layout.white};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    flex-direction: column;
    div {
        img {
            width: 240px;
        }
        max-width: 45px;
        overflow: hidden;
    }
`
const Styled = styled(Text)`
    color: blank;
    text-align: ${props => {
        if (props.align === 'left') return 'left'
        if (props.align === 'center') return 'center'
        return 'right'
    }};
`

//! Component:
export const Loader = ({ tag, align }) => {
    const [state, setState] = useState('')
    useEffect(() => {
        setTimeout(() => {
            if (state === '....') {
                setState('')
            } else setState(`${state}.`)
        }, 500)
    }, [state])

    return <Styled tag={(tag && tag) || 'h4'} align={align} mod="brand">{`Loading${state}`}</Styled>
}

export const GrandLoader = ({ tag, align }) => {
    const [state, setState] = useState('')
    useEffect(() => {
        setTimeout(() => {
            if (state === '...') {
                setState('')
            } else setState(`${state}.`)
        }, 300)
    }, [state])

    return (
        <Container>
            <div>
                <img src={logo} alt="Logo for Intently" />
            </div>
            <Styled tag={(tag && tag) || 'h3'} align={align} mod="brand">{`Loading${state}`}</Styled>
        </Container>
    )
}
