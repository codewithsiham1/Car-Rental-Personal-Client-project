
import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../../Providers/Authprovider/Authprovider';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';


const MyPaments = () => {
     const { user } = useContext(Authcontext);
  const axiosSecure = UseAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPayments = async () => {
      if (user?.email) {
        setLoading(true);
        try {
          const res = await axiosSecure.get(`/payment/${user.email}`);
          setPayments(res.data);
        } catch (error) {
          console.error('Failed to fetch payments', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPayments();
  }, [user?.email, axiosSecure]);

  if (loading) return <div>Loading payments...</div>;
    return (
        <div>
      <h2>My Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        payments.map((payment) => (
          <div key={payment._id} className="border p-4 mb-3 rounded">
            <p><strong>Amount:</strong> ${payment.price}</p>
            <p><strong>Transaction ID:</strong> {payment.transtionId}</p>
            <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {payment.status}</p>
          </div>
        ))
      )}
    </div>
    );
};

export default MyPaments;