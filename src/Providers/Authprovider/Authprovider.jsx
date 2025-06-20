import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../../Firebase/Firebase';
export const Authcontext=createContext(null)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const Authprovider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)
    const [userRole, setUserRole] = useState(null);
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
    useEffect(()=>{
     const unsubscribe=onAuthStateChanged(auth,currentuser=>{
            setUser(currentuser);
            console.log("current user",currentuser)
                if (currentuser?.email === 'admin@example.com') {
      setUserRole('admin');
    } else if (currentuser?.email === 'tutor@example.com') {
      setUserRole('tutor');
    } else {
      setUserRole('student');
    }

            setLoading(false)
        })
        return()=>{
            return unsubscribe()
        }
    },[])
    const authinfo={
    user,loading,createUser,signIn,logOut, updateprofile,userRole,googlelogin,githublogin
    }
    return (
       <Authcontext.Provider value={authinfo}>
         {children}
       </Authcontext.Provider>
    );
};

export default Authprovider;