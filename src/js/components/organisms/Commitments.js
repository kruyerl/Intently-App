import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Anchor from '../atoms/Anchor'
import Button from '../atoms/Button'
import NonDragAction from '../modules/NonDragAction'
import AppContext from '../../store/context'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.grey};
`
const MaxWidth = styled.div`
    padding: 32px 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
`
const ActionsContainer = styled.ul`
    padding: 0px;
    margin: 0px;
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    max-width: ${props => props.theme.screens.tablet};
`
const Commitments = () => {
    const { state, dispatch } = useContext(AppContext)
    const { habits } = state.db
    return state ? (
        <Container>
            <MaxWidth>
                <Text tag="h3" mod="brand">
                    Foster good habits:
                </Text>
                <ActionsContainer>
                    {habits && habits.map(habit => <NonDragAction key={habit.uid} type="habit" obj={habit} />)}
                </ActionsContainer>
                {habits && habits.length === 0 ? (
                    <>
                        <Text tag="p" mod="black">
                            The next habits of each of your objectives show up here everyday
                        </Text>
                        <Anchor tag="link" mod="interactive" to="/objectives">
                            Set an objective
                        </Anchor>
                    </>
                ) : null}
            </MaxWidth>
        </Container>
    ) : null
}

Commitments.propTypes = {}

export default Commitments
