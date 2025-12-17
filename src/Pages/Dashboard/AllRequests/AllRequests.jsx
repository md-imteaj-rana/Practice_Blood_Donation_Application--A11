import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";

const AllRequests = () => {

    const [allRequests, setAllRequests] = useState([])
    const axiosInstance = useAxios();

    useEffect(() => {
            axiosInstance.get(`/requests`)
            .then(res => {
                setAllRequests(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        },[axiosInstance])
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
      <title>All Blood Donation Requests</title>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          All Blood Donation Requests
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          View, edit, and manage all blood donation requests.
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm min-w-225">
          <thead className="bg-red-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Recipient</th>
              <th className="px-4 py-3 text-left">Blood Group</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Donation Date</th>
              <th className="px-4 py-3 text-left">Donor Info</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {/* Row */}
            {
                allRequests.map(allRequest => 
                    <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">{allRequest?.recipientName}</td>
                    <td className="px-4 py-3 font-medium text-red-600">{allRequest?.bloodGroup}</td>
                    <td className="px-4 py-3">
                        <p className="font-medium">{allRequest?.recipientDistrict},</p>
                        <p className="text-xs break-all">{allRequest?.recipientUpazila}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{allRequest?.date}</td>

                    {/* Donor Info */}
                    <td className="px-4 py-3 text-gray-600">
                        <p className="font-medium">{allRequest?.requesterName}</p>
                        <p className="text-xs break-all">{allRequest?.requesterEmail}</p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 whitespace-nowrap">
                        {allRequest?.donationStatus}
                        </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center">
                        <div className="flex flex-col sm:flex-row justify-center gap-2">
                        <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                            View
                        </button>
                        <button className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                            Edit
                        </button>
                        <button className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                            Delete
                        </button>
                        </div>
                    </td>
                    </tr>
                        )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
