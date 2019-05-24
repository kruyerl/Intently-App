import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { rgba } from 'polished'

const StyledInput = styled.input`
    height: 40px;
    padding: 8px 16px;
    background-color: #fff;

    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
    appearance: none;
    font: 300 14px ${props => props.theme.fonts.body};
    &:focus {
        border: 1px solid ${props => props.theme.colors.interactive.base};
        outline: 0px;
    }
    ${props =>
        props.error
            ? `
       border: 1px solid ${props.theme.colors.denotive.warning};
    `
            : `
      border: 1px solid #d1d1d1;
    `}
`
const StyledRange = styled.input`
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 2px;
    background: ${props => rgba(props.theme.colors.layout.black, 0.1)};
    outline: none;
    opacity: 1;
    transition: all 300ms ease;
    &:hover {
        background: ${props => rgba(props.theme.colors.layout.black, 0.3)};
        opacity: 1;
    }
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        background: ${props => props.theme.colors.interactive.base};
        ${props => props.theme.shadows.z1};
        cursor: pointer;
        border-radius: 50%;
        transition: all 300ms ease;

        &:hover {
            ${props => props.theme.shadows.z3};
            transition: all 300ms ease ${props => props.theme.shadows.z3};
        }
    }
    &::-moz-range-thumb {
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #4caf50; /* Green background */
        cursor: pointer; /* Cursor on hover */
        border-radius: 50%;
    }

    &:focus {
        outline: 0px;
    }
`
const StyledTextarea = styled.textarea`
    height: 40px;
    padding: 8px 16px;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
    appearance: none;
    min-height: 65px;
    padding-top: 6px;
    padding-bottom: 6px;
    font: 300 14px ${props => props.theme.fonts.body};
    &:focus {
        border: 1px solid ${props => props.theme.colors.interactive.base};
        outline: 0px;
    }
`
const StyledSelect = styled.select`
    height: 40px;
    padding: 8px 16px;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
    appearance: none;
    &:focus {
        border: 1px solid ${props => props.theme.colors.interactive.base};
        outline: 0px;
    }
`
const StyledLabel = styled.label`
    margin-bottom: 8px;
    color: ${props => rgba(props.theme.colors.layout.black, 0.8)};
    font-size: 12px;
    display: flex;
    flex-direction: column;
`

export function Input({ children, className, ...restProps }) {
    return (
        <StyledInput {...restProps} className={className}>
            {children}
        </StyledInput>
    )
}
Input.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}
export function Range({ children, className, ...restProps }) {
    return (
        <StyledRange {...restProps} type="range" className={className}>
            {children}
        </StyledRange>
    )
}
Input.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

export function TextArea({ children, className, ...restProps }) {
    return (
        <StyledTextarea {...restProps} className={className}>
            {children}
        </StyledTextarea>
    )
}
TextArea.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

export function Select({ children, className, ...restProps }) {
    return (
        <StyledSelect {...restProps} className={className}>
            {children}
        </StyledSelect>
    )
}
Select.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

export function Label({ children, className, ...restProps }) {
    return (
        <StyledLabel {...restProps} className={className}>
            {children}
        </StyledLabel>
    )
}
Label.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}
