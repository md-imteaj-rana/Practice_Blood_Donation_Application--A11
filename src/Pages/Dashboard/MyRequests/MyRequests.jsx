import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyRequests = () => {
  const [myRequests, setMyRequests] = useState([]);
  const [totalMyRequests, setTotalMyRequests] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/requests/${user.email}?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequests(res.data?.request || []);
        setTotalMyRequests(res.data?.totalMyReq || 0);
      })
      .catch(console.error);
  }, [axiosSecure, currentPage, itemsPerPage, user?.email]);

  // DELETE HANDLER
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deletemyrequests/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your request has been deleted.", "success");

            //  Update instantly
            setMyRequests((prev) =>
              prev.filter((request) => request._id !== id)
            );
            setTotalMyRequests((prev) => prev - 1);
          }
        });
      }
    });
  };

  // Pagination
  const numberOfPages = Math.ceil(totalMyRequests / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((i) => i + 1);

  const filteredRequests =
    statusFilter === "all"
      ? myRequests
      : myRequests.filter(
          (req) => req.donationStatus === statusFilter
        );

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Donation Requests</h1>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["all", "Pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded ${
              statusFilter === status
                ? "bg-[#435585] text-white"
                : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-red-50">
            <tr>
              <th className="px-4 py-2 text-left">Recipient</th>
              <th className="px-4 py-2">Blood</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Donor</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{req.recipientName}</td>
                <td className="px-4 py-2 text-red-600 font-bold">
                  {req.bloodGroup}
                </td>
                <td className="px-4 py-2">
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>
                <td className="px-4 py-2">{req.date}</td>
                <td className="px-4 py-2">
                  <p>{req.requesterName}</p>
                  <p className="text-xs">{req.requesterEmail}</p>
                </td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {req.donationStatus}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-2 text-center space-x-2">
                  <Link
                    to={`/RequestDetails/${req._id}`}
                    className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
                  >
                    View
                  </Link>
                  <Link
                    to={`/EditRequests/${req._id}`}
                    className="px-2 py-1 bg-green-600 text-white text-xs rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="px-2 py-1 bg-red-600 text-white text-xs rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`btn ${
              page === currentPage ? "bg-[#435585] text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyRequests;
