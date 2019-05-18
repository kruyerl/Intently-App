import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import HeroHeader from '../modules/HeroHeader'
import AppContext from '../../store/context'
import QuoteBar from '../modules/QuoteBar'

const ObjectivesPage = () => {

    const { state, dispatch } = useContext(AppContext)

    return state && (state.ui.authenticated === true) ? (
    <>
        <HeroHeader h1="These are my Objectives" h2="I will be intentional in their persuit">
            <Text tag="h4" mod="black">
                Consistency beats intensity every time. I will be consistent & impactuful
            </Text>
        </HeroHeader>
        <QuoteBar />
    </>
) : <div><br /><br /><br /><h1>Loading</h1></div>}

ObjectivesPage.propTypes = {}

export default ObjectivesPage
