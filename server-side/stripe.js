import { Router } from 'express'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import cors from 'cors'

dotenv.config()
const routes = Router()

const stripe = new Stripe(process.env.STRIPE_TEST_KEY)

// Function to check if a Stripe customer exists with the given email address
async function createNewOrReturnExistingCustomer(customerObj) {
  try {
      // Check if the customer already exists
      let customer = await stripe.customers.list({ email: customerObj['Email'] })
      // If customer exists, return it
      if (customer && customer.data && customer.data.length > 0) {
          const updatedCustomer = await stripe.customers.update(customer.data[0].id, {
            name: customerObj['First Name'] + ' ' + customerObj['Last Name'],
            address: {
              line1: customerObj['Address Line 1'],
              line2: customerObj['Address Line 2'],
              city: customerObj['City'],
              state: customerObj['State'],
              postal_code: customerObj['Zip Code'],
              country: customerObj['Country'],
            }
          })
          return { customer: updatedCustomer, message: 'Customer already exists.' }
      } else {
          // If customer doesn't exist, create a new one
          customer = await stripe.customers.create({
              email: customerObj['Email'],
              name: customerObj['First Name'] + ' ' + customerObj['Last Name'],
              address: {
                line1: customerObj['Address Line 1'],
                line2: customerObj['Address Line 2'],
                city: customerObj['City'],
                state: customerObj['State'],
                postal_code: customerObj['Zip Code'],
                country: customerObj['Country'],
              }
              // You can add more parameters like name, address, etc. as needed
          })
          return { customer: customer, message: 'New customer created.' }
      }
  } catch (error) {
      console.error('Error:', error)
      throw new Error('An error occurred while processing your request.')
  }
}

// Function to check if the user has a subscription associated with a specific price ID
async function hasSubscriptionWithPrice(customerId, priceId) {
  try {
    // Retrieve the customer's subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
    })

    // Find the subscription that matches the provided price ID
    const matchingSubscription = subscriptions.data.find(subscription => {
      return subscription.items.data.some(item => {
        return item.price.id === priceId
      })
    })
    console.log('matchingSubscription', matchingSubscription)
    return matchingSubscription
  } catch (error) {
    console.error('Error checking subscription with price:', error)
    throw new Error('An error occurred while checking subscription with price.')
  }
}

routes.get('/get-customer-data', async (req, res) => {
  try {
    const { customerEmail } = req.body
    const customer = await stripe.customers.list({ email: customerEmail })
    if (!customer || customer.data.length === 0) {
      res.status(200).send({ customerSubscription: null, customerData: null, paymentMethod: null})
      return
    }
    // Retrieve the customer's subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0].id,
      limit: 1, // Limit to the most recent subscription
    })
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.data[0].id,
      type: 'card', // Optionally filter by type, e.g., 'card', 'bank_account', etc.
    })
    const mostRecentPaymentMethod = paymentMethods.data[0] ? paymentMethods.data.sort((a, b) => a.created - b.created)[0] : null
    res.status(200).json({ customerSubscription: subscriptions?.data[0] ? subscriptions.data[0] : null, customerData: customer.data[0], paymentMethod: mostRecentPaymentMethod})
  } catch (error) {
    console.error('Error checking customer:', error)
    res.status(500).json({ error: 'An error occurred while checking the customer.' })
  }
})

// Route to create a subscription
routes.post('/subscribe', cors(), async (req, res) => {
  const { customerObj, paymentMethodId } = req.body

  const customer = await createNewOrReturnExistingCustomer(customerObj)
  console.log('updatedCustomer', customer)

  try {
    // Create a payment method
    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.customer.id,
    })
    console.log('paymentMethod', paymentMethod)

    // Set the default payment method on the customer
    await stripe.customers.update(customer.customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
    })
    console.log('customerId', customer.customer.id)
    const matchingSubscription = await hasSubscriptionWithPrice(customer.customer.id, process.env.TEST_KEYWORD_CLUTCH_STRIPE_PRICE_ID)
    console.log('matchingSubscription', matchingSubscription)
    if (!matchingSubscription) {
      // Create the subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.customer.id,
        items: [{ price: process.env.TEST_KEYWORD_CLUTCH_STRIPE_PRICE_ID, quantity: 1}],
        expand: ['latest_invoice.payment_intent'],
      })
      console.log('subscription', subscription)
      res.status(200).json({ subscription })
    } else {
      // Update the subscription with the new price (plan)
      const updatedSubscription = await stripe.subscriptions.update(matchingSubscription.id, {
        trial_end: 'now', // End the trial immediately
        billing_cycle_anchor: 'now', // Set the next billing cycle to now
        proration_behavior: 'create_prorations', // Prorate charges for changes immediately
      })
      console.log('subscription', updatedSubscription)
      res.status(200).json({ updatedSubscription })
    }
  } catch (error) {
    console.error('Error creating subscription:', error)
    res.status(500).json({ error: 'Failed to create subscription' })
  }
})

routes.post('/start-free-trial', async (req, res) => {
  try {
    const { customerEmail } = req.body
    console.log('customerEmail', customerEmail)
    // Create a customer without requiring a payment method
    const customer = await stripe.customers.create({
      email: customerEmail,
    })

    // Create a subscription with a trial period
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.TEST_KEYWORD_CLUTCH_STRIPE_PRICE_ID }],
      trial_period_days: 3, // # of days for the trial period
      cancel_at_period_end: true, // Automatically cancel the subscription at the end of the trial period
    })

    res.status(200).json({ subscription })
  } catch (error) {
    console.error('Error starting free trial:', error)
    res.status(500).json({ error: 'An error occurred while starting the free trial.' })
  }
})

export default routes
