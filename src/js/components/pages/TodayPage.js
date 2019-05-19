/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import NonDragAction from '../modules/NonDragAction'
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

const ActionsContainer = styled.ul`
    padding: 0px;
    margin: 0px;
    margin-top: 30px;
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
            <HeroHeader capitalize h1={state.user !== undefined && `Welcome ${displayName}`}>
                <Text tag="h3" mod="black">
                    Work on your objectives:
                </Text>
                <ActionsContainer>
                    {actions &&
                        pickTopActionItems(objectives, actions).map(action => (
                            <NonDragAction key={action.uid} type="action" obj={action} />
                        ))}
                    {actions && actions.length === 0 ? (
                        <>
                            <Text tag="p" mod="brand">
                                The next actions of each of your objectives show up here everyday
                            </Text>
                            <br />
                            <Button mod="interactive">Set an objective</Button>
                        </>
                    ) : null}
                </ActionsContainer>
            </HeroHeader>
            <Commitments />
            <Tasks number={4} />
            <FooterCTA
                heading="Did you do your best today to serve yourself, my friends, family & your community"
                subheading="If not, make sure to do better tomorrow"
            >
                <StyledButtonContainer>
                    <StyledButton mod="interactive" active>
                        I did my best
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
