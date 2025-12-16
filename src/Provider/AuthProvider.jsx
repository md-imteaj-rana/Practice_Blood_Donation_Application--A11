import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth from '../firebase/firebase.config';

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


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
            console.log(currentUser)
      })
      return () => {
        unsubscribe()
      }
    },[])

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