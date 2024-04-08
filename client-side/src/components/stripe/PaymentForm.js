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
import { CountryCodes, UserInfoFields } from './StripeUtils'

export const PaymentForm = () => {
    const navigate = useNavigate()
    const globalContext = useContext(GlobalContext)
    const { popUpModalData, setPopUpModalData } = globalContext
    const [page, setPage] = useState(1)
    const [userInfo, setUserInfo] = useState({})
    const stripe = useStripe()
    const elements = useElements()
    const [hidePaymentDetails, setHidePaymentDetails] = useState(true)
    const [hideReviewSubmit, setHideReviewSubmit] = useState(true)
    const [loading, setLoading] = useState(false)
    const submitFunc = useRef(null)
    const closeFunc = useRef(null)

    const subscribe = async (e) => {
        setLoading(true)
        setHideReviewSubmit(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
              name: userInfo[UserInfoFields.FIRST_NAME] + ' ' + userInfo[UserInfoFields.LAST_NAME],
              email: userInfo[UserInfoFields.EMAIL],
              address: {
                line1: userInfo[UserInfoFields.ADDRESS_LINE1],
                line2: userInfo[UserInfoFields.ADDRESS_LINE2] ? userInfo[UserInfoFields.ADDRESS_LINE2] : null,
                postal_code: userInfo[UserInfoFields.ZIP],
                city: userInfo[UserInfoFields.CITY] ? userInfo[UserInfoFields.CITY] : null,
                state: userInfo[UserInfoFields.STATE] ? userInfo[UserInfoFields.STATE] : null,
                country: CountryCodes[userInfo[UserInfoFields.COUNTRY]] ? CountryCodes[userInfo[UserInfoFields.COUNTRY]] : null,
              },
            },
          });
        if (error) {
            console.error('Error creating payment method:', error)
            setLoading(false)
            postHandleSubscribe(true)
            return
        }
        const {id} = paymentMethod
        if (!id) {
            setLoading(false)
            postHandleSubscribe(true)
            return
        }
        await axios.post('/api/stripe/subscribe', {
            customerObj: userInfo,
            paymentMethodId: id,
        }).then(res => {
            console.log('Subscription started: ', res.data)
            postHandleSubscribe(false)
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

    const postHandleSubscribe = (error) => {
        submitFunc.current = null
        if (error) {
            closeFunc.current = () => {setPage(2)}
            setPopUpModalData({ open: true, header: 'Error', message: 'We were unable to process your transaction, make sure your credit card and billing address are valid.' })
        } else {
            closeFunc.current = () => {navigate('/home')}
            setPopUpModalData({ open: true, header: 'You are subscribed!', message: `Thankyou for subscribing to Keyword Clutch!` })
        }
    }

    const handleChange = (e, type) => {
        setUserInfo({...userInfo, [type]: e.target.value})
    }

    useEffect(() => {
        switch (page) {
            case 1:
                setHidePaymentDetails(true)
                setHideReviewSubmit(true)
                break
            case 2:
                setHidePaymentDetails(false)
                setHideReviewSubmit(true)
                break
            case 3:
                setHidePaymentDetails(true)
                setHideReviewSubmit(false)
                break
            default:
                break
        }
    }, [page])

    if (page === 1) {
        return (
            <div className='stripe-page-container'>
                <ContactBillingInfo handleChange={handleChange} setPage={setPage} userInfo={userInfo}/>
            </div>
        )
    }

    return (
        <div className='stripe-page-container'>
            {loading && 
                <div style={{marginBottom: '30px'}}>
                    <LoadingSpinner type={null}/>
                </div> 
            }
            <PaymentDetails handleChange={handleChange} setPage={setPage} hidePaymentDetails={hidePaymentDetails} userInfo={userInfo}/>
            <ReviewSubmit userInfo={userInfo} setPage={setPage} handleSubmit={handleSubscribe} hideReviewSubmit={hideReviewSubmit}/>
            {popUpModalData && popUpModalData.open && <PopUpModal submitFunc={submitFunc?.current} closeFunc={closeFunc?.current}/>}
        </div>
    )
}
