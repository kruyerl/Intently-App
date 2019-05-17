/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
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
import { LOAD_USERDATA, SET_NAME, POST_DATA } from '../../store/types'

const StyledButton = styled(Button)`
    margin-right: 16px;
`
const StyledButtonContainer = styled.div`
    margin-bottom: 30px;
`

const TodayPage = () => {
    const { state, dispatch } = useContext(AppContext)

    const [localState, setLocalState] = useState({ name: 'bill' })

    useEffect(() => {
        if (state.user) return setLocalState({ name: state.user.displayName })
    }, [state])

    useEffect(() => {
        dispatch({
            type: LOAD_USERDATA,
            payload: {
                dispatch,
            },
        })
        return () => {
            // TODO post data
            // dispatch({
            //     type: POST_DATA,
            //     payload: {
            //         dispatch,
            //     },
            // })
        }
    }, [])
    const handleChange = e => {
        setLocalState({
            name: e.target.value,
        })
    }
    const handleClick = e => {
        e.preventDefault()
        dispatch({
            type: SET_NAME,
            payload: {
                name: localState.name,
            },
        })
    }

    const getFirstName = fullname => {
        const name = fullname.split(' ')[0]
        console.log(name)
        name.charAt(0).toUpperCase()
        console.log(name)
        return name
    }

    return state.authenticated && state.user.displayName !== undefined ? (
        <>
            <HeroHeader capitalize h1={`Welcome ${state.user.displayName}`}>
                <Text tag="h3" mod="black">
                    Todays main focus:
                </Text>
                <div>
                    <Action />
                    <Action checked />
                    <Action />
                    <Action edit />
                </div>
            </HeroHeader>
            <QuoteBar />
            <Commitments />
            <Tasks number={4} />
            <FooterCTA h4="Did I do my best today to serve myself, my friends, family & my community">
                <StyledButtonContainer>
                    <StyledButton mod="interactive" active>
                        I did my best
                    </StyledButton>
                    <StyledButton mod="white" unactive>
                        I could have done more
                    </StyledButton>
                </StyledButtonContainer>
            </FooterCTA>
        </>
    ) : (
        <h1>loading</h1>
    )
}
export default TodayPage
