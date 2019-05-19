import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Anchor from '../atoms/Anchor'
import img from '../../../assets/img/home1.png'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.white};
`
const MaxWidth = styled.div`
    padding: 54px 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
`
const LinkContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin-top: 40px;
`
const ObjectivesTabs = ({ match, history }) => {
    if (match.params.id === undefined) {
        history.push('/objectives/condition')
        return <div />
    }

    const getWriteUp = id => {
        switch (id) {
            case 'condition':
                return '"Condition" is all about your physical health and, more specifically, your diet, nutrition, exercise, strength, stamina, conditioning, sleep and so on. The more you can get your physical health in check, the better off you’re going to be.'
            case 'contribution':
                return '“Contribution” is your ability to add value in this world. Sometimes that value is going to be a monetary exchange. Sometimes it’s going to be charitable. If you truly want to show up in life, you are going to have to find ways to make yourself more valuable.'

            case 'calibration':
                return '"Calibration" is all about getting right with yourself. Its about your psyche and the virtues of honor and integrity we must all adhere to. Its about your soul and if you believe, your spirituality. Calibrating yourself to visions, purposes and objectives lie at the core of your ability to function effectively.'
            case 'connection':
                return 'This is your ability to connect with others – your family, your neighbors, your co-workers, your friends. It’s critical that we step back occasionally and evaluate the relationships that we want and the relationships that we already have. We should also consider how WE are showing up in these relationships.'
            default:
                return ''
        }
    }

    return (
        <Container>
            <MaxWidth>
                <Text tag="h4">In order to change my life I must work on improving in these key areas:</Text>
                <LinkContainer>
                    <Anchor tag="navlink" to="/objectives/condition">
                        <Text mod={match.params.id === 'condition' ? 'interactive' : 'grey'} tag="h3">
                            Condition
                        </Text>
                    </Anchor>

                    <Anchor tag="navlink" to="/objectives/calibration">
                        <Text mod={match.params.id === 'calibration' ? 'interactive' : 'grey'} tag="h3">
                            Calibration
                        </Text>
                    </Anchor>
                    <Anchor tag="navlink" to="/objectives/connection">
                        <Text mod={match.params.id === 'connection' ? 'interactive' : 'grey'} tag="h3">
                            Connection
                        </Text>
                    </Anchor>
                    <Anchor tag="navlink" to="/objectives/contribution">
                        <Text mod={match.params.id === 'contribution' ? 'interactive' : 'grey'} tag="h3">
                            Contribution
                        </Text>
                    </Anchor>
                </LinkContainer>
                <Text tag="p">{getWriteUp(match.params.id)}</Text>
            </MaxWidth>
        </Container>
    )
}

ObjectivesTabs.propTypes = {}

export default ObjectivesTabs
