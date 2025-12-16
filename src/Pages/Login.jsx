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
      <title>Login</title>

        <div className="min-h-screen bg-linear-to-br from-red-100 via-white to-red-50 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left – Motivation Section */}
            <div className="hidden lg:block space-y-6">
            <h1 className="text-5xl font-extrabold text-red-600 leading-tight">
                Welcome Back, Hero 🩸
            </h1>
            <p className="text-lg text-gray-700">
                Your return means another chance to save lives.
                Log in to connect with donors, request blood, and make a difference.
            </p>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white shadow-lg rounded-xl p-4">
                ❤️ Trusted Donors
                </div>
                <div className="bg-white shadow-lg rounded-xl p-4">
                🚑 Emergency Support
                </div>
                <div className="bg-white shadow-lg rounded-xl p-4">
                🏥 Hospital Verified
                </div>
                <div className="bg-white shadow-lg rounded-xl p-4">
                🌍 Nationwide Network
                </div>
            </div>
            </div>

            {/* Right – Login Card */}
            <div className="card bg-white w-full max-w-md shadow-2xl rounded-3xl">
            <div className="card-body space-y-5">

                <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">
                    Login to Your Account
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Continue your life-saving journey
                </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="label font-medium text-gray-700">Email</label>
                    <input
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    className="input input-bordered w-full focus:border-red-500"
                    placeholder="Enter your email"
                    required
                    />
                </div>

                <div>
                    <label className="label font-medium text-gray-700">Password</label>
                    <input
                    name="password"
                    type="password"
                    className="input input-bordered w-full focus:border-red-500"
                    placeholder="Enter your password"
                    required
                    />
                </div>

                <div className="flex items-center justify-between text-sm">
                    <button
                    type="button"
                    onClick={handleForget}
                    className="text-red-600 hover:underline font-medium"
                    >
                    Forgot password?
                    </button>

                    <Link
                    to="/Register"
                    className="text-gray-600 hover:text-red-600 hover:underline"
                    >
                    New here?
                    </Link>
                </div>

                <button className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-xl mt-2">
                    Login
                </button>

                <div className="divider">OR</div>

                <button
                    type="button"
                    onClick={googleSignin}
                    className="btn w-full bg-white text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-100"
                >
                    <svg
                    aria-label="Google logo"
                    width="18"
                    height="18"
                    viewBox="0 0 512 512"
                    className="mr-2"
                    >
                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                    </svg>
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