import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'

import background from '../../../assets/img/signupBackground2.png'

const HeroContainer = styled.header`
    background: url(${props => (props.backgroundImg ? props.backgroundImg : background)});
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
    margin: 0px 0px 0px 32px;
`
const Heading = styled(Text)`
    ${props => (props.capitalize ? `text-transform: capitalize` : null)}
`
const WhiteBlock = styled.div`
    background: ${props => props.theme.colors.layout.white};
    max-width: 600px;
    padding: 24px;
    padding-left: 32px;
    margin-top: 24px;
    margin-right: 24px;
    width: 100%;
    @media (max-width: ${props => props.theme.screens.tablet}) {
        margin-right: 0px;
        padding-bottom: 40px;
    }
`

const HeroHeader = ({ backgroundImg, children, h1, h2, capitalize }) => (
    <HeroContainer>
        <span>
            <IntroTextBox>
                <Heading capitalize={capitalize} tag="h1" mod="black">
                    {h1 || 'Alright Luke'}
                </Heading>
                <Text tag="h2" mod="black">
                    {h2 || "It's time to be intentional"}
                </Text>
            </IntroTextBox>
            <WhiteBlock>{children}</WhiteBlock>
        </span>
    </HeroContainer>
)

export default HeroHeader
