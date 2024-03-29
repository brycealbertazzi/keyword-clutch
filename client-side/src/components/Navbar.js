/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import '../App.css'
import GlobalContext from '../global/GlobalContext'
import KeywordClutchLogo from '../keyword-clutch.png'
import { SignedIn, SignedOut, SignInButton, useUser, useClerk } from "@clerk/clerk-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { NavbarTitles, SubscriptionTypes } from '../Utils'
import axios from 'axios'

export const Navbar = () => {
    const globalContext = useContext(GlobalContext)
    const location = useLocation()
    const navigate = useNavigate()
    const { stripeCustomer, setStripeCustomer } = globalContext
    const { user, isSignedIn } = useUser()
    const { signOut } = useClerk()

    const [showDropdown, setShowDropdown] = useState(false)
    const [pageTitle, setPageTitle] = useState('')

    const fetchStripeCustomer = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) return
        await axios.get('/api/stripe/get-customer-data', { customerEmail: user.primaryEmailAddress.emailAddress }).then(res => {
            setStripeCustomer(res?.data)
        })
    }

    const handleLogoClick = () => {
        if (isSignedIn && (stripeCustomer?.customerSubscription?.status === SubscriptionTypes.ACTIVE || stripeCustomer?.customerSubscription?.status === SubscriptionTypes.TRIALING)) {
            navigate('/home')
        } else {
            navigate('/')
        }
    }

    useEffect(() => {  
        fetchStripeCustomer()
    }, [user])

    useEffect(() => {
        if (!user) return
        if (stripeCustomer?.customerSubscription?.status === SubscriptionTypes.ACTIVE || stripeCustomer?.customerSubscription?.status === SubscriptionTypes.TRIALING) {
            if (location.pathname !== '/home') {
                navigate('/home')
            }
        } else {
            if (location.pathname !== '/') {
                navigate('/')
            }
        }
    }, [stripeCustomer])

    useEffect(() => {
        switch(location.pathname) {
            case '/':
                fetchStripeCustomer()
                setPageTitle(NavbarTitles.LANDING_PAGE)
                break
            case '/home':
                fetchStripeCustomer()
                setPageTitle(NavbarTitles.HOME_PAGE)
                break
            case '/account':
                setPageTitle(NavbarTitles.ACCOUNT_PAGE)
                break
            case '/pricing':
                setPageTitle(NavbarTitles.PRICING)
                break
            default:
                setPageTitle(NavbarTitles.LANDING_PAGE)
                break
        }
    }, [location])

    return (
        <div className='nav-container'>
            <img width={100} height={100} src={KeywordClutchLogo} alt='Rank Rocket Logo' onClick={() => handleLogoClick()}/>
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
                            {location.pathname !== '/home' ?
                                <button onClick={() => {setPageTitle(NavbarTitles.HOME_PAGE); navigate('/home'); setShowDropdown(false)}}>Home</button>
                            :
                                <button onClick={() => {setPageTitle(NavbarTitles.ACCOUNT_PAGE); navigate('/account'); setShowDropdown(false)}}>Manage Account</button>
                            }
                            <button onClick={() => {signOut(() => navigate('/')); setShowDropdown(false)}}>Sign Out</button>
                        </div>
                    )}
                </div>
                </SignedIn>
            </div>
        </div>
    )
}
