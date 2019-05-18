import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Text from '../atoms/Text'

//! Styles:
const Styled = styled(Text)`
    color: blank;
`

//! Component:
export const Loader = ({ tag }) => {
    const [state, setState] = useState('')
    useEffect(() => {
        setTimeout(() => {
            if (state === '...') {
                setState('')
            } else setState(`${state}.`)
        }, 300)
    }, [state])

    return <Styled tag="h4" mod="black">{`Loading${state}`}</Styled>
}

Loader.propTypes = {}
