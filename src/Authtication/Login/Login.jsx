import React, { useContext, useEffect, useRef, useState } from 'react';
import background from"../../assets/image/authentication.png"
import authImage from"../../assets/image/authentication1.png"
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
  const {signIn}=useContext(Authcontext)
    const captchref=useRef(null)
    const [disabled,setDisabled]=useState(true)
    const navigate=useNavigate();
    const location=useLocation()
    useEffect(()=>{
         loadCaptchaEnginge(6); 
    },[])
    const handleLogin=event=>{
        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password)
        
  const from = location.state?.from?.pathname || "/";
       
        signIn(email,password)
        .then(result=>{
          toast.success('User Login successfully!');
          const user=result.user
          console.log(user)
          
      navigate(from, { replace: true }); 
        })
          .catch(error => {
      console.error(error);
      toast.error(`Login failed: ${error.message}`);
    });
    }
    const handlevalidatecaptch=()=>{
       const value=captchref.current.value;
       console.log(value)
       if(validateCaptcha(value)){
      setDisabled(false)
       }
       else{
     setDisabled(true)
       }
    }
    return (
<>
<Helmet>
  <title>Login | Smart StudyHub</title>
  <meta name="description" content="Study smarter with our collaborative platform." />
</Helmet>

        <div className="hero bg-base-200 min-h-screen" style={{backgroundImage:`url(${background})`,backgroundSize:"cover",backgroundPosition:"center"}}>
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
     
   
   <img src={authImage} alt="" />
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form  onSubmit={handleLogin} className="card-body">
         <h1 className="text-5xl font-bold text-center">Login now!</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="Password" name='password' placeholder="Password" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
             <LoadCanvasTemplate />
          </label>
          <input type="text" name='captcha' ref={captchref} placeholder="Type the text above" className="input input-bordered" required />
         <button onClick={handlevalidatecaptch} className="btn btn-outline btn-xs">Validate</button>
        </div>
        <div className="form-control mt-6">
            <input disabled={disabled} type="submit" value="login" className="btn btn-primary" />
          
        </div>
      </form>
      <Link to="/register"><button className='btn btn-outline'>Register</button></Link>
    </div>
  </div>
</div>
</>
    );
};

export default Login;