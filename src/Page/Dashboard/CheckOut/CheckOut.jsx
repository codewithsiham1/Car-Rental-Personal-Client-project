import { CardCvcElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import Usecart from '../../../Hooks/Usecart/Usecart';
import Useauth from '../../../Hooks/Useauth/Useauth';

const CheckOut = () => {
    const [error,setError]=useState('')
    const stripe=useStripe()
    const elements = useElements();
    const axiosSecure=UseAxiosSecure()
    const [cart]=Usecart();
    const [clientSecret,setClientSecret]=useState('')
    const totalprice=cart.reduce((total,item)=>total+item.price,0)
    const {user}=Useauth()
    const [transtionId,setTranstionId]=useState('')
    useEffect(()=>{
     axiosSecure.post('/create-payment-intent',{price:totalprice})
     .then((res)=>{
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
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
    // confirm payment
    const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:card,
        billing_details:{
            email:user?.email || 'anonymous',
             name:user?.displayName || 'anonymous'
        }
      }
    })
    if(confirmError){
        console.log('confirm error')
    }
    else{
        console.log('payment intent',paymentIntent)
        if(paymentIntent.status==='succeeded'){
            console.log('transtion id',paymentIntent.id)
            setTranstionId(paymentIntent.id)
            // now save the payment in the database
            const payment={
                email:user.email,
                price:totalprice,
                date:new Date(),
                transtionId:paymentIntent.id,
                cartId:cart.map(item=>item._id)
            }
           const res=await axiosSecure.post('/payments',payment)
           console.log('payment saved',res)
        }
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
           <button className='btn btn-primary my-2' type="submit" disabled={!stripe}>
        Pay
      </button>
      <p className='text-red-500'>{error}</p>
      {transtionId && <p className="text-green-500">Your Transaction Id: {transtionId}</p>}
       </form>
    );
};

export default CheckOut;