import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'

import background from '../../../assets/img/signupBackground2.png'

const HeroContainer = styled.header`
    background: url(${props => (props.backgroundImg ? props.backgroundImg : background)});
    background-size: cover;
    background-position: center;
    width: 100%;

    padding: 120px 0px 60px 0px;

    span {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin: 0 auto;
        max-width: ${props => props.theme.screens.desktop};
        min-height: 300px;
    }
`
const IntroTextBox = styled.div`
    margin: 0px 0px 0px 32px;
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
