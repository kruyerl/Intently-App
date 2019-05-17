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
    padding: 0px 24px 80px 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
`
const ActionsContainer = styled.ul`
    padding: 0px;
    margin: 0px;
    margin-top: 30px;
    max-width: ${props => props.theme.screens.tablet};
`

const StyledHeading = styled(Text)`
    margin: 40px 0px;
`
const StyledImgContainer = styled.div`
    margin: 0 0 0 auto;
`
const StyledImg = styled.img`
    max-width: 400px;
    margin: 0 auto;
`
const FooterCTA = ({ children, h4 }) => (
    <Container>
        <MaxWidth>
            <div>
                <StyledHeading tag="h4" mod="black">
                    {h4 ? h4 : ''}
                </StyledHeading>
                {children}
            </div>
            <StyledImgContainer>
                <StyledImg src={img} alt="" />
            </StyledImgContainer>
        </MaxWidth>
    </Container>
)

FooterCTA.propTypes = {}

export default FooterCTA
