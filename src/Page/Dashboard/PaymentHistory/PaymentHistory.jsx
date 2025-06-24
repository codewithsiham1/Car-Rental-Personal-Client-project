import React from 'react';
import Useauth from '../../../Hooks/Useauth/Useauth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';

const PaymentHistory = () => {
    const {user}=Useauth()
    const axiosSecure=UseAxiosSecure()
    const {data:payments=[]}=useQuery({
        queryKey:['payments',user?.email],
        enabled: !!user?.email,
        queryFn:async()=>{
            const res=await axiosSecure.get(`/payment/${user.email}`)
            return res.data
        }
    })
    return (
        <div>
          <h1>Total Payments:{payments?.length}</h1> 
          <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>Number</th>
        <th>email</th>
        <th>price</th>
        <th>TranstionId</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {payments.map((payment,index)=>     <tr key={payment._id}>
        <th>{index+1}</th>
        <td>{payment.email}</td>
        <td>{payment.price}</td>
        <td>{payment.transtionId}</td>
        <td>{payment.status || 'N/A'}</td>
      </tr>)}
 
   
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;