import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { rgba } from 'polished'

const modifier = (prop, props) => {
    switch (prop) {
        case 'brand':
            return rgba(props.theme.colors.brand.base, 0.9)
        case 'interactive':
            return rgba(props.theme.colors.interactive.base, 0.9)
        case 'white':
            return rgba(props.theme.colors.layout.white, 0.9)
        case 'grey':
            return rgba(props.theme.colors.layout.black, 0.2)
        case 'warning':
            return rgba(props.theme.colors.denotive.warning, 0.9)
        default:
            return rgba(props.theme.colors.layout.black, 0.9)
    }
}

const alignModifier = prop => {
    switch (prop) {
        case 'left':
            return `text-align: left`
        case 'center':
            return `text-align: center`
        case 'right':
            return `text-align: right`
        default:
            return `text-align: left`
    }
}

const H1 = styled.h1`
    font-family: ${props => props.theme.fonts.headings.primary};
    font-size: 3.8em;
    font-weight: 300;
    line-height: 1.2;
    margin: 0px 0px 12px 0px;
    color: ${props => modifier(props.mod, props)};
    max-width: 600px;
    ${props => alignModifier(props.align)};
`
const H2 = styled.h2`
    font-family: ${props => props.theme.fonts.headings.secondary};
    font-size: 2.5em;
    font-weight: 300;
    line-height: 1.2;
    margin: 0px 0px 12px 0px;
    color: ${props => modifier(props.mod, props)};
    max-width: 600px;
    ${props => alignModifier(props.align)};
`
const H3 = styled.h3`
    font-family: ${props => props.theme.fonts.headings.primary};
    font-size: 1.8em;
    font-weight: 300;
    line-height: 1.5;
    margin: 0px 0px 12px 0px;
    color: ${props => modifier(props.mod, props)};
    max-width: 600px;
    ${props => alignModifier(props.align)};
`
const H4 = styled.h4`
    font-family: ${props => props.theme.fonts.headings.secondary};
    font-size: 1.4em;
    font-weight: 300;
    line-height: 1.6;
    margin: 0px 0px 12px 0px;
    color: ${props => modifier(props.mod, props)};
    max-width: 600px;
    ${props => alignModifier(props.align)};
`
const P = styled.p`
    font-family: ${props => props.theme.fonts.body};
    font-size: 16px;
    line-height: 1.5;
    margin: 0px 0px 16px 0px;
    color: ${props => modifier(props.mod, props)};
    max-width: 600px;
    ${props => alignModifier(props.align)};
    strong {
        font-weight: 500;
    }
`
const Small = styled.small`
    font-family: ${props => props.theme.fonts.headings.primary};
    font-size: 0.8em;
    line-height: 1.5;
    margin: 0px 0px 12px 0px;
    color: ${props => modifier(props.mod, props)};
    max-width: 600px;
    ${props => alignModifier(props.align)};
`

export default function Text({ tag, mod, children, className, align }) {
    switch (tag) {
        case 'h1':
            return (
                <H1 className={className} align={align} mod={mod}>
                    {children}
                </H1>
            )
        case 'h2':
            return (
                <H2 className={className} align={align} mod={mod}>
                    {children}
                </H2>
            )
        case 'h3':
            return (
                <H3 className={className} align={align} mod={mod}>
                    {children}
                </H3>
            )
        case 'h4':
            return (
                <H4 className={className} align={align} mod={mod}>
                    {children}
                </H4>
            )
        case 'p':
            return (
                <P className={className} align={align} mod={mod}>
                    {children}
                </P>
            )
        case 'small':
            return (
                <Small className={className} align={align} mod={mod}>
                    {children}
                </Small>
            )

        default:
            return <p>{children}</p>
    }
}

Text.propTypes = {
    tag: PropTypes.string.isRequired,
    mod: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    align: PropTypes.string,
}
