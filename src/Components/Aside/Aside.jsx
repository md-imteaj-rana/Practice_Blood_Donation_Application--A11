import {
  LayoutDashboard,
  User,
  PlusCircle,
  List,
  Users,
  Droplet,
} from "lucide-react";
import { Link, NavLink } from "react-router";

const DashboardAside = () => {
  const navItemStyle =
    "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-100 transition";

  const activeStyle = "bg-red-600 text-white";

  return (
    <div>
      
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

        {/* All Users (Admin later) */}
        <NavLink
          to="/Dashboard/all-users"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive ? activeStyle : ""}`
          }
        >
          <Users size={20} />
          All Users
        </NavLink>

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
