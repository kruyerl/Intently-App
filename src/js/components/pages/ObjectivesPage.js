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
import { GrandLoader } from '../modules/Loader'

const ObjectivesPage = props => {
    const { state, dispatch } = useContext(AppContext)

    return state && state.ui.authenticated === true ? (
        <>
            <SidekickHeader
                textMain="Main Objectives"
                textSub="Whether you’re wanting to lose a few pounds, stay in touch with old friends or take your career to the next level, we'd love to help you be intentional about achieving your dreams."
            />
            <ObjectivesTabs {...props} />
            <ObjectivesContainer {...props} />
            <QuoteBar />
        </>
    ) : (
        <GrandLoader />
    )
}

ObjectivesPage.propTypes = {}

export default ObjectivesPage
