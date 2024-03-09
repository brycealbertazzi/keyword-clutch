import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';

const PUBLISHABLE_STRIPE_KEY = 'pk_live_51OrnRKF65CKVrg3s7xlfQaJDQ5OFTI0DUoJQJoozX78rnd5MLhRCpHkacksdbDbS41S0YoiQwKsj7FYUxtHGfR6E003FR3LD7d'
const stripePromise = loadStripe(PUBLISHABLE_STRIPE_KEY)

export const StripeContainer = () => {

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    )
}
