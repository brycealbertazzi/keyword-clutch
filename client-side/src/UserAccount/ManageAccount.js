import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalContext from '../global/GlobalContext'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import './UserAccount.css'
import '../App.css'
import { SubscriptionTypeLabels, SubscriptionTypes } from '../Utils'

export const ManageAccount = () => {
    const globalContext = useContext(GlobalContext)
    const navigate = useNavigate()
    const { stripeCustomer, setStripeCustomer } = globalContext
    const { user } = useUser()

    const fetchStripeCustomer = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) return
        await axios.get('/api/stripe/get-customer-data', { customerEmail: user.primaryEmailAddress.emailAddress }).then(res => {
            console.log(res?.data)
            setStripeCustomer(res?.data)
        })
    }

    const cancelSubscription = async () => {
        axios.post('/api/stripe/cancel-subscription', { subscriptionId: stripeCustomer.customerSubscription.id }).then(() => {
            console.log('Subscription cancelled')
            fetchStripeCustomer()
        }).catch(error => {
            console.error('Error cancelling subscription:', error)
        })
    }

    const renewSubscription = async () => {
        axios.post('/api/stripe/renew-subscription', { subscriptionId: stripeCustomer.customerSubscription.id }).then(() => {
            console.log('Subscription renewed')
            fetchStripeCustomer()
        }).catch(error => {
            console.error('Error renewing subscription:', error)
        })
    }

    const renderCancelOrRenewButton = () => {
        switch(stripeCustomer?.customerSubscription?.status) {
            case SubscriptionTypes.ACTIVE:
                if (stripeCustomer?.customerSubscription?.cancel_at_period_end) {
                    return <button className='app-button' onClick={renewSubscription}>Reactivate</button>
                }
                return <button className='app-button' onClick={cancelSubscription}>Cancel</button>
            case SubscriptionTypes.TRIALING:
                return <button className='app-button' onClick={() => navigate('/pricing')}>Subscribe</button>
            default:
                return <button className='app-button' onClick={renewSubscription}>Renew</button>
        }
    }

    const renderNextBillingCycleLabel = () => {
        switch(stripeCustomer?.customerSubscription?.status) {
            case SubscriptionTypes.ACTIVE:
                if (stripeCustomer?.customerSubscription?.cancel_at_period_end) return 'Set To Expire'
                return 'Next Billing Cycle'
            case SubscriptionTypes.TRIALING:
                return 'Trial Ends'
            default:
                return 'Expired On'
        }

    }

    if (!stripeCustomer) return (
        <div className='page-content'>
            <h1>Loading...</h1>
        </div>
    )
    return (
        <div className='page-content'>
            <div className='account-info-container'>
                <h1>Account Details</h1>
                <div className='account-info-fields'>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Name</h3>
                        <p className='account-field-value'>{stripeCustomer?.customerData?.name}</p>
                    </div>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Email</h3>
                        <p className='account-field-value'>{stripeCustomer?.customerData?.email}</p>
                    </div>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Subscription Status</h3>
                        <p className='account-field-value'>{SubscriptionTypeLabels[stripeCustomer?.customerSubscription?.status] ? SubscriptionTypeLabels[stripeCustomer?.customerSubscription?.status] : "Expired/Inactive Subscription"}</p>
                    </div>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>{renderNextBillingCycleLabel()}</h3>
                        <p>{new Date(stripeCustomer?.customerSubscription?.current_period_end * 1000).toLocaleDateString('en-US')}</p>
                    </div>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Payment Method</h3>
                        {stripeCustomer?.paymentMethod ?
                            <p>{stripeCustomer?.paymentMethod?.card?.brand?.toUpperCase()} card ending in {stripeCustomer?.paymentMethod?.card?.last4}</p>
                        :
                            <p>No payment method on file</p>
                        }
                    </div>
                </div>
                {renderCancelOrRenewButton()}
            </div>
        </div>
    )
}
