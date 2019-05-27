import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { linearGradient } from 'polished'
import Text from '../atoms/Text'

const HeroContainer = styled.header`
    ${'' /* background: url(${props => (props.backgroundImg ? props.backgroundImg : background)}); */}
    ${props =>
        linearGradient({
            colorStops: [`${props.theme.colors.interactive.light} 0%`, `${props.theme.colors.interactive.dark} 75%`],
            toDirection: 'to bottom right',
            fallback: '#FFF',
        })}
        background-size: cover;
    background-size: cover;
    background-position: right;
    width: 100%;

    padding: 120px 0px 60px 0px;
    @media (max-width: ${props => props.theme.screens.tablet}) {
        padding: 100px 0px 0px 0px;
    }
    span {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin: 0 auto;
        max-width: ${props => props.theme.screens.desktop};
    }
`
const IntroTextBox = styled.div`
    margin: 0px 0px 0px 24px;
`
const Heading = styled(Text)`
    ${props => (props.capitalize ? `text-transform: capitalize` : null)}
`
const WhiteBlock = styled.div`
    background: ${props => props.theme.colors.layout.white};
    max-width: 600px;
    padding: 24px;
    padding-left: 24px;
    margin-top: 24px;
    margin-right: 24px;
    width: 100%;

    @media (max-width: ${props => props.theme.screens.tablet}) {
        margin-right: 0px;
        padding-bottom: 40px;
        max-width: 100%;
    }
`

const HeroHeader = ({ backgroundImg, children, h1, h2, capitalize }) => (
    <HeroContainer>
        <span>
            <IntroTextBox>
                <Heading capitalize={capitalize} tag="h2" mod="brand">
                    {h1 || 'Welcome back'}
                </Heading>
                <Text tag="h1" mod="brand">
                    {h2 || 'Todays focus'}
                </Text>
            </IntroTextBox>
            <WhiteBlock>{children}</WhiteBlock>
        </span>
    </HeroContainer>
)

export default HeroHeader
