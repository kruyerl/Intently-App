/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Anchor from '../atoms/Anchor'
import NonDragAction from '../modules/NonDragAction'
import HeroHeader from '../modules/HeroHeader'
import QuoteBar from '../modules/QuoteBar'
import Commitments from '../organisms/Commitments'
import Tasks from '../organisms/Tasks'
import AppContext from '../../store/context'
import { GrandLoader } from '../modules/Loader'
import AfterActionReviews from '../modules/AfterActionReviews'
import moment from 'moment'

const ActionsContainer = styled.ul`
    padding: 0px;
    margin: 0px;
    margin-top: 24px;
    max-width: ${props => props.theme.screens.tablet};
`

const TodayPage = props => {
    const { state } = useContext(AppContext)
    const { actions, objectives } = state.db
    const { displayName } = state.user

    const pickTopActionItems = (objectiveArr, actionArr) => {
        //filter out actions completed && lastcompleted before yesterday
        const chosenActions = actionArr.filter(action=>{

            if (action.lastComplete === null ){
                return true
            }
            if (moment({ hours: 0 }).diff(action.lastComplete, 'days') <= 0 ){
                return true
            }
        })



        let objectiveUids = objectiveArr.map(objctv => objctv.uid)
        const pickedActions = []
        chosenActions.forEach(action => {
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
                                The next steps to achieving amazing things happen and making your dreams a reality will appear here after you set them up in your objectives.
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
            <AfterActionReviews {...props} />
            <QuoteBar />
        </>
    ) : (
        <GrandLoader />
    )
}
export default TodayPage
