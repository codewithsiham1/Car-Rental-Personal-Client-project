import React, { createContext, useContext, useState } from 'react';
import background from"../../assets/image/authentication.png"
import authImage from"../../assets/image/authentication2.png"
import { Helmet } from 'react-helmet-async';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';
import auth from '../../Firebase/Firebase';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic/UseAxiosPublic';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
const Register = () => {
  const axiosPublic=UseAxiosPublic();
   const [error,setError]=useState('')
   const [password,setPassword]=useState('')
   const {createUser,refetchUserRole}=useContext(Authcontext)
   const navigate=useNavigate();
   const location=useLocation();
  
   const handleOnchance=(e)=>{
  const value=e.target.value;
  setPassword(value)
    if (value.length < 6) {
    setError("Password must be at least 6 characters long");
  } else if (!/[A-Z]/.test(value)) {
    setError("Must include at least one uppercase letter");
  } else if (!/[a-z]/.test(value)) {
    setError("Must include at least one lowercase letter");
  } else if (!/[0-9]/.test(value)) {
    setError("Must include at least one number");
  } else if (!/[!@#$%^&*]/.test(value)) {
    setError("Must include at least one special character (!@#$%^&*)");
  } else {
    setError('');
  }
   }
  const handleRegister=(event)=>{
    event.preventDefault();
    const form=event.target;
    const name=form.name.value;
    const photo=form.photo.value;
    const email=form.email.value;
   const password=form.password.value;
   const role=form.role.value;
   console.log(name,email,password,role)
  const from = location.state?.from?.pathname || "/";

   createUser(email,password)
   .then(result=>{
    form.reset();
     toast.success('User registered successfully!');
    const user=result.user;
    console.log(user)
    updateProfile(user,{displayName:name,photoURL:photo})
 
    .then(()=>{
         // create user entry in the database
    const userInfo={
      name:name,
      email:email,
       role: role,
    }
    axiosPublic.post('/user',userInfo)
    .then(res=>{
      if(res.data.insertedId){
        console.log('user axios public')
         toast.success("Sucessfully Update")
         refetchUserRole(email)
      }
    })
 console.log("user profile info updated")

    })
    .catch((error)=>{
   console.log(error)
    })
    
      navigate(from, { replace: true }); 
   })
     .catch(error => {
      console.error(error);
      toast.error(`Registration failed: ${error.message}`);
    });

  }


    return (
<>
<Helmet>
  <title>Register | Smart StudyHub</title>
  <meta name="description" content="Study smarter with our collaborative platform." />
</Helmet>
      <div className="hero bg-base-200 min-h-screen" style={{backgroundImage:`url(${background})`, backgroundSize: "cover",
        backgroundPosition: "center",}}>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      
    <img src={authImage} alt="" />
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleRegister} className="card-body">
        <h1 className="text-5xl text-center font-bold">Register now!</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="name" name='name' placeholder="Enter Your Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URl</span>
          </label>
          <input type="text" name='photo' placeholder="Enter Your Photo" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="Enter Your  email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input value={password} onChange={handleOnchance} type="password" name='password' placeholder="Enter Your  password" className="input input-bordered" required />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        
        </div>
        {/* role */}
          <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Role</span>
                </label>
                <select name="role" className="select select-bordered" required>
                  <option value="">Select a role</option>
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <SocialLogin></SocialLogin>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  </div>
</div>
</>
    );
};

export default Register;