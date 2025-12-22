import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../hooks/useAxios";

const DonationRequests = () => {
  const [allDonationRequests, setAllDonationRequests] = useState([]);
  const axiosInstance = useAxios();
  

  useEffect(() => {
    axiosInstance
      .get("/requests")
      .then((res) => {
        setAllDonationRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosInstance]);

  const pendingRequests = allDonationRequests.filter(
    (req) => req.donationStatus == "Pending"
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-100 px-4 py-12">
      <title>Donation Requests</title>

      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-red-700 tracking-tight">
          Blood Donation Requests
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          Active blood donation requests that urgently need heroes like you.
          Every drop counts ❤️
        </p>
      </div>

      {/* Requests */}
      {pendingRequests?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-500">
          <p className="text-lg font-medium">
            No pending donation requests found.
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pendingRequests?.map((request) => (
            <div
              key={request?._id}
              className="group bg-white rounded-2xl border border-red-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="relative bg-linear-to-r from-red-600 to-red-700 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">
                  {request?.recipientName}
                </h3>

                <span className="absolute top-4 right-4 bg-white text-red-600 text-xs font-bold px-3 py-1 rounded-full shadow">
                  {request?.bloodGroup}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3 text-sm text-gray-700">
                <p className="flex justify-between">
                  <span className="font-semibold text-gray-800">Location</span>
                  <span className="text-right">
                    {request?.address}, {request?.recipientUpazila},
                    {request?.recipientDistrict}
                  </span>
                </p>

                <div className="flex justify-between">
                  <p>
                    <span className="font-semibold text-gray-800">Date:</span>{" "}
                    {request?.date}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Time:</span>{" "}
                    {request?.time}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <Link
                  to={`/RequestDetails/${request._id}`}
                  className="block w-full text-center bg-red-600 text-white py-2.5 rounded-lg font-semibold tracking-wide hover:bg-red-700 group-hover:scale-[1.02] transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
