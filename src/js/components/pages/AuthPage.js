import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import AuthModule from '../modules/AuthModule'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import Background from '../../../assets/img/signupBackground.png'
import AuthSignIn from '../organisms/AuthSignIn'
import AuthSignUp from '../organisms/AuthSignUp'

const StyledAuth = styled.div`
    background-color: ${props => props.theme.colors.layout.grey};
    background-image: url(${Background});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    span {
        min-height: 100%;
        padding: 100px 32px 16px 32px;
        max-width: ${props => props.theme.screens.desktop};
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
    }
`
const StyledButtons = styled(Button)`
    width: 100%;
    margin-top: 16px;
    display: block;
`
const StyledButtonContainer = styled.div`
    margin: 0px 0px 24px 0px;
`

const AuthPage = ({ history, match: { params } }) => {
    if (params.id === 'signin') {
        return (
            <StyledAuth>
                <span>
                    <AuthModule>
                        <AuthSignIn history={history} />
                    </AuthModule>
                </span>
            </StyledAuth>
        )
    }
    if (params.id === 'signup') {
        return (
            <StyledAuth>
                <span>
                    <AuthModule>
                        <AuthSignUp history={history} />
                    </AuthModule>
                </span>
            </StyledAuth>
        )
    }

    return (
        <StyledAuth>
            <span>
                <AuthModule>
                    <Text tag="h4" align="center" mod="black">
                        Hello, Good Day!
                    </Text>
                    <Text tag="p" align="center" mod="black">
                        <strong>Please log in or sign up to continue</strong>
                    </Text>
                    <StyledButtonContainer>
                        <StyledButtons
                            onClick={() => {
                                history.push('/login/signin')
                            }}
                            mod="interactive"
                        >
                            Sign in
                        </StyledButtons>

                        {/* <StyledButtons mod="grey">Sign in with Google</StyledButtons> */}
                    </StyledButtonContainer>
                    <Text tag="p" align="center" mod="black">
                        or
                    </Text>
                    <StyledButtons
                        onClick={() => {
                            history.push('/login/signup')
                        }}
                        mod="black"
                    >
                        Create an Account
                    </StyledButtons>
                </AuthModule>
            </span>
        </StyledAuth>
    )
}
AuthPage.propTypes = {}

export default AuthPage
