import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import './payment.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
  const { fullName, totalAmount, bookAt } = bookingDetails;

  const [customerAddress, setCustomerAddress] = useState('');

  useEffect(() => {
    if (fullName && totalAmount && customerAddress && bookAt) {
      fetch(`${BASE_URL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount, customerName: fullName, customerAddress, bookAt }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setError('Failed to get client secret.');
          }
        })
        .catch(err => setError(`Error: ${err.message}`));
    }
  }, [fullName, totalAmount, customerAddress, bookAt]);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    // Ensure clientSecret is a valid string
    if (!clientSecret) {
      setError('Missing client secret.');
      setProcessing(false);
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: fullName,
          address: {
            line1: customerAddress,
            country: 'IN',
          },
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      // Send booking data to backend
      fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(bookingDetails),
      })
      .then(() => {
        navigate('/thank-you');
      })
      .catch((err) => {
        setError(`Booking creation failed: ${err.message}`);
      });
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <form id="payment-form" onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="customerName">Name:</label>
          <input
            id="customerName"
            type="text"
            value={fullName}
            readOnly
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerAddress">Address:</label>
          <input
            id="customerAddress"
            type="text"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={totalAmount}
            readOnly
            required
          />
        </div>
        <div className="form-group card-details">
          <CardElement id="card-element" onChange={handleChange} options={{
            hidePostalCode: true,
            style: {
              base: {
                '::placeholder': {
                  color: '#a0aec0',
                },
                fontSize: '16px',
                color: '#4a5568',
              },
              invalid: {
                color: '#e53e3e',
              },
            },
            hideIcon: true,
          }} />
        </div>
        <button disabled={processing || disabled || succeeded} id="submit" className="payment-button">
          <span id="button-text">
            {processing ? 'Processing...' : 'Pay now'}
          </span>
        </button>
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
