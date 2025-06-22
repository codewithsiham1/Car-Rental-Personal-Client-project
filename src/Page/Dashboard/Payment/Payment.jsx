import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOut from '../CheckOut/CheckOut';
// TODO:add publishibler key
const stripePromise=loadStripe(import.meta.env. VITE_PAYMENT_GATEWAY_PK)
const Payment = () => {
    return (
        <div>
            <div>
                <Elements stripe={stripePromise}>
                <CheckOut></CheckOut>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;