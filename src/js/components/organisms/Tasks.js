import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Action from '../modules/Action'
import FooterCTA from './FooterCTA'
import AppContext from '../../store/context'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.white};
`
const MaxWidth = styled.div`
    padding: 54px 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
`
const ActionsContainer = styled.ul`
    padding: 0px;
    margin: 0px;
    margin-top: 30px;
    max-width: ${props => props.theme.screens.tablet};
`
const Tasks = ({ number }) => {
    const context = useContext(AppContext)
    return (
        <Container>
            <MaxWidth>
                <Text tag="h3" mod="black">
                    I will also:
                </Text>
                <ActionsContainer>
                    {context.state && context.state.db.tasks ? (
                        context.state.db.tasks
                            .slice(0, number)
                            .map(({ uid, complete, body }) => (
                                <Action key={uid} index={uid} body={body} checked={complete} />
                            ))
                    ) : (
                        <Loader tag="p" />
                    )}
                </ActionsContainer>
            </MaxWidth>
        </Container>
    )
}

Tasks.propTypes = {}

export default Tasks
