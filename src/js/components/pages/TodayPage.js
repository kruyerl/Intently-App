/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Action from '../modules/Action'
import HeroHeader from '../modules/HeroHeader'
import QuoteBar from '../modules/QuoteBar'
import Commitments from '../organisms/Commitments'
import FooterCTA from '../organisms/FooterCTA'
import Tasks from '../organisms/Tasks'
import AppContext from '../../store/context'

const StyledButton = styled(Button)`
    margin-right: 16px;
`
const StyledButtonContainer = styled.div`
    margin-bottom: 30px;
`

const TodayPage = () => {
    const { state } = useContext(AppContext)

    return state && state.ui.authenticated === true ? (
        <>
            <HeroHeader capitalize h1="Welcome NAME">
                <Text tag="h3" mod="black">
                    Todays main focus:
                </Text>
                <div />
            </HeroHeader>
            <QuoteBar />
            <Commitments />
            <Tasks number={4} />
            <FooterCTA h4="Did I do my best today to serve myself, my friends, family & my community">
                <StyledButtonContainer>
                    <StyledButton mod="interactive" active>
                        I did my best
                    </StyledButton>
                    <StyledButton mod="white" unactive>
                        I could have done more
                    </StyledButton>
                </StyledButtonContainer>
            </FooterCTA>
        </>
    ) : (
        <div>
            <br />
            <br />
            <br />
            <h1>Loading</h1>
        </div>
    )
}
export default TodayPage
