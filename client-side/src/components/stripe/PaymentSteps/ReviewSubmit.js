import React from 'react'
import { UserInfoFields } from '../StripeUtils'

export const ReviewSubmit = ({userInfo, setPage, handleSubmit, hideReviewSubmit}) => {
    return (
        <div className='stripe-payment-container' style={hideReviewSubmit ? {'display': "none"} : {'display': 'flex'}}>
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
                            <label htmlFor='state' className='stripe-label'>State</label>
                            <p>{userInfo[UserInfoFields.STATE]}</p>
                        </div>
                    </div>
                    <div className='stripe-row'>
                        <div className='stripe-field'>
                            <label className='stripe-label'>ZIP Code</label>
                            <p>{userInfo[UserInfoFields.ZIP]}</p>
                        </div>
                        <div className='stripe-field'>
                            <label htmlFor='country' className='stripe-label'>Country</label>
                            <p>{userInfo[UserInfoFields.COUNTRY]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleSubmit} className='app-button'>Pay</button>
            <div className='stripe-step-toggle'>
                <button onClick={() => setPage(2)} className='app-button'>Back</button>
            </div>
        </div>
    )
}
