import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { rgba } from 'polished'
import Text from './Text'

const modifier = ({ mod, theme }) => {
    switch (mod) {
        case 'black':
            return `
                color: ${theme.colors.layout.white};
                background: ${theme.colors.brand.dark};
                &:hover, &:focus {
                    background: ${theme.colors.brand.base};
                }

            `
        case 'interactive':
            return `
                color: ${theme.colors.layout.white};
                background: ${theme.colors.interactive.base};
                &:hover{
                    background: ${theme.colors.interactive.light};

                }

            `
        case 'grey':
            return `
                color: ${theme.colors.layout.black};
                background: ${rgba(theme.colors.layout.grey, 0.7)};
                &:hover{
                    background: ${rgba(theme.colors.layout.grey, 1)};

                }

            `
        case 'invisible':
            return `
                color: ${theme.colors.layout.brand};
                background: ${rgba(theme.colors.layout.grey, 0)};
                &:hover{
                    background: ${rgba(theme.colors.layout.grey, 0.5)};

                }

            `
        case 'white':
            return `
                color: ${theme.colors.brand.base};
                background: ${theme.colors.layout.white};
                &:hover, &:focus {
                    background: ${theme.colors.layout.grey};
                }

            `

        default:
            return `
                color: ${theme.colors.layout.white};
                background: ${theme.colors.brand.base};
                &:hover, &:focus {
                    background: ${theme.colors.brand.light};
                }

            `
    }
}

const StyledButton = styled.button`
    padding: 16px 32px;
    border-radius: 2px;
    border: none;
    transition: all 300ms ease-in-out;
    white-space: nowrap;
    ${props => modifier(props)}
    ${props => (props.z ? props.theme.shadows.z1 : null)}
    cursor: pointer;

    &:hover {
        ${props => (props.unactive ? null : props.theme.shadows.z3)};
    }
    &:focus {
        outline: none;
    }
    @media (max-width: ${props => props.theme.screens.mobile}) {
        width: 100%;
    }
`

export default function Button({ mod, children, className, unactive, z, ...rest }) {
    return (
        <StyledButton unactive={unactive} mod={mod} {...rest} z={z} className={className}>
            {children}
        </StyledButton>
    )
}

Button.propTypes = {}
