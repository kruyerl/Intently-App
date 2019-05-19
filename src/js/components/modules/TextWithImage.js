import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Anchor from '../atoms/Anchor'
import HeroHeader from './HeroHeader'
import img from '../../../assets/img/home1.png'

const Header = styled.section`
    section {
        max-width: ${props => props.theme.screens.desktop};
        padding: 50px 24px;

        display: flex;
        align-items: center;
        margin: 0 auto;
        justify-content: space-around;
        img {
            width: auto;
            margin-right: 50px;
            @media (max-width: ${props => props.theme.screens.tablet}) {
                width: 100%;
                margin-right: 0;
            }
        }
        div {
            margin-bottom: 50px;
        }
        @media (max-width: ${props => props.theme.screens.desktop}) {
            justify-content: center;
            flex-wrap: wrap-reverse;
        }
    }
`
const TextWithImage = ({ children }) => (
    <Header>
        <section>{children}</section>
    </Header>
)

TextWithImage.propTypes = {}

export default TextWithImage
