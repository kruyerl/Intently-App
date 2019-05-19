import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import SidekickHeader from '../modules/SidekickHeader'
import AppContext from '../../store/context'
import QuoteBar from '../modules/QuoteBar'
import ObjectivesTabs from '../organisms/ObjectivesTabs'
import ObjectivesContainer from '../organisms/ObjectivesContainer'
import NoObjective from '../modules/NoObjective'
import Objective from '../modules/Objective'

const ObjectivesPage = props => {
    const { state, dispatch } = useContext(AppContext)

    return state && state.ui.authenticated === true ? (
        <>
            <SidekickHeader textMain="Main Objectives" textSub="Whether you’re planning out your next career project, your fitness goals, or your new business, we'd love to help you be intentional about it." />
            {/* <QuoteBar /> */}
            <ObjectivesTabs {...props} />
            <ObjectivesContainer {...props} />
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

ObjectivesPage.propTypes = {}

export default ObjectivesPage
