import { useLocation, useNavigate } from "react-router-dom";
import Useauth from "../../Hooks/Useauth/Useauth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic/UseAxiosPublic";
import { toast } from "react-toastify";


const SocialLogin = () => {
    const axiosPublic=UseAxiosPublic()
    const {googlelogin}=Useauth()
    const navigate=useNavigate()
    const location=useLocation()
     const handleGoogleLogin = () => {
      googlelogin()
        .then((result) => {
          const user = result.user;
          const userInfo = {
            email: user?.email,
            name: user?.displayName
          };
    
          axiosPublic.post("/user", userInfo)
            .then(res => {
              console.log("User saved:", res.data);
              toast.success("Logged in with Google!");
              // ✅ এখানে navigate করো
              navigate('/');
            })
            .catch((err) => {
              console.error("User save failed:", err);
              toast.warn("Login success, but failed to save user.");
              navigate(from, { replace: true }); // Even if saving fails, still navigate
            });
        })
        .catch((error) => {
          toast.error(`Google login failed: ${error.message}`);
        });
    };
    return (
        <div>
              <button onClick={handleGoogleLogin} className="btn btn-outline w-full mb-2">
                Continue with Google
              </button>
        </div>
    );
};

export default SocialLogin;