import React, { useContext, useEffect, useRef, useState } from 'react';
import background from "../../assets/image/authentication.png";
import authImage from "../../assets/image/authentication1.png";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';

const Login = () => {
  const { signIn } = useContext(Authcontext);
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
      .then(async (result) => {
        const loggedUser = result.user;
        const response = await fetch('http://localhost:5000/jwt', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: loggedUser.email }),
        });
        const data = await response.json();
        localStorage.setItem('access-token', data.token);
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

  return (
    <>
      <Helmet>
        <title>Login | Smart StudyHub</title>
        <meta name="description" content="Study smarter with our collaborative platform." />
      </Helmet>

      <div
        className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full flex flex-col lg:flex-row overflow-hidden">

          {/* Image section - hidden on small screens */}
          <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-gray-100 p-10">
            <img src={authImage} alt="Login Illustration" className="object-contain max-h-[400px]" />
          </div>

          {/* Form section */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <h1 className="text-4xl font-bold text-center mb-8">Login</h1>

            <form onSubmit={handleLogin} className="space-y-6">

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Captcha</label>
                <LoadCanvasTemplate />
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    ref={captchaRef}
                    placeholder="Type captcha"
                    className="input input-bordered w-full"
                  />
                  <button
                    type="button"
                    onClick={handleValidateCaptcha}
                    className="btn btn-outline btn-sm"
                  >
                    Validate
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={disabled}
                className={`btn btn-primary w-full mt-4 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Login
              </button>
            </form>

            <div className="px-8 pb-4">
              <SocialLogin />
              <Link to="/register">
                <button className="btn btn-link w-full mt-4">Don't have an account? Register</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
