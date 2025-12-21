import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequests = () => {

    const [myRequests, setMyRequests] = useState([])
    const [totalMyRequests, setTotalMyRequests] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)

    useEffect(() => {
        axiosSecure.get(`/requests/${user?.email}?page=${currentPage - 1}&size=${itemsPerPage}`)
        .then(res => {
            setMyRequests(res.data?.request || [])
            setTotalMyRequests(res.data?.totalMyReq || 0)
        })
        .catch(err => {
            console.log(err)
        })
    },[axiosSecure, currentPage, itemsPerPage, user?.email])
    //console.log(myRequests)
    //console.log(totalMyRequests)

    //Pagination
    const numberOfPages =
    itemsPerPage > 0
      ? Math.ceil(totalMyRequests / itemsPerPage)
      : 0;
    
      const pages = numberOfPages > 0
    ? [...Array(numberOfPages).keys()].map(i => i + 1)
    : [];

    // handling prev and next
    const handlePrev = () => {
      if(currentPage > 1){
        setCurrentPage(currentPage-1)
      }
    }

    const handleNext = () => {
      if(currentPage < pages.length){
        setCurrentPage(currentPage+1)
      }
    }
  return (
    <div className="max-w-6xl mx-auto">
      <title>My Donation Requests</title>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          My Donation Requests
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track and manage your blood donation requests.
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
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
            

            {/* Request Row */}
            {
                myRequests?.map(myRequest => (
                    <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">{myRequest?.recipientName}</td>
                    <td className="px-4 py-3 font-medium text-red-600">{myRequest?.bloodGroup}</td>
                    <td className="px-4 py-3">{myRequest?.recipientDistrict},<br></br>{myRequest?.recipientUpazila}</td>
                    <td className="px-4 py-3">{myRequest?.date}</td>

                    {/* Donor Info */}
                    <td className="px-4 py-3 text-gray-600">
                        <p className="font-medium">{myRequest?.requesterName}</p>
                        <p className="text-xs">{myRequest?.requesterEmail}</p>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {myRequest?.donationStatus}
                        </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 text-center space-x-2">
                        <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                        View
                        </button>
                        <button className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                        Edit
                        </button>
                        <button className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700">
                        Delete
                        </button>
                    </td>
                    </tr>
                ))
            }

            
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-15 gap-5">
        <button onClick={handlePrev} className="btn">Prev</button>
        {
          pages.map(page => (
            <button className={`btn ${page === currentPage ? 'bg-[#435585] text-white' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>
          ))
        }
        <button onClick={handleNext} className="btn">Next</button>
      </div>
    </div>
  );
};

export default MyRequests;
