import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { rgba } from 'polished'
import moment from 'moment'
import Text from '../atoms/Text'
import AppContext from '../../store/context'
import { DELETE_REVIEW } from '../../store/types'

const Container = styled.li`
    padding: 8px 12px;
    background: ${props => rgba(props.theme.colors.brand.base, 0)};
    border-top: 1px solid ${props => rgba(props.theme.colors.layout.grey, 0.5)};
    border-bottom: 1px solid ${props => rgba(props.theme.colors.layout.grey, 0.5)};
    outline: none;
    display: flex;
    align-items: center;
    align-items: flex-start;
    ${props => (props.closed ? `${props.theme.shadows.z0};` : `${props.theme.shadows.z2}; margin: 8px 0px;`)}

    justify-content: space-between;
    width: 100%;
    border-radius: 3px;
    &:hover {
        transition: all 300ms cubic-bezier(0.66, 0.01, 0.43, 1.01);
        background: ${props => rgba(props.theme.colors.brand.base, 0.02)};
        border-top: 1px solid ${props => rgba(props.theme.colors.layout.grey, 1)};
        border-bottom: 1px solid ${props => rgba(props.theme.colors.layout.grey, 1)};
    }
`
const Tools = styled.ul`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    margin-left: 0px;
    padding: 0px;
    margin-top: auto;
    margin-bottom: auto;
    ${props => (props.closed ? null : `margin-top: 8px;`)}
    transition: margin 300ms ease;
`
const Tool = styled.a`
    font-size: 24px !important;
    color: ${props => rgba(props.theme.colors.layout.black, 0.4)};
    margin-left: 12px;

    transition: all 600ms ease-in-out;
    &:hover {
        color: ${props => rgba(props.theme.colors.interactive.base, 0.9)};
        cursor: pointer;
    }
    opacity: 0.2;
    ${Container}:hover & {
        opacity: 1;
    }
`
const Icon = styled.i`
    font-size: 18px;
`
const HeadingContainer = styled.div`
    display: flex;

    ${props => (props.closed ? `flex-direction: row;` : `flex-direction: column;`)}
`
const ContentContainer = styled.div`
    height: auto;
    overflow: hidden;
    transition: all 200ms ease-in-out;
    ${props => (props.closed ? `max-height: 0px` : `max-height: 1000px`)}
`
const Heading = styled(Text)`
    ${props => (props.closed ? `margin-bottom: 0px;` : `margin-bottom: 16px;`)}
`
const Rating = styled(Text)`
    margin-bottom: 0px;
    margin-right: 8px;
    ${({ value, theme }) => {
        if (value >= 7) return `color: ${theme.colors.interactive.base}`
        if (value <= 3) return `color: ${theme.colors.denotive.warning}`
        return `color: ${theme.colors.brand.base}`
    }};
`
const Time = styled(Text)`
    opacity: 0.5;
    font-size: 12px;
`
const Label = styled(Text)`
    opacity: 0.6
`
const Review = ({ obj }) => {
    const {
        state: { db },
        dispatch,
    } = useContext(AppContext)

    const [localState, setLocalState] = useState({
        description: obj.description,
        differently: obj.differently,
        effective: obj.effective,
        ineffective: obj.ineffective,
        grateful: obj.grateful,
        rating: obj.rating,
        createdAt: obj.createdAt,
        closed: true,
    })

    const toggleOpen = () => {
        setLocalState({
            ...localState,
            closed: !localState.closed,
        })
    }
    function handleDelete(e) {
        e.preventDefault()
        console.log('delete')
        dispatch({
            type: DELETE_REVIEW,
            payload: obj.uid,
        })
    }

    return db ? (
        <Container closed={localState.closed}>
            <ContentContainer>
                <HeadingContainer closed={localState.closed}>
                    <Rating value={localState.rating} closed={localState.closed} tag="p">{`${
                        localState.rating
                    }/10`}</Rating>
                    <Heading closed={localState.closed} tag={localState.closed ? `p` : `h4`}>
                        {' '}
                        {`${localState.description}`}
                    </Heading>
                </HeadingContainer>
                <ContentContainer closed={localState.closed}>
                    <Label tag="small">The most effictive action:</Label>
                    <Text tag="p">{`${localState.effective}`}</Text>
                    <Label tag="small">The most ineffictive action:</Label>
                    <Text tag="p">{`${localState.ineffective}`}</Text>
                    <Label tag="small">The identified change/s:</Label>
                    <Text tag="p">{`${localState.differently}`}</Text>
                    <Label tag="small">The days gratitude:</Label>
                    <Text tag="p">{`${localState.grateful}`}</Text>
                </ContentContainer>
                <Time tag="small"> {`${moment(localState.createdAt).calendar()}`}</Time>
            </ContentContainer>

            <Tools closed={localState.closed}>
                <li>
                    <Tool onClick={toggleOpen}>
                        <Icon className="material-icons">view_day</Icon>
                    </Tool>
                </li>
                <li>
                    <Tool onClick={handleDelete}>
                        <Icon className="material-icons">clear</Icon>
                    </Tool>
                </li>
            </Tools>
        </Container>
    ) : null
}

Review.propTypes = {
    obj: PropTypes.object.isRequired,
}

export default Review
