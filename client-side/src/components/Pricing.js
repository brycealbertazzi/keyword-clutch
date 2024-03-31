/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useRef } from 'react'
import GlobalContext from '../global/GlobalContext'
import { useNavigate } from 'react-router-dom'
import './Pricing.css'
import '../App.css'
import { useUser, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import axios from 'axios'
import { ResultType, ResultTypeColors, SubscriptionTypes, convertUnixTimestampToDate } from '../Utils'
import { PopUpModal } from './PopUpModal'
import { LoadingSpinner } from '../LoadingSpinner'

export const Pricing = () => {
    const globalContext = useContext(GlobalContext)
    const { stripeCustomer, popUpModalData, setPopUpModalData } = globalContext
    const navigate = useNavigate()
    const { user, isSignedIn } = useUser()
    const submitFunc = useRef(null)
    const closeFunc = useRef(null)
    const [loading, setLoading] = useState(false)

    const startFreeTrial = async () => {
        if (!isSignedIn || !user) return
        setLoading(true)
        axios.post('/api/stripe/start-free-trial', { customerEmail: user.primaryEmailAddress.emailAddress }).then(() => {
            console.log('Free trial started')
            postHandleFreeTrial()
        }).catch(error => {
            console.error('Error starting free trial:', error)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleStartFreeTrial = () => {
        submitFunc.current = startFreeTrial
        closeFunc.current = null
        setPopUpModalData({ open: true, header: 'Free Trial', message: 'You are about to start a free trial, your trial will end in 3 days' })
    }

    const postHandleFreeTrial = () => {
        submitFunc.current = null
        closeFunc.current = () => { navigate('/home') }
        setPopUpModalData({ open: true, header: 'Free Trial Started', message: 'Your free trial has started!' })
    }

    const subscribe = async () => {
        if (!isSignedIn || !user) return
        navigate('/payment')
    }

    if (loading) return (
        <div className='page-content'>
            <h1>Loading...</h1>
        </div>
    )

    return (
        <div className='page-content'>
            <div className='pricing-card '>
                <h1 style={{textAlign: 'center'}}>Subscription - $10.00/mo</h1>
                <h3 style={{fontSize: '25px'}}>- 3 day free trial (no card required)</h3>
                <h3 style={{fontSize: '25px'}}>- Get access to all of our features</h3>
                <h3 style={{fontSize: '25px'}}>- Unlimited <span style={{color: ResultTypeColors[ResultType.WEB_URL]}}>website</span> scans</h3>
                <h3 style={{fontSize: '25px'}}>- Unlimited <span style={{color: ResultTypeColors[ResultType.TEXT]}}>SEO text</span> optimizations</h3>
                <h3 style={{fontSize: '25px'}}>- Unlimited <span style={{color: ResultTypeColors[ResultType.GOOGLE]}}>Google</span> keyword searches</h3>
                <h3 style={{fontSize: '25px'}}>- Unlimited <span style={{color: ResultTypeColors[ResultType.YOUTUBE]}}>Youtube</span> keyword searches</h3>
                <div className='pricing-pg-buttons'>
                    <SignedOut>
                        <SignInButton className='app-button' redirectUrl='/pricing'>
                            Free Trial
                        </SignInButton>
                        <SignInButton className='app-button' redirectUrl='/pricing'>
                            Subscribe
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        {!stripeCustomer?.customerData && <button className='app-button' onClick={handleStartFreeTrial}>Free Trial</button>}
                        {(!stripeCustomer?.customerData || !stripeCustomer?.customerSubscription || !stripeCustomer?.paymentMethod || stripeCustomer?.customerSubscription?.status === SubscriptionTypes.TRIALING) && <button className='app-button' onClick={subscribe}>Subscribe</button>}
                    </SignedIn>
                </div>
            </div>
            {popUpModalData && popUpModalData.open && <PopUpModal submitFunc={submitFunc.current} closeFunc={closeFunc.current}/>}
        </div>
    )
}
