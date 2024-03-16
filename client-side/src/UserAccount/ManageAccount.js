import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import './UserAccount.css'
import '../App.css'

export const ManageAccount = () => {
    const { user } = useUser()
    const [stripeCustomerData, setStripeCustomerData] = useState(null)

    const fetchStripeCustomer = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) return
        await axios.get('/api/stripe/get-customer-data', { customerEmail: user.primaryEmailAddress.emailAddress }).then(res => {
            console.log(res?.data)
            setStripeCustomerData(res?.data)
        })
    }

    useEffect(() => {
        fetchStripeCustomer()
    }, [])

    if (!stripeCustomerData) return (
        <div className='account-pg-content'>
            <h1>Loading...</h1>
        </div>
    )
    return (
        <div className='account-pg-content'>
            <div className='account-info-container'>
                <h1>Account Details</h1>
                <div className='account-info-fields'>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Name</h3>
                        <p className='account-field-value'>{stripeCustomerData?.customerData?.name}</p>
                    </div>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Email</h3>
                        <p className='account-field-value'>{stripeCustomerData?.customerData?.email}</p>
                    </div>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Subscription Status</h3>
                        <p className='account-field-value'>{stripeCustomerData?.customerSubscription?.status}</p>
                    </div>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Next Billing Cycle</h3>
                        <p>{new Date(stripeCustomerData?.customerSubscription?.current_period_end * 1000).toLocaleDateString('en-US')}</p>
                    </div>
                    <div className='account-info-field'>
                        <h3 className='account-field-label'>Payment Method</h3>
                        {stripeCustomerData?.paymentMethod ?
                            <p>{stripeCustomerData?.paymentMethod?.card?.brand?.toUpperCase()} card ending in {stripeCustomerData?.paymentMethod?.card?.last4}</p>
                        :
                            <p>No payment method on file</p>
                        }
                    </div>
                </div>
                <button className='app-button'>Cancel Subscription</button>
            </div>
        </div>
    )
}
