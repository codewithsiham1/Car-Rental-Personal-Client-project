import { CardCvcElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import Usecart from '../../../Hooks/Usecart/Usecart';

const CheckOut = () => {
    const [error,setError]=useState('')
    const stripe=useStripe()
    const elements = useElements();
    const axiosSecure=UseAxiosSecure()
    const [cart]=Usecart();
    const [clientSecret,setClientSecret]=useState('')
    const totalprice=cart.reduce((total,item)=>total+item.price,0)
    useEffect(()=>{
     axiosSecure.post('/create-payment-intent',{price:totalprice})
     .then((res)=>{
        console.log(res.data.clientSecret)
        setClientSecret(res.data.cli)
     })
    },[axiosSecure,totalprice])
    const handleSubmit=async(event)=>{
    event.preventDefault();
    if(!stripe || !elements){
        return
    }
    const card=elements.getElement(CardElement)
    if(card===null){
        return
    }
    const {error,paymentMethod}=await stripe.createPaymentMethod({
        type:"card",
        card
    })
    if(error){
        console.log('payment error',error)
        setError(error.message)
    }
    else{
        console.log('payment method',paymentMethod)
        setError('')
    }
    }
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
      <p className='text-red-500'>{error}</p>
       </form>
    );
};

export default CheckOut;