import React, { useEffect, useState, useContext } from "react";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllRequests = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");

  const [allRequests, setAllRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  /* GET USER ROLE */
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:5000/usersdelete/role/${user.email}`)
      .then((res) => setRole(res.data.role))
      .catch(console.log);
  }, [user?.email]);

  /* FETCH REQUESTS */
  useEffect(() => {
    axiosInstance
      .get(`/deleterequests`)
      .then((res) => {
        setAllRequests(res.data);
        setFilteredRequests(res.data);
      })
      .catch(console.log);
  }, [axiosInstance]);

  /* FILTER */
  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredRequests(allRequests);
    } else {
      setFilteredRequests(
        allRequests.filter(
          (req) => req.donationStatus === filterStatus
        )
      );
    }
  }, [filterStatus, allRequests]);

  /* DELETE HANDLER */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deletingrequests/${id}`).then(() => {
          Swal.fire("Deleted!", "Request removed successfully.", "success");
          setAllRequests((prev) => prev.filter((r) => r._id !== id));
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
      <title>All Requests</title>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          All Blood Donation Requests
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          View, edit, and manage all blood donation requests.
        </p>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-225">
          <thead className="bg-red-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Recipient</th>
              <th className="px-4 py-3 text-left">Blood</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Requester</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredRequests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{req.recipientName}</td>
                <td className="px-4 py-3 font-semibold text-red-600">
                  {req.bloodGroup}
                </td>
                <td className="px-4 py-3">
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>
                <td className="px-4 py-3">{req.date}</td>

                <td className="px-4 py-3 text-xs">
                  <p className="font-medium">{req.requesterName}</p>
                  <p className="text-gray-500">{req.requesterEmail}</p>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      req.donationStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : req.donationStatus === "inprogress"
                        ? "bg-blue-100 text-blue-700"
                        : req.donationStatus === "done"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {req.donationStatus}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Link
                      to={`/RequestDetails/${req._id}`}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                    >
                      View
                    </Link>

                    <Link
                      to={`/EditRequests/${req._id}`}
                      className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                    >
                      Edit
                    </Link>

                    {(role === "admin" ||
                      user?.email === req.requesterEmail) && (
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
