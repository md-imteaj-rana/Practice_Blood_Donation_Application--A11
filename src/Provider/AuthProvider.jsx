import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const [role, setRole] = useState('')


    const registerWithEmailPassword = (email,pass) => {
        return createUserWithEmailAndPassword(auth,email,pass)
    }

    const handleGoogleSignin = () => {
      return signInWithPopup(auth, googleProvider)
    }

    

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(prev => {
              // If previous had Google photo but new one doesn't → KEEP previous
              if (prev?.photoURL && !currentUser?.photoURL) {
                return prev;
              }
              return currentUser;
            });
            //setUser(currentUser)
            setLoading(false)
            
      })
      return () => {
        unsubscribe()
      }
    },[])

    useEffect(() => {
        if(!user) return;
        axios.get(`http://localhost:5000/users/role/${user.email}`)
            .then( res => {
                setRole(res.data.role)
                
            })
    }, [user])

    console.log(role)

    const authData = {
        registerWithEmailPassword,
        setUser,
        user,
        handleGoogleSignin,
        loading
    }

  return <AuthContext value={authData}>
    {children}
  </AuthContext>
}

export default AuthProvider