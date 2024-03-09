import { Router } from 'express'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import cors from 'cors'

dotenv.config()
const routes = Router()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Function to create a customer in Stripe
async function createCustomer(customerObj) {
  return await stripe.customers.create({
      name: customerObj['First Name'] + ' ' + customerObj['Last Name'],
      email: customerObj['Email'],
      address: {
        line1: customerObj['Address Line 1'],
        line2: customerObj['Address Line 2'],
        city: customerObj['City'],
        state: customerObj['State'],
        postal_code: customerObj['Zip Code'],
        country: customerObj['Country'],
      },
      shipping: {
        name: customerObj['First Name'] + ' ' + customerObj['Last Name'],
        address: {
          line1: customerObj['Address Line 1'],
          line2: customerObj['Address Line 2'],
          city: customerObj['City'],
          state: customerObj['State'],
          postal_code: customerObj['Zip Code'],
          country: customerObj['Country'],
        },
      }
  });
}

// Route to create a subscription
routes.post('/subscribe', cors(), async (req, res) => {
  const { customerObj, paymentMethodId } = req.body

  try {
    // Create a payment method
    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    })
    console.log('paymentMethod', paymentMethod)


    if (!customerObj) {
      // Create a new customer
      const customer = await createCustomer(customerObj)
      console.log('customer', customer)
    }

    // Set the default payment method on the customer
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    })

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.KEYWORD_CLUTCH_STRIPE_PRICE_ID, quantity: 1}],
      expand: ['latest_invoice.payment_intent'],
    })
    console.log('subscription', subscription)
    res.status(200).json({ subscription })
  } catch (error) {
    console.error('Error creating subscription:', error)
    res.status(500).json({ error: 'Failed to create subscription' })
  }
})

export default routes
