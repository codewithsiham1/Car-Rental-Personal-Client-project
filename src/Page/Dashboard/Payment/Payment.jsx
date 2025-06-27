import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOut from '../CheckOut/CheckOut';

// Load Stripe publishable key from .env
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <Elements stripe={stripePromise}>
          <CheckOut />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
