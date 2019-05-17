import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { rgba } from 'polished'
import { Link, NavLink } from 'react-router-dom'

const colorModifier = ({ mod, theme }) => {
    switch (mod) {
        case 'black':
            return `
            color: ${rgba(theme.colors.brand.dark, 0.9)};
            &:hover, &:focus {
                color: ${theme.colors.interactive.base};
            }
            `
        case 'interactive':
            return `
            color: ${rgba(theme.colors.interactive.base, 0.9)};
            &:hover, &:focus {
                color: ${theme.colors.interactive.light};

            }
            `
        case 'white':
            return `
            color: ${rgba(theme.colors.layout.white, 0.9)};
            &:hover, &:focus {
                color: ${theme.colors.interactive.base};
            }
            `
        default:
            return `
            color: ${rgba(theme.colors.brand.base, 0.9)};
            &:hover, &:focus {
                color: ${theme.colors.interactive.base};
            }
            `
    }
}

const StyledA = styled.a`
    font-family: ${props => props.theme.fonts.headings.secondary};
    font-size: 16px;
    line-height: 1.5;
    margin: 0px 0px 20px 0px;
    max-width: 500px;
    text-decoration: none;
    white-space: nowrap;
    transition: color 300ms ease-in-out;
    ${props => colorModifier(props)};
`
const StyledLink = styled(Link)`
    font-family: ${props => props.theme.fonts.headings.secondary};
    font-size: 16px;
    line-height: 1.5;
    margin: 0px 0px 20px 0px;
    max-width: 500px;
    text-decoration: none;
    white-space: nowrap;
    transition: color 300ms ease-in-out;
    ${props => colorModifier(props)};
`
const StyledNavLink = styled(NavLink)`
    font-family: ${props => props.theme.fonts.headings.secondary};
    font-size: 16px;
    line-height: 1.5;
    margin: 0px 0px 20px 0px;
    max-width: 500px;
    text-decoration: none;
    white-space: nowrap;
    transition: color 300ms ease-in-out;
    ${props => colorModifier(props)};
`

export default function Anchor({ tag, mod, children, className, ...restProps }) {
    switch (tag) {
        case 'a':
            return (
                <StyledA className={className} mod={mod} {...restProps}>
                    {children}
                </StyledA>
            )
        case 'link':
            return (
                <StyledLink className={className} mod={mod} {...restProps}>
                    {children}
                </StyledLink>
            )
        case 'navlink':
            return (
                <StyledNavLink className={className} mod={mod} {...restProps}>
                    {children}
                </StyledNavLink>
            )

        default:
            return <a>{children}</a>
    }
}

Anchor.propTypes = {
    tag: PropTypes.string.isRequired,
    mod: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
}
