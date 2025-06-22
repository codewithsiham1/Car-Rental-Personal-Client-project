import React from 'react';
import Usecart from '../../../Hooks/Usecart/Usecart';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { axiosSecure } from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const Cart = () => {
    const [cart,refetch]=Usecart()
    const totalprice=cart.reduce((total,item)=>total+item.price,0)
    const handleDelete=(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/cart/${id}`)
                 .then((res)=>{
                    if(res.data.deletedCount>0){
                        refetch()
                        toast.success('Your File Has Been Deleted')
                    }
                 })
            
            }
          });
    }
    return (
        <div>
           <div className='flex flex-row justify-around my-10'>
           <h2 className="text-2xl font-bold">Total Orders:{cart.length}</h2>
           <h2 className='text-2xl font-bold'>Total Price:{totalprice}</h2>
          { cart.length ? <NavLink to="/dashboard/payment"><button  className='btn btn-outline'>Pay</button></NavLink>:<button disabled  className='btn btn-outline'>Pay</button>}
           </div>
           {/* table */}
           <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
        Number
        </th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        cart.map((item,index)=>  <tr key={item._id}>
        <th>
          <label>
         {index+1}
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
           
          </div>
        </td>
        <td>
        
         {item.name}
        </td>
       {item.price}
        <th>
          <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-lg"> <span><MdDelete /></span>delete</button>
        </th>
      </tr>)
      }
    
    
  
    
    </tbody>
   
   
  </table>
</div>
        </div>
    );
};

export default Cart;