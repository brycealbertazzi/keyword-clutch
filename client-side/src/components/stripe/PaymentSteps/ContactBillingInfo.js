import React, { useEffect, useState } from 'react'
import { UserInfoFields } from '../StripeUtils'
import '../stripe.css'

export const ContactBillingInfo = ({handleChange, setPage, userInfo}) => {
    const [contactInfoComplete, setContactInfoComplete] = useState(false)

    const checkRequiredFieldsFilledIn = () => {
        if (!userInfo[UserInfoFields.FIRST_NAME] || !userInfo[UserInfoFields.LAST_NAME] || !userInfo[UserInfoFields.EMAIL] || !userInfo[UserInfoFields.ADDRESS_LINE1] || !userInfo[UserInfoFields.ZIP]) {
            setContactInfoComplete(false)
            return
        }
        setContactInfoComplete(true)
    }

    useEffect(() => {
        checkRequiredFieldsFilledIn()
    }, [userInfo])

    useEffect(() => {
        console.log(contactInfoComplete)
    }, [contactInfoComplete])

    return (
        <div className='stripe-payment-container'>
            <div className='stripe-payment-section'>
                <h5 className='stripe-form-header'>Contact Information</h5>
                <div className='stripe-row'>
                    <div className='stripe-field'>
                        <label className='stripe-label'>First Name *</label>
                        <input type='text' placeholder='First Name' className='stripe-input' value={userInfo[UserInfoFields.FIRST_NAME]} onChange={(e) => handleChange(e, UserInfoFields.FIRST_NAME)}/>
                    </div>
                    <div className='stripe-field'>
                        <label className='stripe-label'>Last Name *</label>
                        <input type='text' placeholder='Last Name' className='stripe-input' value={userInfo[UserInfoFields.LAST_NAME]} onChange={(e) => handleChange(e, UserInfoFields.LAST_NAME)}/>
                    </div>
                </div>
                <div className='stripe-field'>
                    <label className='stripe-label'>Email *</label>
                    <input type='email' placeholder='Email' className='stripe-input' value={userInfo[UserInfoFields.EMAIL]} onChange={(e) => handleChange(e, UserInfoFields.EMAIL)}/>
                </div>
            </div>
            <div className='stripe-payment-section'>
                <h5 className='stripe-form-header'>Billing Address</h5>
                <div className='stripe-row'>
                    <div className='stripe-field'>
                        <label className='stripe-label'>Address Line 1 *</label>
                        <input type='text' placeholder='Address Line 1' className='stripe-input' value={userInfo[UserInfoFields.ADDRESS_LINE1]} onChange={(e) => handleChange(e, UserInfoFields.ADDRESS_LINE1)}/>
                    </div>
                    <div className='stripe-field'>
                        <label className='stripe-label'>Address Line 2</label>
                        <input type='text' placeholder='Address Line 2' className='stripe-input' value={userInfo[UserInfoFields.ADDRESS_LINE2]} onChange={(e) => handleChange(e, UserInfoFields.ADDRESS_LINE2)}/>
                    </div>
                </div>
                <div className='stripe-row'>
                    <div className='stripe-field'>
                        <label className='stripe-label'>City</label>
                        <input type='text' placeholder='City' className='stripe-input' value={userInfo[UserInfoFields.CITY]} onChange={(e) => handleChange(e, UserInfoFields.CITY)}/>
                    </div>
                    <div className='stripe-field'>
                        <label htmlFor='state' className='stripe-label'>State</label>
                        <select id="state" name="state" value={userInfo[UserInfoFields.STATE]} onChange={(e) => handleChange(e, UserInfoFields.STATE)}>
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
                        <label className='stripe-label'>ZIP Code *</label>
                        <input type='text' placeholder='ZIP Code' className='stripe-input' value={userInfo[UserInfoFields.ZIP]} onChange={(e) => handleChange(e, UserInfoFields.ZIP)}/>
                    </div>
                    <div className='stripe-field'>
                        <label htmlFor='country' className='stripe-label'>Country</label>
                        <select id="country" name="country" value={userInfo[UserInfoFields.COUNTRY]} onChange={(e) => handleChange(e, UserInfoFields.COUNTRY)}>
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
                <button onClick={() => setPage(2)} className='app-button' disabled={!contactInfoComplete}>Next</button>
            </div>
        </div>
    )
}
