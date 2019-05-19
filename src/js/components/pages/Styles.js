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

const ActionsContainer = styled.ul`
    padding: 0px;
    margin: 0px;
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
 <br />
            <br />
            <br />
                <Text tag="h1" mod="black">
                    Work on your objectives:
                </Text>
                <Text tag="h2" mod="black">
                    Work on your objectives:
                </Text>
                <Text tag="h3" mod="black">
                    Work on your objectives:
                </Text>
                <Text tag="h4" mod="black">
                    Work on your objectives:
                </Text>
                <Text tag="p" mod="black">
                    Work on your objectives:
                </Text>

        </>
    ) : (
        <div>

            <h1>Loading</h1>
        </div>
    )
}
export default TodayPage
