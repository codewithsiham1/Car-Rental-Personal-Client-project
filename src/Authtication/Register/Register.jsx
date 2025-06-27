import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic/UseAxiosPublic';
import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
import background from "../../assets/image/authentication.png";
import authImage from "../../assets/image/authentication2.png";
import { Authcontext } from '../../Providers/Authprovider/Authprovider';

const Register = () => {
  const axiosPublic = UseAxiosPublic();
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const { createUser, refetchUserRole } = useContext(Authcontext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnChange = (e) => {
    const value = e.target.value;
    setPassword(value);
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
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    const from = location.state?.from?.pathname || "/";

    createUser(email, password)
      .then(result => {
        form.reset();
        toast.success('User registered successfully!');
        const user = result.user;
        updateProfile(user, { displayName: name, photoURL: photo })
          .then(() => {
            const userInfo = { name, email, role };
            axiosPublic.post('/user', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  toast.success("Successfully Updated");
                  refetchUserRole(email);
                }
              });
          })
          .catch(error => console.log(error));

        navigate(from, { replace: true });
      })
      .catch(error => {
        toast.error(`Registration failed: ${error.message}`);
      });
  };

  return (
    <>
      <Helmet>
        <title>Register | Smart StudyHub</title>
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

          {/* Image Section */}
          <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-gray-100 p-10">
            <img src={authImage} alt="Authentication" className="object-contain max-h-[400px]" />
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <h1 className="text-4xl font-bold text-center mb-8">Register now!</h1>
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Photo URL</label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Enter Your Photo URL"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Your Password"
                  required
                  className="input input-bordered w-full"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Select Role</label>
                <select
                  name="role"
                  required
                  className="select select-bordered w-full"
                >
                  <option value="">Select a role</option>
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <SocialLogin />

              <button type="submit" className="btn btn-primary w-full mt-4">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
