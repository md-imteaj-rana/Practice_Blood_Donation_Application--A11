import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios, { Axios } from "axios";

const RequestDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  //const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 Fetch request details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/requestsdetails/${id}`)
      .then((res) => {
        setRequest(res?.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  //  Confirm Donation
  const handleConfirmDonation = () => {
    axios
      .patch(`http://localhost:5000/requestsdetails/${id}`, {
        donationStatus: "inprogress",
        donorName: user?.displayName,
        donorEmail: user?.email,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Donation Confirmed",
          text: "You have successfully accepted this donation request.",
        });
        setIsOpen(false);
        navigate("/dashboard/my-requests");
      })
      .catch((err) => console.log(err));
  };

  if (!request) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <title>Request Details</title>

      {/* Request Details */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-red-600 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">Donation Request Details</h2>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
          <Detail label="Recipient Name" value={request?.recipientName} />
          <Detail label="Blood Group" value={request?.bloodGroup} highlight />
          <Detail label="Location" value={request?.address} />
          <Detail label="Hospital Name" value={request?.hospital} />
          <Detail label="Date" value={request?.date} />
          <Detail label="Time" value={request?.time} />
          <Detail
            label="Status"
            value={request?.donationStatus}
            status
          />
          <Detail label="Additional Info" value={request?.message || "N/A"} />
        </div>

        {/* Donate Button */}
        {request?.donationStatus === "pending" && (
          <div className="px-6 pb-6">
            <button
              onClick={() => setIsOpen(true)}
              className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Donate Blood
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Confirm Donation
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Donor Name
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Donor Email
                </label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md bg-gray-100"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleConfirmDonation}
                className="flex-1 bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition"
              >
                Confirm Donation
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 border py-2 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value, highlight, status }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p
      className={`mt-1 font-semibold ${
        highlight ? "text-red-600 text-lg" : ""
      } ${status && value === "pending" ? "text-yellow-600" : ""}`}
    >
      {value}
    </p>
  </div>
);

export default RequestDetails;
