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
                        <Text tag="h1">Be intentional with how you live yours</Text>
                        <Text tag="p">
                            Life can feel overwhelming, but it doesn’t have to. Intentlyds lets you keep track of
                            everything in one place, so you can get it all done and enjoy more peace of mind along the
                            way.
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
                    <Text tag="h3">
                        Never feel lost again, <br /> Find purpose in action
                    </Text>
                    <Text tag="p">
                        Life can feel overwhelming, but it doesn’t have to. Intentlyds lets you keep track of everything
                        in one place, so you can get it all done and enjoy more peace of mind along the way.
                    </Text>
                    <Anchor tag="link" to="/" mod="interactive">
                        See how we change lives
                    </Anchor>
                </div>
            </TextWithImage>
            <MaxWidth>
                <Text tag="h3">
                    Take back your life. <br />
                    Focus on what matters to you
                </Text>
                <Text tag="p">
                    Life can feel overwhelming, but it doesn’t have to. Intentlyds lets you keep track of everything in
                    one place, so you can get it all done and enjoy more peace of mind along the way.
                </Text>
                <ThreeColumn>
                    <article>
                        <img src={thevision} alt="" />
                        <Text tag="h4">Visualise your future</Text>
                    </article>
                    <article>
                        <img src={setObjectives} alt="" />
                        <Text tag="h4">Setup your objectives</Text>
                    </article>
                    <article>
                        <img src={theaction} alt="" />
                        <Text tag="h4">Take simple action daily </Text>
                    </article>
                </ThreeColumn>
            </MaxWidth>
            <Cta>
                <Text tag="h3">Know your path & walk it with Intently</Text>
                <CTAButtons mod="interactive" onClick={handleClick} name="login">
                    Begin your journey
                </CTAButtons>
            </Cta>
        </>
    )
}

LandingPage.propTypes = {}

export default LandingPage
