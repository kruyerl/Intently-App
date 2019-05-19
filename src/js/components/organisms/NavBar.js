import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import AuthNav from '../modules/SignedInNav'
import UnAuthNav from '../modules/SignedOutNav'
import LogoPic from '../../../assets/img/logo.svg'
import firebase from '../../store/firebase'
//! Styles:
const Nav = styled.nav`
    background: ${props => props.theme.colors.layout.white};
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    padding: 16px;
    ${props => props.theme.shadows.z1};
    z-index: 100;
    span {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: ${props => props.theme.screens.desktop};
        margin: 0 auto;
    }
    ul {
        list-style: none;
        padding: 0px;
        margin: 0px;
        display: flex;
    }
    object {
        pointer-events: none;
    }
`

//! Component:
const NavBar = () => {
    useEffect(() => {}, [])

    const { initialising, user } = useAuthState(firebase.auth)

    const isAuth = () => {
        if (!initialising) {
            return user ? <AuthNav /> : <UnAuthNav />
        }
    }
    return (
        <Nav>
            <span>
                <Link to="/">
                    <img src={LogoPic} alt="Logo for Intently" />
                </Link>
                <ul>{isAuth()}</ul>
            </span>
        </Nav>
    )
}

NavBar.propTypes = {}

export default NavBar
