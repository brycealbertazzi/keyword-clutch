import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './stripe.css'
import { UserInfoFields } from './StripeUtils'
import { v4 as uuidv4 } from 'uuid'

export const PaymentForm = () => {
    const [paymentSuccessful, setPaymentSuccessful] = useState(false)
    const [page, setPage] = useState(1)
    const [userInfo, setUserInfo] = useState({})
    const stripe = useStripe()
    const elements = useElements()

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

    return (
        <>
        {!paymentSuccessful ? (
            <div className='stripe-page-container'>
                {/* Page 1: Contact Info/Billing Address */}
                {page === 1 && (
                    <div className='stripe-payment-container'>
                        <div className='stripe-payment-section'>
                            <h5 className='stripe-form-header'>Contact Information</h5>
                            <div className='stripe-row'>
                                <div className='stripe-field'>
                                    <label className='stripe-label'>First Name</label>
                                    <input type='text' placeholder='First Name' className='stripe-input' onChange={(e) => handleChange(e, UserInfoFields.FIRST_NAME)}/>
                                </div>
                                <div className='stripe-field'>
                                    <label className='stripe-label'>Last Name</label>
                                    <input type='text' placeholder='Last Name' className='stripe-input' onChange={(e) => handleChange(e, UserInfoFields.LAST_NAME)}/>
                                </div>
                            </div>
                            <div className='stripe-field'>
                                <label className='stripe-label'>Email</label>
                                <input type='email' placeholder='Email' className='stripe-input' onChange={(e) => handleChange(e, UserInfoFields.EMAIL)}/>
                            </div>
                        </div>
                        <div className='stripe-payment-section'>
                            <h5 className='stripe-form-header'>Billing Address</h5>
                            <div className='stripe-row'>
                                <div className='stripe-field'>
                                    <label className='stripe-label'>Address Line 1</label>
                                    <input type='text' placeholder='Address Line 1' className='stripe-input' onChange={(e) => handleChange(e, UserInfoFields.ADDRESS_LINE1)}/>
                                </div>
                                <div className='stripe-field'>
                                    <label className='stripe-label'>Address Line 2</label>
                                    <input type='text' placeholder='Address Line 2' className='stripe-input' onChange={(e) => handleChange(e, UserInfoFields.ADDRESS_LINE2)}/>
                                </div>
                            </div>
                            <div className='stripe-row'>
                                <div className='stripe-field'>
                                    <label className='stripe-label'>City</label>
                                    <input type='text' placeholder='City' className='stripe-input' onChange={(e) => handleChange(e, UserInfoFields.CITY)}/>
                                </div>
                                <div className='stripe-field'>
                                    <label for='state' className='stripe-label'>State</label>
                                    <select id="state" name="state" onChange={(e) => handleChange(e, UserInfoFields.STATE)}>
                                        <option value="">Select State</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                </div>
                            </div>
                            <div className='stripe-row'>
                                <div className='stripe-field'>
                                    <label className='stripe-label'>ZIP Code</label>
                                    <input type='text' placeholder='ZIP Code' className='stripe-input' onChange={(e) => handleChange(e, UserInfoFields.ZIP)}/>
                                </div>
                                <div className='stripe-field'>
                                    <label for='country' className='stripe-label'>Country</label>
                                    <select id="country" name="country"  onChange={(e) => handleChange(e, UserInfoFields.COUNTRY)}>
                                        <option value="">Select Country</option>
                                        <option value="United States">United States</option>
                                        <option value="Canada">Canada</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Germany">Germany</option>
                                        <option value="France">France</option>
                                        <option value="Italy">Italy</option>
                                        <option value="Spain">Spain</option>
                                        <option value="Japan">Japan</option>
                                        <option value="China">China</option>
                                        <option value="India">India</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='stripe-step-toggle'>
                            <div></div>
                            <button onClick={() => setPage(2)} className='app-button'>Next</button>
                        </div>
                    </div>
                )}
                {/* Page 2: Payment Information */}
                {page === 2 && (
                    <div className='stripe-payment-container'>
                        <div className='stripe-payment-section'>
                            <h5 className='stripe-form-header'>Payment</h5>
                            <div className='stripe-row'>
                                <div className='stripe-full-field'>
                                    <label className='stripe-label'>Name on card</label>
                                    <input type='text' placeholder='Name on card' className='stripe-input' />
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
                                                    color: '#32325d',
                                                    '::placeholder': {
                                                        color: '#aab7c4',
                                                    },
                                                },
                                                invalid: {
                                                    color: '#fa755a',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='stripe-step-toggle'>
                            <button onClick={() => setPage(1)} className='app-button'>Back</button>
                            <button onClick={() => setPage(3)} className='app-button'>Next</button>
                        </div>
                    </div>
                )}
                {/* Page 3: Confirmation */}
                {page === 3 && (
                    <div className='stripe-payment-container'>
                        <h2>Review & Submit</h2>
                        <div className='stripe-payment-section'>
                            <h5 className='stripe-form-header'>Contact Information</h5>
                            <div className='stripe-row'>
                                <div className='stripe-field'>
                                    <label className='stripe-label'>First Name</label>
                                    <p>{userInfo[UserInfoFields.FIRST_NAME]}</p>
                                </div>
                                <div className='stripe-field'>
                                    <label className='stripe-label'>Last Name</label>
                                    <p>{userInfo[UserInfoFields.LAST_NAME]}</p>
                                </div>
                            </div>
                            <div className='stripe-field'>
                                <label className='stripe-label'>Email</label>
                                <p>{userInfo[UserInfoFields.EMAIL]}</p>
                            </div>
                            <div className='stripe-payment-section'> 
                                <h5 className='stripe-form-header'>Billing Address</h5>
                                <div className='stripe-row'>
                                    <div className='stripe-field'>
                                        <label className='stripe-label'>Address Line 1</label>
                                        <p>{userInfo[UserInfoFields.ADDRESS_LINE1]}</p>
                                    </div>
                                    <div className='stripe-field'>
                                        <label className='stripe-label'>Address Line 2</label>
                                        <p>{userInfo[UserInfoFields.ADDRESS_LINE2]}</p>
                                    </div>
                                </div>
                                <div className='stripe-row'>
                                    <div className='stripe-field'>
                                        <label className='stripe-label'>City</label>
                                        <p>{userInfo[UserInfoFields.CITY]}</p>
                                    </div>
                                    <div className='stripe-field'>
                                        <label for='state' className='stripe-label'>State</label>
                                        <p>{userInfo[UserInfoFields.STATE]}</p>
                                    </div>
                                </div>
                                <div className='stripe-row'>
                                    <div className='stripe-field'>
                                        <label className='stripe-label'>ZIP Code</label>
                                        <p>{userInfo[UserInfoFields.ZIP]}</p>
                                    </div>
                                    <div className='stripe-field'>
                                        <label for='country' className='stripe-label'>Country</label>
                                        <p>{userInfo[UserInfoFields.COUNTRY]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button disabled={!stripe} onClick={handleSubmit} className='app-button'>Pay</button>
                        <div className='stripe-step-toggle'>
                            <button onClick={() => setPage(2)} className='app-button'>Back</button>
                        </div>
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
