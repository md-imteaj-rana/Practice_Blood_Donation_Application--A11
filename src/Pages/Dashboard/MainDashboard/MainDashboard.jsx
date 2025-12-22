import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const MainDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [myRequests, setMyRequests] = useState([]);
  
  const [role, setRole] = useState('')

  const [stats, setStats] = useState({
  totalDonors: 0,
  totalFunding: 0,
  totalRequests: 0,
  });

  useEffect(() => {
  if (role !== "admin") return;

  axiosSecure.get("/admin/stats").then(res => {
    setStats(res.data);
  });
  }, [axiosSecure, role]);


  useEffect(() => {
  if (!user?.email) return;

  axios
    .get(`http://localhost:5000/users/role/${user.email}`)
    .then(res => {
      setRole(res.data.role);
    })
    .catch(err => console.log(err));
}, [user?.email]);

  // Fetch donor's requests
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/requests/donor/${user.email}`)
      .then((res) => {
        setMyRequests(res.data || []);
      })
      .catch((err) => console.log(err));
  }, [axiosSecure, user?.email]);

  // Only latest 3 requests
  const recentRequests = myRequests.slice(0, 3);

  // Update status
  const updateStatus = (id, status) => {
    axiosSecure.patch(`/requests/${id}`, { donationStatus: status }).then(() => {
      Swal.fire("Success", `Status updated to ${status}`, "success");
      setMyRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, donationStatus: status } : r
        )
      );
    });
  };

  return (
    <div className="space-y-8">
      <title>Dashboard</title>

      {/*  Welcome Section */}
      <div className="bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg p-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.displayName} ❤️
        </h1>
        <p className="mt-1 text-red-100">
          Thank you for being a life saver. Here is a summary of your recent
          donation requests.
        </p>
      </div>

      {role == "donor" && (
        <>
          {/* Recent Requests */}
          {recentRequests?.length > 0 && (
            <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Donation Requests
                </h2>
              </div>

              <table className="w-full text-sm min-w-225">
                <thead className="bg-red-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Recipient</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Time</th>
                    <th className="px-4 py-3 text-left">Blood</th>
                    <th className="px-4 py-3 text-left">Donor Info</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {recentRequests.map((req) => (
                    <tr key={req._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{req.recipientName}</td>

                      <td className="px-4 py-3">
                        {req.recipientDistrict}, {req.recipientUpazila}
                      </td>

                      <td className="px-4 py-3">{req.date}</td>
                      <td className="px-4 py-3">{req.time}</td>

                      <td className="px-4 py-3 font-semibold text-red-600">
                        {req.bloodGroup}
                      </td>

                      {/* Donor Info (only inprogress) */}
                      <td className="px-4 py-3 text-xs">
                        {req.donationStatus === "inprogress" ? (
                          <>
                            <p>{req.donorName}</p>
                            <p className="text-gray-500">{req.donorEmail}</p>
                          </>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${req.donationStatus === "pending" && "bg-yellow-100 text-yellow-700"}
                          ${req.donationStatus === "inprogress" && "bg-blue-100 text-blue-700"}
                          ${req.donationStatus === "done" && "bg-green-100 text-green-700"}
                          ${req.donationStatus === "canceled" && "bg-red-100 text-red-700"}
                        `}>
                          {req.donationStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-center space-x-2">
                        <Link
                          to={`/RequestDetails/${req._id}`}
                          className="px-3 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-900"
                        >
                          View
                        </Link>

                        <Link
                          to={`/dashboard/edit-request/${req._id}`}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Edit
                        </Link>

                        {req.donationStatus === "inprogress" && (
                          <>
                            <button
                              onClick={() => updateStatus(req._id, "done")}
                              className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Done
                            </button>
                            <button
                              onClick={() => updateStatus(req._id, "canceled")}
                              className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* View All Button */}
              <div className="px-6 py-4 border-t text-right">
                <Link
                  to="/Dashboard/my-requests"
                  className="inline-block px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  View My All Requests
                </Link>
              </div>
            </div>
          )}
          </>
      )
        
      }

      {role == "admin" || role == "volunteer" && (
        <>
          {/* Admin  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Total Donors */}
            <div className="bg-white rounded-lg shadow-sm border p-6 flex items-center gap-5">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl">
                🧑‍🤝‍🧑
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Donors</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {stats.totalDonors}
                </h2>
              </div>
            </div>

            {/* Total Funding */}
            <div className="bg-white rounded-lg shadow-sm border p-6 flex items-center gap-5">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
                💰
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Funding</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  $ {stats.totalFunding}
                </h2>
              </div>
            </div>

            {/* Total Requests */}
            <div className="bg-white rounded-lg shadow-sm border p-6 flex items-center gap-5">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl">
                🩸
              </div>
              <div>
                <p className="text-sm text-gray-500">Blood Requests</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {stats.totalRequests}
                </h2>
              </div>
            </div>
          </div>
        </>
      )}
    
      
    </div>
  );
};

export default MainDashboard;
