import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Anchor from '../atoms/Anchor'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.white};
`
const MaxWidth = styled.div`
    padding: 32px 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
`
const LinkContainer = styled.div`
    display: grid;
    display: flex;
    margin-bottom: 8px;
    margin-top: 16px;
    @media (max-width: ${props => props.theme.screens.tablet}) {
        font-size: 24px;

        flex-wrap: wrap;
        justify-content: space-around;
    }
`
const CategoryA = styled(Anchor)`
    margin: 0px;
`
const CategoryLink = styled(Text)`
    margin-right: 24px;
    &:hover {
        transition: all 600ms ease;
        color: ${props => props.theme.colors.brand.base};
    }
    @media (max-width: ${props => props.theme.screens.tablet}) {
        margin: 8px 16px;
        font-size: 24px;
    }
`

const ObjectivesTabs = ({ match, history }) => {
    if (match.params.id === undefined) {
        history.push('/objectives/condition')
        return <div />
    }

    const getWriteUp = id => {
        switch (id) {
            case 'condition':
                return '"Condition" is all about your physical health and, more specifically, your diet, nutrition, exercise, strength, stamina, conditioning, sleep and so on.'
            case 'contribution':
                return '“Contribution” is your ability to add value in this world. Sometimes that value is going to be a monetary exchange. Sometimes it’s going to be charitable.'

            case 'calibration':
                return '"Calibration" is all about getting right with yourself. Its about your psyche and the virtues of honor and integrity. Its about your soul and if you believe, your spirituality.  '
            case 'connection':
                return 'This is your ability to connect with others – your family, your neighbors, your co-workers, your friends. It’s critical that we step back occasionally and evaluate the relationships that we want and the relationships that we already have. '
            default:
                return ''
        }
    }

    return (
        <Container>
            <MaxWidth>
                <Text tag="h4" mod="brand">
                    How are you showing up in these key areas:
                </Text>
                <LinkContainer>
                    <CategoryA tag="navlink" to="/objectives/condition">
                        <CategoryLink mod={match.params.id === 'condition' ? 'interactive' : 'grey'} tag="h3">
                            Condition
                        </CategoryLink>
                    </CategoryA>

                    <CategoryA tag="navlink" to="/objectives/calibration">
                        <CategoryLink mod={match.params.id === 'calibration' ? 'interactive' : 'grey'} tag="h3">
                            Calibration
                        </CategoryLink>
                    </CategoryA>
                    <CategoryA tag="navlink" to="/objectives/connection">
                        <CategoryLink mod={match.params.id === 'connection' ? 'interactive' : 'grey'} tag="h3">
                            Connection
                        </CategoryLink>
                    </CategoryA>
                    <CategoryA tag="navlink" to="/objectives/contribution">
                        <CategoryLink mod={match.params.id === 'contribution' ? 'interactive' : 'grey'} tag="h3">
                            Contribution
                        </CategoryLink>
                    </CategoryA>
                </LinkContainer>
                <Text tag="p">{getWriteUp(match.params.id)}</Text>
            </MaxWidth>
        </Container>
    )
}

ObjectivesTabs.propTypes = {}

export default ObjectivesTabs
