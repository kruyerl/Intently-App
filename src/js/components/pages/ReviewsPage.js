import React, { useContext } from 'react'
import styled from 'styled-components'
import SidekickHeader from '../modules/SidekickHeader'
import FooterCTA from '../organisms/FooterCTA'
import Review from '../modules/Review'
import AfterActionReviews from '../modules/AfterActionReviews'
import { GrandLoader } from '../modules/Loader'
import AppContext from '../../store/context'
import QuoteBar from '../modules/QuoteBar'

const Container = styled.section`
    background: ${props => props.theme.colors.layout.white};
`
const MaxWidth = styled.div`
    padding: 24px;
    max-width: ${props => props.theme.screens.desktop};
    margin: 0 auto;
    ${'' /* @media (min-width: ${props => props.theme.screens.tablet}) {
        padding: 54px 40px;
    } */}
`
const ReviewContainer = styled.ul`
    list-style: none;
    padding: 0px;
    margin: 16px 0;
`
const ReviewsPage = () => {
    const { state, dispatch } = useContext(AppContext)
    const { reviews } = state.db

    return reviews ? (
        <>
            <SidekickHeader
                textMain="Reviews"
                textSub="Where you came from is almost as important as where you are headed. Whether you've have a good day or a bad one. We'd love to help you be intentional about seeing the bigger picture."
            />

            {reviews && (
                <Container>
                    <MaxWidth>
                        <ReviewContainer>
                            {reviews && reviews.map(review => <Review key={review.uid} obj={review} />)}
                        </ReviewContainer>
                    </MaxWidth>
                </Container>
            )}
            <AfterActionReviews />
            <QuoteBar />
        </>
    ) : (
        <GrandLoader />
    )
}

export default ReviewsPage
