import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import auth from '../firebase/firebase.config'
import Swal from 'sweetalert2'
import { AuthContext } from '../Provider/AuthProvider'

const Login = () => {

  const {setUser, handleGoogleSignin} = useContext(AuthContext)

  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

   const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const pass = e.target.password.value;

        signInWithEmailAndPassword(auth, email, pass)
          .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          setUser(user)
          // alert("Login success")
          Swal.fire({
          title: "Login success",
          icon: "success",
          draggable: true
        });
          navigate(location.state ? location.state : '/')
          // ...
        })
        .catch((error) => {
          console.log(error)
          alert(error)
        });

      }
      //console.log(user)

      const googleSignin = () => {
      handleGoogleSignin()
      .then(result => {
        const user = result.user
        setUser({
          ...user,
          displayName: user.displayName || "User",
          photoURL: user.photoURL || "https://i.ibb.co/default-avatar.png"
        })
        // alert("Login success.")
        navigate(location.state ? location.state : '/')
      })
      .catch(err => console.log(err))
    }

    const handleForget = () => {
    navigate(`/ForgetPass/${email}`)
    }

  return (
    <div>
      <title>Login to PawMart</title>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-5">Login now!</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <form onSubmit={handleSubmit} className="fieldset">
                <label className="label text-gray-800">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} name='email' type="email" className="input" placeholder="Email" required />

                <label className="label text-gray-800">Password</label>
                <input name='password' type="password" className="input" placeholder="Password" required/>

                <div><button type="button" onClick={handleForget} className="link link-hover text-red-700 underline">Forgot password</button></div>
                <div className='underline text-blue-600'><Link to={'/Register'}>New here? Register now.</Link></div>
                <button className="btn btn-neutral mt-4 bg-gray-800 rounded-lg">Login</button>
                <button type="button" onClick={googleSignin} className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
                  </button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login