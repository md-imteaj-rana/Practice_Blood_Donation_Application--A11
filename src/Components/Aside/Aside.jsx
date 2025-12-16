
import {
  LayoutDashboard,
  User,
  Droplet,
  Users,
  HeartPulse,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router";

const DashboardAside = () => {
  const navItemStyle =
    "flex items-center gap-3 px-4 py-2 rounded-md hover:bg-red-100 transition";

  const activeStyle = "bg-red-600 text-white";

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-sm">
      {/* Logo */}
      <div className="p-5 text-center border-b">
        <h1 className="text-2xl font-bold text-red-600">
          Blood<span className="text-gray-800"> Connect</span>
        </h1>
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-1 text-gray-700">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive && activeStyle}`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive && activeStyle}`
          }
        >
          <User size={20} />
          Profile
        </NavLink>

        <NavLink
          to="/dashboard/donate"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive && activeStyle}`
          }
        >
          <Droplet size={20} />
          Donate Blood
        </NavLink>

        <NavLink
          to="/dashboard/donors"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive && activeStyle}`
          }
        >
          <Users size={20} />
          Find Donors
        </NavLink>

        <NavLink
          to="/dashboard/requests"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive && activeStyle}`
          }
        >
          <HeartPulse size={20} />
          Blood Requests
        </NavLink>

        <NavLink
          to="/dashboard/reports"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive && activeStyle}`
          }
        >
          <FileText size={20} />
          Reports
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `${navItemStyle} ${isActive && activeStyle}`
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-4 w-full px-4">
        <button className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-100 rounded-md">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardAside;
