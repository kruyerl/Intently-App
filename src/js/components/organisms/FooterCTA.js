import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Anchor from '../atoms/Anchor'
import fallback from '../../../assets/img/home1.png'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.white};
`
const MaxWidth = styled.div`
    padding: 24px 24px 24px 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    position: relative;
    min-height: 432px;
`
const ActionsContainer = styled.ul`
    padding: 0px;
    margin: 0px;
    margin-top: 30px;
    max-width: ${props => props.theme.screens.tablet};
`
const Content = styled.div`
    z-index: 10;
`

const StyledImgContainer = styled.div`
    margin: 0 0 0 auto;
    position: absolute;
    top: 100px;
    right: 40px;
    z-index: 0;
    @media (max-width: ${props => props.theme.screens.tablet}) {
        position: initial;
    }
`
const StyledImg = styled.img`
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
`
const FooterCTA = ({ children, heading, subheading, img }) => (
    <Container>
        <MaxWidth>
            <Content>
                <Text tag="h4" mod="brand">
                    {subheading || ''}
                </Text>
                <Text tag="h3" mod="brand">
                    {heading || ''}
                </Text>
                {children}
            </Content>
            <StyledImgContainer>
                <StyledImg src={img || fallback} alt="" />
            </StyledImgContainer>

        </MaxWidth>
    </Container>
)

FooterCTA.propTypes = {}

export default FooterCTA
