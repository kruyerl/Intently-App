import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Action from '../modules/Action'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.grey};
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    max-width: ${props => props.theme.screens.tablet};
`
const Commitments = () => (
    <Container>
        <MaxWidth>
            <Text tag="h3" mod="black">
                Daily commitments:
            </Text>
            <ActionsContainer>
                <Action checked />
                <Action checked />
                <Action />
                <Action checked />
                <Action checked />
                <Action />
                <Action />
                <Action />
            </ActionsContainer>
        </MaxWidth>
    </Container>
)

Commitments.propTypes = {}

export default Commitments
