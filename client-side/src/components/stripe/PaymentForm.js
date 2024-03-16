/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './stripe.css'
import { ContactBillingInfo } from './PaymentSteps/ContactBillingInfo'
import { ReviewSubmit } from './PaymentSteps/ReviewSubmit'
import { PaymentDetails } from './PaymentSteps/PaymentDetails'

export const PaymentForm = () => {
    const [paymentSuccessful, setPaymentSuccessful] = useState(false)
    const [page, setPage] = useState(1)
    const [userInfo, setUserInfo] = useState({})
    const stripe = useStripe()
    const elements = useElements()
    const [hidePaymentDetails, setHidePaymentDetails] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post('/api/stripe/subscribe', {
                    customerObj: userInfo,
                    paymentMethodId: id
                })

                if (response.data.success) {
                    console.log('Successful payment', response.data)
                    setPaymentSuccessful(true)
                }
            } catch (error) {
                console.log('Error', error)
            }
        } else {
            console.log(error.message)
        }
    }

    const handleChange = (e, type) => {
        setUserInfo({...userInfo, [type]: e.target.value})
    }

    useEffect(() => {
        if (page === 2) {
            setHidePaymentDetails(false)
        } else {
            setHidePaymentDetails(true)
        }
    }, [page])

    return (
        <>
        {!paymentSuccessful ? (
            <div className='stripe-page-container'>
                {/* Page 1: Contact Info/Billing Address */}
                {page === 1 && (
                    <ContactBillingInfo handleChange={handleChange} setPage={setPage} />
                )}
                {/* Page 2: Payment Information */} 
                {/* Page 3: Confirmation */}
                {(page === 2 || page === 3) && (
                    <div>
                        <PaymentDetails setPage={setPage} hidePaymentDetails={hidePaymentDetails}/>
                        <ReviewSubmit userInfo={userInfo} setPage={setPage} handleSubmit={handleSubmit} hideReviewSubmit={!hidePaymentDetails}/>
                    </div>
                )}
            </div>
        )
        : (
            <h2>Payment Successful</h2>
        )}
        </>
    )
}
