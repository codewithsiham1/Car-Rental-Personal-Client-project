import React, { createContext, useContext, useState } from 'react';
import background from"../../assets/image/authentication.png"
import authImage from"../../assets/image/authentication2.png"
import { Helmet } from 'react-helmet-async';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';
import auth from '../../Firebase/Firebase';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
const Register = () => {
   const [error,setError]=useState('')
   const [password,setPassword]=useState('')
   const {createUser}=useContext(Authcontext)
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
   console.log(name,email,password)
     const from = location.state?.from?.pathname || "/";
   createUser(email,password)
   .then(result=>{
     toast.success('User registered successfully!');
    const user=result.user;
    console.log(user)
    updateProfile(user,{displayName:name,photoURL:photo})
    .then(()=>{
 console.log("user profile info updated")
 toast.success("Sucessfully Update")
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
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
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