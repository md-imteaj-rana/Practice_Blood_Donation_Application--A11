import { Link, NavLink } from "react-router";
import { useContext, useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";

import auth from "../firebase/firebase.config";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
    setMobileOpen(false);
    Swal.fire({
      title: "Logged out successfully",
      icon: "success",
    });
    window.location.href = "/";
  };

  const navLinkClass =
    "text-gray-700 hover:text-red-600 font-medium transition";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🩸</span>
          <span className="text-xl font-semibold text-gray-800">
            BloodConnect
          </span>
        </Link>

        
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>


          <NavLink to="/donation-requests" className={navLinkClass}>
            Donation Requests
          </NavLink>

          {user && (
            <NavLink to="/Funding" className={navLinkClass}>
              Funding
            </NavLink>
          )}
        </div>

        
        <div className="flex items-center gap-4">
          {!user ? (
            <Link
              to="/Login"
              className="hidden md:inline-block px-5 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button onClick={() => setOpen(!open)}>
                <img
                  src={user.photoURL || "https://i.ibb.co/2kR7G6C/user.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-red-500"
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg z-50">
                  <Link
                    to="/Dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-red-50"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-3 grid grid-cols-1">
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/donation-requests"
            onClick={() => setMobileOpen(false)}
            className={navLinkClass}
          >
            Donation Requests
          </NavLink>

          {user && (
            <NavLink
              to="/Funding"
              onClick={() => setMobileOpen(false)}
              className={navLinkClass}
            >
              Funding
            </NavLink>
          )}

          {!user ? (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block px-5 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 hover:text-red-600 font-medium"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="block text-left text-gray-700 hover:text-red-600 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
