import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseaxiosSecure/UseAxiosSecure";
import UseSession from "../../../Hooks/UseSession/UseSession";
import Useauth from "../../../Hooks/Useauth/Useauth";
import { toast } from "react-toastify";

const CheckOut = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientsecret] = useState('');
  const [error, setError] = useState();
  const { user } = Useauth();
  const axiosSecure = UseAxiosSecure();
  const [, sessions = []] = UseSession();
  const [transtionId, setTranstionId] = useState('');

  // calculate paid/free sessions
  const totalPaidAmount = sessions.filter(item => item.registrationFee > 0)
    .reduce((total, item) => total + item.registrationFee, 0);
  const freeSessionCount = sessions.filter(item => item.registrationFee === 0).length;
  const paidSessionCount = sessions.filter(item => item.registrationFee > 0).length;

  // get client secret
  useEffect(() => {
    if (totalPaidAmount > 0) {
      axiosSecure.post('/create-payment-intent', { price: totalPaidAmount })
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientsecret(res.data.clientSecret);
          } else {
            console.error("❌ No clientSecret in response", res.data);
          }
        });
    }
  }, [axiosSecure, totalPaidAmount]);

  // submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card
    });

    if (error) {
      console.log('payment error', error);
      setError(error.message);
    } else {
      setError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    });

    if (confirmError) {
      console.log('confirm error');
    } else {
      if (paymentIntent.status === "succeeded") {
        toast.success("🎉 Payment Successful!");
        setTranstionId(paymentIntent.id);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 md:px-6 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Complete Your Payment</h2>
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8 space-y-4"
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />
        
        <div className="bg-gray-50 p-4 rounded-md shadow-sm">
          <p className="text-gray-700">✅ Paid Sessions: <strong>{paidSessionCount}</strong></p>
          <p className="text-gray-700">🎁 Free Sessions: <strong>{freeSessionCount}</strong></p>
          <p className="text-gray-900 font-semibold">💳 Total To Pay: ${totalPaidAmount}</p>
        </div>

        <button 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          type="submit" 
          disabled={!stripe}
        >
          Pay ${totalPaidAmount}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {transtionId && (
          <p className="text-green-500 text-sm break-words">
            ✅ Your Transaction ID: <strong>{transtionId}</strong>
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckOut;
