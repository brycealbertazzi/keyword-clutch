import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';

const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISHABLE_STRIPE_KEY
const stripePromise = loadStripe(PUBLISHABLE_KEY)

export const StripeContainer = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    )
}
