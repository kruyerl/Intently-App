/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import AppContext from '../../store/context'
import Text from '../atoms/Text'

const StyledBar = styled.article`
    background-color: ${props => props.theme.colors.brand.base};
    padding: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    * {
        margin: 0px;
    }
`

const QuoteBar = () => {
    const {
        state: { quotes },
        dispatch,
    } = useContext(AppContext)

    const [state, setState] = useState({
        quote: '',
    })
    useEffect(() => {
        setState({
            quote: getRandomQuote(quotes),
        })
    }, [])

    const getRandomQuote = quotesArr => {
        const length = quotesArr.length - 1
        const index = Math.floor(Math.random() * Math.floor(length))
        return quotesArr[index]
    }

    return (
        <StyledBar>
            <Text tag="p" mod="white" align="center">
                {state.quote}
            </Text>
        </StyledBar>
    )
}

QuoteBar.propTypes = {}

export default QuoteBar
