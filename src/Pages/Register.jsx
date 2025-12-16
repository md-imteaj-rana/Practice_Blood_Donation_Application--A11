import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
  const {registerWithEmailPassword, setUser, handleGoogleSignin} = useContext(AuthContext);

  const location = useLocation()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const name = e.target.name.value;
        const imageurl = e.target.imageurl.value;

        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/
        const number = /[0-9]/;           
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if(pass.length < 6){
          return alert("Password length can not be less than 6!!!")
        }

        if(!uppercase.test(pass)){
          return alert("You must use uppercase letters in your password.")
        }

        if(!lowercase.test(pass)){
          return alert("You must use lowercase letters in your password.")
        }

        if (!number.test(pass)) {
          return alert("You must include at least one number.");
        }

        if (!specialChar.test(pass)) {
          return alert("You must include at least one special character.");
        }

        registerWithEmailPassword(email, pass)
        .then((userCredential) =>{
            //const user = userCredential.user
            updateProfile(auth.currentUser, {
            displayName: name, photoURL: imageurl
            }).then(() => {
                setUser(userCredential.user)
                // alert("Registration successful")
                Swal.fire({
                title: "Registration successful",
                icon: "success",
                draggable: true
              });
                navigate(location.state ? location.state : '/')
            // Profile updated!
            // ...
            }).catch((error) => {
                console.log(error)
                // alert(error)
                Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                
              });
            // An error occurred
            // ...
            });
        })
        .catch((error) => {
        console.log(error)
        //alert(error)
         });

  }   
  
  const googleSignup = () => {
    handleGoogleSignin()
    .then(result => {
      const user = result.user
      setUser({...user, photoURL: user.photoURL, displayName: user.displayName})
      navigate(location.state ? location.state : '/')
      //alert("Registration success")
      Swal.fire({
                title: "Registration successful",
                icon: "success",
                draggable: true
              });
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <title>Signup to PawMart</title>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
            <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold mb-5">Welcome to the Blood Donation campaign!!🥳</h1>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <form onSubmit={handleSubmit} className="fieldset">
                <label className="label text-gray-800">Name</label>
                <input name='name' type="text" className="input" placeholder="Enter your name" required/>

                <label className="label text-gray-800">Image URL</label>
                <input name='imageurl' type="text" className="input" placeholder="Image URL" />

                <label className="label text-gray-800">Email</label>
                <input name='email'type="email" className="input" placeholder="Email" required/>

                <label className="label text-gray-800">Password</label>
                <input name='password'type="password" className="input" placeholder="Password" required/>
                
                <div className='underline text-blue-600'><Link to={'/Login'}>Already have an account? Login now.</Link></div>
                <button className="btn btn-neutral mt-4 bg-gray-800 rounded-lg">Sign Up</button>
                <button onClick={googleSignup} className="btn bg-white text-black border-[#e5e5e5]">
                  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                  Signup with Google
                </button>
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Register