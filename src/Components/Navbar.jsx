import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

import { signOut } from 'firebase/auth'
import auth from '../firebase/firebase.config'
import { AuthContext } from '../Provider/AuthProvider'
import Swal from 'sweetalert2'

const Navbar = () => {
    const {user} = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  

  const handleSignOut = () => {
    signOut(auth)
    Swal.fire({
              title: "LogOut success",
              icon: "success",
              draggable: true
            });
    navigate(location.state - '/');
  }

  return (
    <div className=''>
      <div className="navbar bg-base-100 shadow-sm px-8">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><Link to="/">Home</Link></li>
                <li>
                <Link to="/Services">Pets & Supplies</Link>
                </li>
                {
                  user && (
                    <>
                    <li><Link to="/Profile">My profile</Link></li>
                    <li><Link to="/AddService">Donation requests</Link></li>
                    <li><Link to="/MyServices">My Listings</Link></li>
                    <li><Link to="/MyOrders">My Orders</Link></li>
                    </>
                  )
                }
            </ul>
            </div>
            <Link to={'/'} className="btn btn-ghost text-2xl font-bold -ml-4.5">Blood Donation</Link>

        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            <li><Link to="/">Home</Link></li>
            <li>
                
                <Link to='/Services'>Pets & Supplies</Link>
    
            </li>
            {
                  user && (
                    <>
                    <li><Link to="/Profile">My profile</Link></li>
                    <li><Link to="/AddService">Donation requests</Link></li>
                    <li><Link to="/MyServices">Funding Links</Link></li>
                    <li><Link to="/MyOrders">My Orders</Link></li>
                    </>
                  )
                }
            </ul>
        </div>

    
    <Link to={'/Dashboard/main'} className="btn px-6 btn-primary shadow-none bg-gray-800">Dashboard</Link>
    {
    user && <div className="navbar-end">
    <button onClick={handleSignOut} className="btn px-6 btn-primary shadow-none bg-gray-800">Logout</button>
    </div>
    }
    {
    !user && <div className="navbar-end">
    <Link to={'/Login'} className="btn px-6 btn-primary shadow-none bg-gray-800">Login</Link>
    </div>
    }
        </div>
    </div>
  )
}

export default Navbar