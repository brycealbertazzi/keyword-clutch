import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';

// const PUBLISHABLE_STRIPE_KEY = 'pk_live_51OrnRKF65CKVrg3s7xlfQaJDQ5OFTI0DUoJQJoozX78rnd5MLhRCpHkacksdbDbS41S0YoiQwKsj7FYUxtHGfR6E003FR3LD7d'
const PUBLISHABLE_STRIPE_TEST_KEY = 'pk_test_51OrnRKF65CKVrg3sgDM5OaRidvjNukAa9JV1XCahoaJwOnoVu9Lz0hEdP5m6We1lFSO5KfNMxXYZuDzRuuBrmlsv00g6HcNuMp'
const stripePromise = loadStripe(PUBLISHABLE_STRIPE_TEST_KEY)

export const StripeContainer = () => {

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    )
}
