import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalContext from '../global/GlobalContext'
import axios from 'axios'
import './UserAccount.css'
import '../App.css'
import { SubscriptionTypeLabels, SubscriptionTypes, convertUnixTimestampToDate } from '../Utils'
import { PopUpModal } from '../components/PopUpModal'
import { useUser } from "@clerk/clerk-react"

export const ManageAccount = () => {
    const globalContext = useContext(GlobalContext)
    const navigate = useNavigate()
    const { stripeCustomer, popUpModalData, setPopUpModalData } = globalContext
    const submitFunc = useRef(null)
    const closeFunc = useRef(null)
    const [loading, setLoading] = useState(false)
    const { user } = useUser()

    const cancelSubscription = async () => {
        setLoading(true)
        axios.post('/api/stripe/cancel-subscription', { subscriptionId: stripeCustomer.customerSubscription.id }).then(() => {
            console.log('Subscription cancelled')
            setLoading(false)
            postHandleCancelSubscription()
        }).catch(error => {
            console.error('Error cancelling subscription:', error)
        })
    }

    const handleCancelSubscription = () => {
        submitFunc.current = cancelSubscription
        closeFunc.current = null
        setPopUpModalData({ open: true, header: 'Cancel Subscription', message: `Are you sure you want to cancel your subscription? You will lose access on ${convertUnixTimestampToDate(stripeCustomer?.customerSubscription?.current_period_end)}`})
    }

    const postHandleCancelSubscription = () => {
        submitFunc.current = null
        closeFunc.current = () => {navigate('/')}
        setPopUpModalData({ open: true, header: 'Subscription Cancelled', message: `Your subscription has been cancelled, you will not be billed at the end of your current billing cycle. However, you will lose access on ${convertUnixTimestampToDate(stripeCustomer?.customerSubscription?.current_period_end)}. If you change your mind,
        you may renew your subscription at any time.`})
    }

    const renewSubscription = async () => {
        setLoading(true)
        axios.post('/api/stripe/renew-subscription', { subscriptionId: stripeCustomer?.customerSubscription?.id }).then(() => {
            console.log('Subscription renewed')
            setLoading(false)
            postHandleRenewSubscription()
        }).catch(error => {
            console.error('Error renewing subscription:', error)
        })
    }

    const handleRenewSubscription = () => {
        submitFunc.current = renewSubscription
        closeFunc.current = null
        setPopUpModalData({ open: true, header: 'Renew Subscription', message: `Are you sure you want to renew your subscription? You will be billed on ${convertUnixTimestampToDate(stripeCustomer?.customerSubscription?.current_period_end)}`})
    }

    const postHandleRenewSubscription = () => {
        submitFunc.current = null
        closeFunc.current = () => {navigate('/')}
        setPopUpModalData({ open: true, header: 'Subscription Renewed', message: `Your subscription has been renewed, you will be billed on ${convertUnixTimestampToDate(stripeCustomer?.customerSubscription?.current_period_end)}`})
    }

    const renderCancelOrRenewButton = () => {
        switch(stripeCustomer?.customerSubscription?.status) {
            case SubscriptionTypes.ACTIVE:
                if (stripeCustomer?.customerSubscription?.cancel_at_period_end) {
                    return <button className='app-button' onClick={handleRenewSubscription}>Reactivate Subscription</button>
                }
                return <div className='cancel-div'>
                    <button className='app-button' onClick={() => navigate(-1)}>Back</button>
                    <button className='cancel-btn' onClick={handleCancelSubscription}>Cancel Subscription</button>
                </div>
            case SubscriptionTypes.TRIALING:
                return <button className='app-button' onClick={() => navigate('/pricing')}>Subscribe</button>
            default:
                if (stripeCustomer?.paymentMethod && stripeCustomer?.customerSubscription) {
                    return <button className='app-button' onClick={handleRenewSubscription}>{'Renew Subscription'}</button>
                } else {
                    return <button className='app-button' onClick={() => navigate('/pricing')}>Subscribe</button>
                }
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
                return 'Ended On'
        }
    }

    const determineSubscriptionStatus = () => {
        switch(stripeCustomer?.customerSubscription?.status) {
            case SubscriptionTypes.ACTIVE:
                return SubscriptionTypeLabels[SubscriptionTypes.ACTIVE]
            case SubscriptionTypes.TRIALING:
                return SubscriptionTypeLabels[SubscriptionTypes.TRIALING]
            case SubscriptionTypes.PAST_DUE:
                if (stripeCustomer?.paymentMethod) {
                    return 'Expired Subscription'
                } else {
                    return 'Expired Free Trial'
                }
            default:
                return 'No Subscription'
        }
    }

    if (!stripeCustomer || loading) return (
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
                        <p className='account-field-value'>{user?.fullName}</p>
                    </div>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Email</h3>
                        <p className='account-field-value'>{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Subscription Status</h3>
                        <p className='account-field-value'>{determineSubscriptionStatus()}</p>
                    </div>
                    {stripeCustomer?.customerSubscription &&
                        <div className='account-info-field'>
                            <h3 className='account-field-label'>{renderNextBillingCycleLabel()}</h3>
                            <p>{convertUnixTimestampToDate(stripeCustomer?.paymentMethod ? stripeCustomer?.customerSubscription?.current_period_end : stripeCustomer?.customerSubscription?.trial_end)}</p>
                        </div>
                    }
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
            {popUpModalData && popUpModalData.open && <PopUpModal submitFunc={submitFunc?.current} closeFunc={closeFunc?.current}/>}
        </div>
    )
}
