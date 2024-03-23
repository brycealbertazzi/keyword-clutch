/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalContext from '../../global/GlobalContext'
import axios from 'axios'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './stripe.css'
import '../../App.css'
import { ContactBillingInfo } from './PaymentSteps/ContactBillingInfo'
import { ReviewSubmit } from './PaymentSteps/ReviewSubmit'
import { PaymentDetails } from './PaymentSteps/PaymentDetails'
import { PopUpModal } from '../PopUpModal'
import { LoadingSpinner } from '../../LoadingSpinner'

export const PaymentForm = () => {
    const navigate = useNavigate()
    const globalContext = useContext(GlobalContext)
    const { popUpModalData, setPopUpModalData } = globalContext
    const [page, setPage] = useState(1)
    const [userInfo, setUserInfo] = useState({})
    const stripe = useStripe()
    const elements = useElements()
    const [hidePaymentDetails, setHidePaymentDetails] = useState(true);
    const [loading, setLoading] = useState(false)
    const submitFunc = useRef(null)
    const closeFunc = useRef(null)

    const subscribe = async (e) => {
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
            postHandleSubscribe()
        }).catch(e => {
            console.error('Error starting subscription:', e)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleSubscribe = () => {
        submitFunc.current = subscribe
        closeFunc.current = null
        setPopUpModalData({ open: true, header: 'Subscribe', message: 'Are you sure you want to subscribe?' })
    }

    const postHandleSubscribe = () => {
        submitFunc.current = null
        closeFunc.current = () => {navigate('/home')}
        setPopUpModalData({ open: true, header: 'You are subscribed!', message: `Thankyou for subscribing to Keyword Clutch!` })
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
            {loading && <LoadingSpinner type={null}/>}
            {/* Page 1: Contact Info/Billing Address */}
            {page === 1 && (
                <ContactBillingInfo handleChange={handleChange} setPage={setPage} />
            )}
            {/* Page 2: Payment Information */} 
            {/* Page 3: Confirmation */}
            {(page === 2 || page === 3) && (
                <div style={{display: loading ? 'none' : 'block'}}>
                    <PaymentDetails setPage={setPage} hidePaymentDetails={hidePaymentDetails}/>
                    <ReviewSubmit userInfo={userInfo} setPage={setPage} handleSubmit={handleSubscribe} hideReviewSubmit={!hidePaymentDetails}/>
                </div>
            )}
            {popUpModalData && popUpModalData.open && <PopUpModal submitFunc={submitFunc?.current} closeFunc={closeFunc?.current}/>}
        </div>
    )
}
