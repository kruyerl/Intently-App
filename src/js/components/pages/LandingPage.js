import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Anchor from '../atoms/Anchor'
import HeroHeader from '../modules/HeroHeader'
import img from '../../../assets/img/family.png'
import family from '../../../assets/img/family.png'
import thevision from '../../../assets/img/thevision.png'
import theaction from '../../../assets/img/theaction.png'
import setObjectives from '../../../assets/img/setObjectives.png'
import lost from '../../../assets/img/lost.png'
import TextWithImage from '../modules/TextWithImage'

const MaxWidth = styled.section`
    max-width: ${props => props.theme.screens.desktop};
    padding: 50px 24px 0 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    justify-content: space-around;
    img {
        width: auto;
        @media (max-width: ${props => props.theme.screens.tablet}) {
            width: 100%;
        }
    }

    div {
        margin: 24px 0 0 0;
    }
    @media (max-width: ${props => props.theme.screens.desktop}) {
        justify-content: center;
        flex-wrap: wrap-reverse;
        align-items: center;
    }
`
const Header = styled.header`
    section {
        max-width: ${props => props.theme.screens.desktop};
        padding: 120px 24px 50px 24px;
        min-height: 150px;
        display: flex;
        align-items: flex-start;
        margin: 0 auto;
        justify-content: space-around;
        img {
            width: auto;

            @media (max-width: ${props => props.theme.screens.tablet}) {
                width: 100%;
            }
        }
        div {
            margin: 24px 0 0 0;
        }
        @media (max-width: ${props => props.theme.screens.desktop}) {
            justify-content: center;
            flex-wrap: wrap-reverse;
        }
    }
`
const ThreeColumn = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    article {
        padding: 24px;
        display: flex;
        align-items: center;
        flex-direction: column;

        img {
            width: 100%;
            max-width: 250px;
            margin-bottom: 24px;
        }
    }
    @media (max-width: ${props => props.theme.screens.tablet}) {
        article {
            img {
                max-width: 80%;
            }
        }
    }
`
const Title = styled(Text)`
    @media (max-width: ${props => props.theme.screens.desktop}) {
        text-align: center;
    }
`
const Cta = styled.section`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 50px 24px 80px 24px;
`
const CTAButtons = styled(Button)`
    margin-top: 16px;
`
const LandingPage = ({ history }) => {
    const handleClick = e => {
        history.push(`/${e.target.name}`)
    }
    return (
        <>
            <Header>
                <section>
                    <div>
                        <Text tag="h2">Life is precious</Text>
                        <Text tag="h1">Live yours with intention</Text>
                        <Text tag="p">
                            Sometimes life feels overwhelming, but it doesn't have to. Intently helps you get what you
                            want out of life by distilling the destination into simple consistent steps. So you can
                            accomplish amazing things and enjoy more of life along the way.
                        </Text>

                        <CTAButtons mod="interactive" onClick={handleClick} name="login">
                            Begin your journey
                        </CTAButtons>
                    </div>
                    <img src={family} alt="" />
                </section>
            </Header>
            <TextWithImage>
                <img src={lost} alt="" />
                <div>
                    <Title tag="h3">
                        Never feel lost again, <br /> Find purpose in action
                    </Title>
                    <Text tag="p">
                        Making decisions can be hard. By tying decisions to your objectives Intently empowers you to
                        take action and move the needle.
                    </Text>
                    <Anchor tag="link" to="/login" mod="interactive">
                        Make things happen
                    </Anchor>
                </div>
            </TextWithImage>
            <MaxWidth>
                <Title tag="h3">
                    Take back your life. <br />
                    Focus on what matters to you
                </Title>
                <Text tag="p">
                    In order to help you claim back the moments that matter to you most. Intently helps you limit your
                    attention, focusing on being effective and consistent.
                </Text>
                <ThreeColumn>
                    <article>
                        <img src={thevision} alt="" />
                        <Text tag="h4">Be more present</Text>
                    </article>
                    <article>
                        <img src={setObjectives} alt="" />
                        <Text tag="h4">Be more focused</Text>
                    </article>
                    <article>
                        <img src={theaction} alt="" />
                        <Text tag="h4">Be more productive</Text>
                    </article>
                </ThreeColumn>
            </MaxWidth>
            <Cta>
                <Title tag="h3">Know the path & walk it with Intently</Title>
                <CTAButtons mod="interactive" onClick={handleClick} name="login">
                    Begin your journey
                </CTAButtons>
            </Cta>
        </>
    )
}

LandingPage.propTypes = {}

export default LandingPage
