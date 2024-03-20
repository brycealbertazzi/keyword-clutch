/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../global/GlobalContext'
import { useNavigate } from 'react-router-dom'
import './Pricing.css'
import '../App.css'
import { useUser, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import axios from 'axios'
import { SubscriptionTypes, convertUnixTimestampToDate } from '../Utils'
import { PopUpModal } from './PopUpModal'

export const Pricing = () => {
    const globalContext = useContext(GlobalContext)
    const { stripeCustomer, popUpModalData, setPopUpModalData } = globalContext
    const navigate = useNavigate()
    const { user, isSignedIn } = useUser()

    const startFreeTrial = async () => {
        if (!isSignedIn || !user) return
        axios.post('/api/stripe/start-free-trial', { customerEmail: user.primaryEmailAddress.emailAddress }).then(() => {
            setPopUpModalData({ open: true, header: 'Free Trial Started', message: `Your free trial has started, you will be billed when your trial ends on ${convertUnixTimestampToDate(stripeCustomer?.customerSubscription?.current_period_end)}` })
            console.log('Free trial started')
            navigate('/home')
        }).catch(error => {
            console.error('Error starting free trial:', error)
        })
    }

    const handleStartFreeTrial = () => {
        setPopUpModalData({ open: true, header: 'Start Free Trial', message: 'Are you sure you want to start your free trial?' })
    }

    const subscribe = async () => {
        if (!isSignedIn || !user) return
        navigate('/payment')
    }

    const handleSubscribe = () => {
        setPopUpModalData({ open: true, header: 'Subscribe', message: 'Are you sure you want to subscribe?' })
    }

    useEffect(() => {
        console.log(popUpModalData)
    }, [popUpModalData])

    return (
        <div className='page-content'>
            <div className='pricing-card '>
                <p>Get access to all of our features</p>
                <p>Unlimited Google keyword searches</p>
                <p>Unlimited Youtube keyword searches</p>
                <p>Unlimited website URL keyword scrapes</p>
                <p>Unlimited SEO text optimizations</p>
                <h3>Just $10.00/month</h3>
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
                        {!stripeCustomer?.customerData && <button className='app-button' onClick={startFreeTrial}>Free Trial</button>}
                        {(!stripeCustomer?.customerData || !stripeCustomer?.customerSubscription || stripeCustomer?.customerSubscription?.status === SubscriptionTypes.TRIALING) && <button className='app-button' onClick={subscribe}>Subscribe</button>}
                    </SignedIn>
                </div>
            </div>
            {popUpModalData && popUpModalData.open && <PopUpModal submitFunc={startFreeTrial} closeFunc={null}/>}
        </div>
    )
}
