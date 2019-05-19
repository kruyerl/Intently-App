import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Anchor from '../atoms/Anchor'
import HeroHeader from '../modules/HeroHeader'
import img from '../../../assets/img/home1.png'
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

const LandingPage = ({ history }) => {
    const handleClick = e => {
        history.push(`/${e.target.name}`)
    }
    return (
        <>
            <Header>
                <section>
                    <div>
                        <Text tag="h2">Do Less</Text>
                        <Text tag="h1">Achieve more</Text>
                        <Text tag="p">
                            Life can feel overwhelming, but it doesn’t have to. Todoist lets you keep track of
                            everything in one place, so you can get it all done and enjoy more peace of mind along the
                            way.
                        </Text>

                        <Button mod="interactive" onClick={handleClick} name="login">
                            Begin your journey
                        </Button>
                    </div>
                    <img src={img} alt="" />
                </section>
            </Header>
            <TextWithImage>
                <img src={img} alt="" />
                <div>
                    <Text tag="h3">
                        Never feel lost again, <br /> Find purpose in action
                    </Text>
                    <Text tag="p">
                        Life can feel overwhelming, but it doesn’t have to. Todoist lets you keep track of everything in
                        one place, so you can get it all done and enjoy more peace of mind along the way.
                    </Text>
                    <Anchor tag="link" to="/" mod="interactive">
                        See how we change lives
                    </Anchor>
                </div>
            </TextWithImage>
            <MaxWidth>
                <Text tag="h3">
                    Take back your life. <br />
                    Focus on what matters
                </Text>
                <Text tag="p">
                    Life can feel overwhelming, but it doesn’t have to. Todoist lets you keep track of everything in one
                    place, so you can get it all done and enjoy more peace of mind along the way.
                </Text>
                <ThreeColumn>
                    <article>
                        <img src={img} alt="" />
                        <Text tag="h4">Imagine your future</Text>
                    </article>
                    <article>
                        <img src={img} alt="" />
                        <Text tag="h4">Set your objectives.</Text>
                    </article>
                    <article>
                        <img src={img} alt="" />
                        <Text tag="h4">Take action with intention</Text>
                    </article>
                </ThreeColumn>
            </MaxWidth>
            <Cta>
                <Text tag="h3">Know your path & walk it with Intently</Text>
                <Button mod="interactive" onClick={handleClick} name="login">
                    Begin your journey
                </Button>
            </Cta>
        </>
    )
}

LandingPage.propTypes = {}

export default LandingPage
