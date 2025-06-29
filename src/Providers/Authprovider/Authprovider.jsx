import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../../Firebase/Firebase';
import axios from 'axios';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic/UseAxiosPublic';

export const Authcontext=createContext(null)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const Authprovider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)
    const [userRole, setUserRole] = useState(null);
    const axiosPublic=UseAxiosPublic()
    const createUser=(email,password)=>{
        setLoading(true);
       return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn=(email,password)=>{
        setLoading(true)
       return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut=()=>{
        setLoading(true)
       return signOut(auth)
    }
    const googlelogin=()=>{
      setLoading(true)
     return signInWithPopup(auth,googleProvider)
    }
    const githublogin=()=>{
      setLoading(true)
     return signInWithPopup(auth,githubProvider)
    }
    const updateprofile=(name,photo)=>{
       return updateProfile(auth.currentUser, {
  displayName:name, photoURL:photo
})
    }
    const refetchUserRole=(email)=>{
      if(email){
        axios.get(`http://localhost:5000/user/${email}`)
        .then((res)=>{
          setUserRole(res.data.role)
        })
      }
    }
    useEffect(()=>{
     const unsubscribe=onAuthStateChanged(auth,currentuser=>{
            setUser(currentuser);
            console.log("current user",currentuser)
            if(currentuser){
           // get token store client side
           const userInfo={email:currentuser.email}
           axiosPublic.post('/jwt',userInfo)
           .then(res=>{
            if(res.data.token){
              localStorage.setItem('access-token',res.data.token)
            }
           })
            }
            else{
              // TODO:remove token(if token in the client side local storage)
                 localStorage.removeItem('access-token')
            }
            if(currentuser){
              // get role from database using email
              axios.get(`http://localhost:5000/user/${currentuser.email}`)
              .then((res)=>{
                setUserRole(res.data.role)
                setLoading(false)
              })
            }else{
              setUserRole(null)
              setLoading(false)
            }
        })
        return()=>{
            return unsubscribe()
        }
    },[axiosPublic])
    const authinfo={
    user,loading,createUser,signIn,logOut, updateprofile,userRole,googlelogin,githublogin,refetchUserRole
    }
    return (
       <Authcontext.Provider value={authinfo}>
         {children}
       </Authcontext.Provider>
    );
};

export default Authprovider;