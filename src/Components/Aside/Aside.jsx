import {
  LayoutDashboard,
  User,
  PlusCircle,
  List,
  Users,
  Droplet,
} from "lucide-react";
import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const DashboardAside = () => {

  const {role} = useContext(AuthContext)
  //console.log(role)

  const navItemStyle =
    "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-100 transition";

  const activeStyle = "bg-red-600 text-white";

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm md:hidden">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <Link to={'/Dashboard'}><a>Dashboard</a></Link>
            <Link to={'/Dashboard/profile'}><a>Profile</a></Link>
            <Link to={'/Dashboard/create-request'}><a>Create Request</a></Link>
            {/* {
              role == 'donor' && (
                
              )
            } */}
            
            <Link to={'/Dashboard/my-requests'}><a>My Requests</a></Link>
            {
              role == 'admin' && (
                <Link to={'/Dashboard/all-users'}><a>All Users</a></Link>
              )
            }
            <Link to={'/Dashboard/all-request'}><a>All Requests</a></Link>
            
          </ul>
        </div>

        <Link to={'/'}>
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Blood<span className="text-gray-800">Connect</span>
        </h1>
        
      </div>
      </Link>

        
      </div>
    </div>

    <aside className="w-64 min-h-screen bg-white border-r shadow-sm fixed hidden md:block">
      {/* Logo */}
      <Link to={'/'}>
      <div className="p-5 text-center border-b">
        <h1 className="text-2xl font-bold text-red-600">
          Blood<span className="text-gray-800">Connect</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Dashboard Panel
        </p>
      </div>
      </Link>

      {/* Menu */}
      <nav className="p-4 space-y-1 text-gray-700">

        {/* Dashboard Home */}
        <NavLink
          to="/Dashboard"
          end
          className={({ isActive }) =>
            `${navItemStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/Dashboard/profile"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <User size={20} />
          Profile
        </NavLink>

        {/* Create Donation Request */}
        <NavLink
              to="/Dashboard/create-request"
              className={({ isActive }) =>
                `${navItemStyle} ${isActive ? activeStyle : ""}`
              }
            >
              <PlusCircle size={20} />
              Create Request
            </NavLink>
        {/* {
          role == 'donor' && (
            
          )
        } */}

        {/* My Donation Requests */}
        <NavLink
          to="/Dashboard/my-requests"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <List size={20} />
          My Requests
        </NavLink>

        {/* All Users*/}
        {
          role == 'admin' && (
            <NavLink
              to="/Dashboard/all-users"
              className={({ isActive }) =>
                `${navItemStyle} ${isActive ? activeStyle : ""}`
              }
            >
              <Users size={20} />
              All Users
            </NavLink>
          )
        }

        {/* All Blood Donation Requests */}
        <NavLink
          to="/Dashboard/all-request"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <Droplet size={20} />
          All Requests
        </NavLink>

      </nav>
    </aside>
    </div>
  );
};

export default DashboardAside;
