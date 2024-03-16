/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'
import '../App.css'
import GlobalContext from '../global/GlobalContext'
import KeywordClutchLogo from '../keyword-clutch.png'
import { SignedIn, SignedOut, SignInButton, useUser, useClerk } from "@clerk/clerk-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { NavbarTitles } from '../Utils'
import axios from 'axios'

export const Navbar = () => {
    const globalContext = useContext(GlobalContext)
    const navigate = useNavigate()
    const location = useLocation()
    const { stripeCustomer, setStripeCustomer } = globalContext
    const { user } = useUser()
    const { signOut } = useClerk()

    const [showDropdown, setShowDropdown] = useState(false)
    const [pageTitle, setPageTitle] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchStripeCustomer = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) return
        await axios.get('/api/stripe/get-customer-data', { customerEmail: user.primaryEmailAddress.emailAddress }).then(res => {
            console.log(res?.data)
            setStripeCustomer(res?.data)
        })
    }

    const navigateToLandingPage = () => {
        setPageTitle(NavbarTitles.LANDING_PAGE)
        navigate('/')
    }

    const navigateToHomePage = () => {
        setPageTitle(NavbarTitles.HOME_PAGE)
        navigate('/home')
    }

    useEffect(() => {  
        if (!user?.primaryEmailAddress?.emailAddress) {
            navigateToLandingPage()
            return
        }
        fetchStripeCustomer()
    }, [user])

    useEffect(() => {
        if (!stripeCustomer?.customerSubscription?.status) {
            navigateToLandingPage()
            return
        }
        if (stripeCustomer?.customerSubscription?.status === 'active' || stripeCustomer?.customerSubscription?.status === 'trialing') {
            navigateToHomePage()
        } else {
            navigateToLandingPage()
        }
    }, [stripeCustomer])

    return (
        <div className='nav-container'>
            <img width={100} height={100} src={KeywordClutchLogo} alt='Rank Rocket Logo' onClick={() => {
                switch (location.pathname) {
                    case '/pricing':
                        navigateToLandingPage()
                        break
                    case '/account':
                        navigateToHomePage()
                        break
                    default:
                        break
                }
            }}/>
            <h1>{pageTitle}</h1>
            <div className='nav-right'>
                <SignedOut>
                    <SignInButton className='app-button'/>
                </SignedOut>
                <SignedIn>
                <div className='account-menu'>
                    <FontAwesomeIcon icon={faUser} onClick={() => {setShowDropdown(!showDropdown)}} size='2x'/>
                    {showDropdown && (
                        <div className='account-dropdown'>
                            <button onClick={() => {setPageTitle(NavbarTitles.ACCOUNT_PAGE); navigate('/account')}}>Manage Account</button>
                            <button onClick={() => signOut(() => navigate('/'))}>Sign Out</button>
                        </div>
                    )}
                </div>
                </SignedIn>
            </div>
        </div>
    )
}
