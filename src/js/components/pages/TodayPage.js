/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Anchor from '../atoms/Anchor'
import NonDragAction from '../modules/NonDragAction'
import HeroHeader from '../modules/HeroHeader'
import QuoteBar from '../modules/QuoteBar'
import Commitments from '../organisms/Commitments'
import FooterCTA from '../organisms/FooterCTA'
import Tasks from '../organisms/Tasks'
import AppContext from '../../store/context'
import { GrandLoader } from '../modules/Loader'

const StyledButton = styled(Button)`
    margin-right: 16px;
`
const StyledButtonContainer = styled.div`
    margin-bottom: 24px;
`

const ActionsContainer = styled.ul`
    padding: 0px;
    margin: 0px;
    margin-top: 24px;
    max-width: ${props => props.theme.screens.tablet};
`

const TodayPage = () => {
    const { state } = useContext(AppContext)
    const { actions, objectives } = state.db
    const { displayName } = state.user

    const pickTopActionItems = (objectiveArr, actionArr) => {
        let objectiveUids = objectiveArr.map(objctv => objctv.uid)
        const pickedActions = []
        actionArr.forEach(action => {
            if (objectiveUids.includes(action.objective)) {
                pickedActions.push(action)
                objectiveUids = objectiveUids.filter(uid => uid !== action.objective)
            }
        })
        return pickedActions
    }

    return state && state.ui.authenticated === true ? (
        <>
            <HeroHeader capitalize h1={state.user !== undefined && `Welcome ${displayName || ''}`}>
                <Text tag="h3" mod="brand">
                    Work on your objectives:
                </Text>
                <ActionsContainer>
                    {objectives &&
                        pickTopActionItems(objectives, actions).map(action => (
                            <NonDragAction key={action.uid} type="action" obj={action} />
                        ))}
                    {objectives && actions.length < 1 ? (
                        <>
                            <Text tag="p" mod="black">
                                The next actions of each of your objectives show up here everyday
                            </Text>
                            <Anchor tag="link" to="/objectives">
                                <Button mod="brand">Set an objective</Button>
                            </Anchor>
                        </>
                    ) : null}
                </ActionsContainer>
            </HeroHeader>
            <Commitments />
            <Tasks number={4} />
            <FooterCTA
                heading="Do your best today to serve yourself, your friends, family & your community"
                subheading="Let's debrief & review the day."
            >
                <StyledButtonContainer>
                    <StyledButton mod="brand" active>
                        Review the day
                    </StyledButton>
                </StyledButtonContainer>
            </FooterCTA>
            <QuoteBar />
        </>
    ) : (
        <GrandLoader />
    )
}
export default TodayPage
