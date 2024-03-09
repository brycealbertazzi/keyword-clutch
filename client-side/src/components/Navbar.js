/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import './Navbar.css'
import '../App.css'
import KeywordClutchLogo from '../keyword-clutch.png'
import { useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react"

export const Navbar = () => {
    const navigate = useNavigate()
    const {user, isSignedIn} = useUser()

    useEffect(() => {  
        if (isSignedIn) {
            navigate('/home')
        } else {
            navigate('/')
        }
    }, [user])

    return (
        <div className='nav-container'>
            <img width={100} height={100} src={KeywordClutchLogo} alt='Rank Rocket Logo'/>
            <h1>WELCOME TO KEYWORD CLUTCH</h1>
            <div className='nav-right'>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <div>
                        {/* Get stripe button */}
                        <button onClick={() => navigate('/payment')}>Subscribe</button>
                        <UserButton />
                    </div>
                </SignedIn>
            </div>
        </div>
    )
}
