import { useQueries, useQuery } from "@tanstack/react-query";
import Useauth from "../Useauth/Useauth";
import UseAxiosSecure from "../UseaxiosSecure/UseAxiosSecure";


const UseSession = () => {
    const axiosSecure=UseAxiosSecure();
    const {user}=Useauth();
    const {refetch,data:sessions=[]}=useQuery({
         queryKey:['sessions',user?.email],
         queryFn:async()=>{
            const res=await axiosSecure.get(`/sessions?email=${user.email}`)
            return res.data
         }
    })
    return [refetch, sessions]
};

export default UseSession;