import React, { useContext, useEffect, useRef, useState } from 'react';
import background from "../../assets/image/authentication.png";
import authImage from "../../assets/image/authentication1.png";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const { signIn, googlelogin, githublogin } = useContext(Authcontext);
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        toast.success('Login successful!');
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.message}`);
      });
  };

  const handleValidateCaptcha = () => {
    const userCaptchaValue = captchaRef.current.value;
    if (validateCaptcha(userCaptchaValue)) {
      setDisabled(false);
      toast.success("Captcha matched!");
    } else {
      setDisabled(true);
      toast.error("Captcha does not match!");
    }
  };

  const handleGoogleLogin = () => {
    googlelogin()
      .then((result) => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(`Google login failed: ${error.message}`);
      });
  };

  return (
    <>
      <Helmet>
        <title>Login | Smart StudyHub</title>
        <meta name="description" content="Study smarter with our collaborative platform." />
      </Helmet>

      <div className="hero bg-base-200 min-h-screen" style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img src={authImage} alt="Login Illustration" />
          </div>

          <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <h1 className="text-4xl font-bold text-center">Login</h1>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <div className="flex gap-2">
                  <input type="text" ref={captchaRef} placeholder="Type captcha" className="input input-bordered w-full" />
                  <button type="button" onClick={handleValidateCaptcha} className="btn btn-outline btn-sm">Validate</button>
                </div>
              </div>

              <div className="form-control mt-4">
                <button type="submit" disabled={disabled} className="btn btn-primary">
                  Login
                </button>
              </div>
            </form>

            <div className="px-8 pb-4">
              <button onClick={handleGoogleLogin} className="btn btn-outline w-full mb-2">
                Continue with Google
              </button>
              <Link to="/register">
                <button className="btn btn-link w-full">Don't have an account? Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
