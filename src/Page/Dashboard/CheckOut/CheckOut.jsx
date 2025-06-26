import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import Usecart from '../../../Hooks/Usecart/Usecart';
import Useauth from '../../../Hooks/Useauth/Useauth';
import { toast } from 'react-toastify';

const CheckOut = () => {
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const [cart, refetch] = Usecart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const { user } = Useauth();
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  // Get Stripe clientSecret
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPrice }).then(res => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    } else {
      setError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.log('Payment confirmation error', confirmError);
      toast.error("Payment failed. Please try again.");
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      // Save payment info to DB
      const payment = {
        email: user.email,
        price: totalPrice,
        date: new Date(),
        transactionId: paymentIntent.id,
        cartId: cart.map(item => item._id),
        status: 'paid',
      };

      try {
        const res = await axiosSecure.post('/payment', payment);
        if (res.data?.insertedId) {
          toast.success("Payment Successful!");

          // Delete all items from cart
          for (const item of cart) {
            await axiosSecure.delete(`/cart/${item._id}`);
          }

          refetch();
        }
      } catch (err) {
        console.error("Error saving payment:", err);
        toast.error("Something went wrong saving payment.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className='btn btn-primary my-2' type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      {error && <p className='text-red-500'>{error}</p>}
      {transactionId && (
        <p className="text-green-500">✅ Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOut;
