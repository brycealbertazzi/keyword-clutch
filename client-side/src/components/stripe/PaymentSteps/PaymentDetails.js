import React, { useState } from 'react'
import { CardElement } from '@stripe/react-stripe-js'
import { UserInfoFields } from '../StripeUtils'

export const PaymentDetails = ({handleChange, setPage, hidePaymentDetails, userInfo}) => {
    const [cardComplete, setCardComplete] = useState(false)

    const handleCardInputChange = (e) => {
        setCardComplete(e.complete)
    }

    return (
        <div className='stripe-payment-container' style={hidePaymentDetails ? {'display': "none"} : {'display': 'flex'}}>
            <div className='stripe-payment-section'>
                <h5 className='stripe-form-header'>Payment</h5>
                <div className='stripe-row'>
                    <div className='stripe-full-field'>
                        <label className='stripe-label'>Name on card</label>
                        <input type='text' placeholder='Name on card' className='stripe-input' value={userInfo[UserInfoFields.NAME_ON_CARD]} onChange={(e) => handleChange(e, UserInfoFields.NAME_ON_CARD)}/>
                    </div>
                </div>
                <div className='stripe-row'>
                    <div className='stripe-full-field'>
                        <label className='stripe-label'>Enter Card Details</label>
                        <CardElement 
                            className='card-element' 
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        fontFamily: 'Arial, sans-serif',
                                        color: 'white',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#fa755a',
                                    },
                                },
                            }}
                            onChange={handleCardInputChange}
                        />
                    </div>
                </div>
            </div>
            <div className='stripe-step-toggle'>
                <button onClick={() => setPage(1)} className='app-button'>Back</button>
                <button onClick={() => setPage(3)} className='app-button' disabled={!cardComplete}>Next</button>
            </div>
        </div>
    )
}
