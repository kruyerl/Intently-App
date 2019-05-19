import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { rgba } from 'polished'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Action from '../modules/Action'
import FooterCTA from './FooterCTA'
import AddActionForm from '../modules/AddActionForm'

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

const TasksOrganism = () => (
    <Container>
        <MaxWidth>
            <Text tag="h4" mod="black">
                These are the secondary items I must take to stay on top of everything.
            </Text>
            <ActionsContainer>
                <AddActionForm />
            </ActionsContainer>
        </MaxWidth>
    </Container>
)

TasksOrganism.propTypes = {}

export default TasksOrganism
