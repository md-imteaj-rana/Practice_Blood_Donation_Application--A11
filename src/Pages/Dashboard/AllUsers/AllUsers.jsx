import React, { useEffect, useState, useContext } from "react";
import { MoreVertical } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider"; // optional if you want to prevent self-role change

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user: loggedInAdmin } = useContext(AuthContext); // current admin

  // Role list
  const ROLES = ["donor", "volunteer", "admin"];

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users by status
  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((u) => u.status === filter);

  // Update status (active / blocked)
  const updateStatus = async (email, status) => {
    try {
      await axiosSecure.patch("/update/user/status", { email, status });
      fetchUsers();
      setOpenMenuId(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Update role (admin / volunteer / donor)
  const updateRole = async (email, role) => {
    try {
      await axiosSecure.patch("/update/user/role", { email, role });
      fetchUsers();
      setOpenMenuId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <title>All Users</title>

      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">All Users</h1>
          <p className="text-sm text-gray-500">
            Manage users, roles, and access
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="bg-white border rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-red-50">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 flex gap-3 items-center">
                  <img
                    src={user.photoURL || user.avatar}
                    className="w-10 h-10 rounded-full border"
                  />
                  {user.name}
                </td>

                <td className="px-4 py-3">{user.email}</td>

                <td className="px-4 py-3 capitalize">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === user._id ? null : user._id)
                    }
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenuId === user._id && (
                    <div className="absolute right-4 mt-2 w-44 bg-white border rounded shadow z-20">
                      {/* Block / Unblock */}
                      {user.status === "active" ? (
                        <button
                          onClick={() => updateStatus(user.email, "blocked")}
                          className="block w-full px-4 py-2 hover:bg-gray-100"
                        >
                          Block User
                        </button>
                      ) : (
                        <button
                          onClick={() => updateStatus(user.email, "active")}
                          className="block w-full px-4 py-2 hover:bg-gray-100"
                        >
                          Unblock User
                        </button>
                      )}

                      {/* Role update */}
                      {user.status === "active" &&
                        ROLES.filter((role) => role !== user.role).map(
                          (roleOption) => {
                            if (user.email === loggedInAdmin?.email) return null;
                            return (
                              <button
                                key={roleOption}
                                onClick={() =>
                                  updateRole(user.email, roleOption)
                                }
                                className="block w-full px-4 py-2 hover:bg-gray-100 capitalize"
                              >
                                Make {roleOption}
                              </button>
                            );
                          }
                        )}
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
