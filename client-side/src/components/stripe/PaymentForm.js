/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './stripe.css'
import '../../App.css'
import { ContactBillingInfo } from './PaymentSteps/ContactBillingInfo'
import { ReviewSubmit } from './PaymentSteps/ReviewSubmit'
import { PaymentDetails } from './PaymentSteps/PaymentDetails'

export const PaymentForm = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [userInfo, setUserInfo] = useState({})
    const stripe = useStripe()
    const elements = useElements()
    const [hidePaymentDetails, setHidePaymentDetails] = useState(true);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        if (error) {
            console.error('Error creating payment method:', error)
        }
        const {id} = paymentMethod
        if (!id) {
            setLoading(false)
            return
        }
        await axios.post('/api/stripe/subscribe', {
            customerObj: userInfo,
            paymentMethodId: id
        }).then(res => {
            console.log('Subscription started: ', res.data)
            navigate('/home')
        }).catch(e => {
            console.error('Error starting subscription:', e)
        }).finally(() => {
            setLoading(false)
        })
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
        <div className='stripe-page-container'>
            {loading && <div>Loading</div>}
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
}
