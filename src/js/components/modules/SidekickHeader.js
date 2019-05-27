import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { linearGradient } from 'polished'
import Text from '../atoms/Text'


const HeroContainer = styled.header`
    ${'' /* background: url(${props => (props.backgroundImg ? props.backgroundImg : background)}); */}
    ${props =>
        linearGradient({
            colorStops: [`${props.theme.colors.interactive.base} 0%`, `${props.theme.colors.layout.light} 75%`],
            toDirection: 'to bottom right',
            fallback: '#FFF',
        })}
        background-size: cover;
    background-position: center;
    width: 100%;

    padding: 100px 0px 3 0px 0px;
    @media (max-width: ${props => props.theme.screens.mobile}) {
        ${'' /* background: none; */}
    }
    span {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        margin: 0 auto;
        max-width: ${props => props.theme.screens.desktop};
        min-height: 300px;
    }
`
const IntroTextBox = styled.div`
    margin: 24px;
`
const Heading = styled(Text)`
    ${props => (props.capitalize ? `text-transform: capitalize` : null)}
`
const SubHeading = styled(Text)`
    ${props => (props.capitalize ? `text-transform: capitalize` : null)}
    max-width: ${props => props.theme.screens.mobile};
`

const SidekickHeader = ({ backgroundImg, children, textMain, textSub, capitalize }) => (
    <HeroContainer>
        <span>
            <IntroTextBox>
                <Heading capitalize={capitalize} tag="h2" mod="brand">
                    {textMain}
                </Heading>
                <SubHeading tag="p" mod="black">
                    {textSub}
                </SubHeading>
            </IntroTextBox>
        </span>
    </HeroContainer>
)

export default SidekickHeader
