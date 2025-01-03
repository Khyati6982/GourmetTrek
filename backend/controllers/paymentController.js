import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const { amount, customerName, customerAddress, bookAt } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in paise
      currency: 'inr',
      description: `Booking for ${customerName}`,
      shipping: {
        name: customerName,
        address: {
          line1: customerAddress,
          country: 'IN',
        },
      },
      metadata: {
        bookAt, // Store booking time in metadata
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
