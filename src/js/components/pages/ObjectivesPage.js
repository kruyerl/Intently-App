import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import HeroHeader from '../modules/HeroHeader'

import QuoteBar from '../modules/QuoteBar'

const ObjectivesPage = () => (
    <>
        <HeroHeader h1="These are my Objectives" h2="I will be intentional in their persuit">
            <Text tag="h4" mod="black">
                Consistency beats intensity every time. I will be consistent & impactuful
            </Text>
        </HeroHeader>
        <QuoteBar />
    </>
)

ObjectivesPage.propTypes = {}

export default ObjectivesPage
