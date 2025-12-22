import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [role, setRole] = useState("");
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Get user role
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://blood-connect-a11.vercel.app/users/role/${user.email}`)
      .then((res) => setRole(res.data.role))
      .catch(console.log);
  }, [user?.email]);

  //  Get request data
  useEffect(() => {
    axiosSecure.get(`/requests/${id}`).then((res) => {
      setRequest(res.data);
      setLoading(false);
    });
  }, [axiosSecure, id]);

  //  Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  //  Submit update
  const handleSubmit = (e) => {
    e.preventDefault();

    let updateData = {};

    // Volunteer: only donationStatus
    if (role === "volunteer") {
      updateData = { donationStatus: request.donationStatus };
    } else {
      // Donor & Admin
      updateData = {
        recipientName: request.recipientName,
        recipientDistrict: request.recipientDistrict,
        recipientUpazila: request.recipientUpazila,
        bloodGroup: request.bloodGroup,
        date: request.date,
        time: request.time,
        donationStatus: request.donationStatus,
      };
    }

    axiosSecure.patch(`/requests/edit/${id}`, updateData).then(() => {
      Swal.fire("Updated!", "Donation request updated successfully", "success");
      navigate(-1);
    });
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <title>Edit Donation Request</title>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Edit Donation Request
        </h1>
        <p className="text-sm text-gray-600">
          Update request information carefully.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Recipient Name */}
        <Input
        label="Recipient Name"
        name="recipientName"
        value={request?.recipientName || ""}
        onChange={handleChange}
        disabled={role === "volunteer"}
        />

        {/* Blood Group */}
        <Select
          label="Blood Group"
          name="bloodGroup"
          value={request?.bloodGroup}
          onChange={handleChange}
          disabled={role === "volunteer"}
          options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
        />

        {/* District */}
        <Input
          label="Recipient District"
          name="recipientDistrict"
          value={request?.recipientDistrict}
          onChange={handleChange}
          disabled={role === "volunteer"}
        />

        {/* Upazila */}
        <Input
          label="Recipient Upazila"
          name="recipientUpazila"
          value={request?.recipientUpazila}
          onChange={handleChange}
          disabled={role === "volunteer"}
        />

        {/* Date */}
        <Input
          type="date"
          label="Donation Date"
          name="date"
          value={request?.date}
          onChange={handleChange}
          disabled={role === "volunteer"}
        />

        {/* Time */}
        <Input
          type="time"
          label="Donation Time"
          name="time"
          value={request?.time}
          onChange={handleChange}
          disabled={role === "volunteer"}
        />

        {/* Status (ALL roles) */}
        <Select
          label="Donation Status"
          name="donationStatus"
          value={request?.donationStatus}
          onChange={handleChange}
          options={["pending", "inprogress", "done", "canceled"]}
        />

        {/* Submit */}
        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Update Donation Request
          </button>
        </div>
      </form>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      className={`w-full border px-3 py-2 rounded-md ${
        props.disabled ? "bg-gray-100" : ""
      }`}
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <select
      {...props}
      className={`w-full border px-3 py-2 rounded-md ${
        props.disabled ? "bg-gray-100" : ""
      }`}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default EditRequest;
