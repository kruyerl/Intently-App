import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import HeroHeader from '../modules/HeroHeader'
import AppContext from '../../store/context'
import QuoteBar from '../modules/QuoteBar'
import ObjectivesTabs from './ObjectivesTabs'
import NoObjective from '../modules/NoObjective'
import Objective from '../modules/Objective'

const ObjectivesContainer = props => {
    const { state, dispatch } = useContext(AppContext)
    const {
        db: { objectives },
    } = state
    const { params } = props.match

    const x = objectives.filter(objective => objective.category === params.id)

    if (x.length > 0) return x.map(obj => <Objective key={obj.uid} obj={obj} />)
    return <NoObjective {...props} />
}

ObjectivesContainer.propTypes = {}

export default ObjectivesContainer
