import React, { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import useAxios from "../../../hooks/useAxios";

const initialUsers = [
  {
    id: 1,
    name: "Rahim Uddin",
    email: "rahim@email.com",
    role: "donor",
    status: "active",
    avatar: "https://i.ibb.co/9gL7wzM/user.png",
  },
];

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([])
    const axiosInstance = useAxios();

    useEffect(() => {
            axiosInstance.get(`/users`)
            .then(res => {
                setAllUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        },[axiosInstance])

  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((u) => u.status === filter);

  const updateUser = (id, updates) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      )
    );
    setOpenMenuId(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <title>All Users</title>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            All Users
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users, roles, and access status.
          </p>
        </div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-4 md:mt-0 px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-red-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {
                allUsers?.map(allUser =>
                    {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                {/* User */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border"
                  />
                  <span className="font-medium">{user.name}</span>
                </td>

                {/* Email */}
                <td className="px-4 py-3">{user.email}</td>

                {/* Role */}
                <td className="px-4 py-3 capitalize">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-3 capitalize">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-center relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === user.id ? null : user.id
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenuId === user.id && (
                    <div className="absolute right-6 mt-2 w-44 bg-white border rounded shadow-md z-20 text-left">
                      {user.status === "active" ? (
                        <button
                          onClick={() =>
                            updateUser(user.id, { status: "blocked" })
                          }
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Block User
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updateUser(user.id, { status: "active" })
                          }
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Unblock User
                        </button>
                      )}

                      {user.role !== "volunteer" && (
                        <button
                          onClick={() =>
                            updateUser(user.id, { role: "volunteer" })
                          }
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Make Volunteer
                        </button>
                      )}

                      {user.role !== "admin" && (
                        <button
                          onClick={() =>
                            updateUser(user.id, { role: "admin" })
                          }
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
            <tr>
                <td
                colSpan="5"
                className="text-center py-8 text-gray-500"
                >
                No users found.
                </td>
            </tr>
            )}

                )
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
