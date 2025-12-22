import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [currUser, setCurrUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // form state
  const [formData, setFormData] = useState({
    photoURL: "",
    name: "",
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  // fetch current user
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/${user.email}`)
      .then((res) => {
        setCurrUser(res.data);
        setFormData({
          photoURL: res.data.photoURL || "",
          name: res.data.name || "",
          bloodGroup: res.data.bloodGroup || "",
          district: res.data.district || "",
          upazila: res.data.upazila || "",
        });
      })
      .catch(console.error);
  }, [axiosSecure, user?.email]);

  // input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit handler
  const handleProfile = (e) => {
    e.preventDefault();

    axiosSecure
      .patch(`/update/user?email=${user.email}`, formData)
      .then(() => {
        setCurrUser((prev) => ({ ...prev, ...formData }));
        setIsEditing(false);
      })
      .catch(console.error);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <title>Profile</title>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-500">
            View and update your profile information
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleProfile}
        className="bg-white border rounded-lg shadow-sm p-6 space-y-5"
      >
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <img
            src={formData.photoURL}
            alt="Avatar"
            className="w-24 h-24 rounded-full border object-cover"
          />

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              name="photoURL"
              disabled={!isEditing}
              value={formData.photoURL}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:ring-2 focus:ring-red-500"
              }`}
            />
          </div>
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              disabled={!isEditing}
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:ring-2 focus:ring-red-500"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email (not editable)
            </label>
            <input
              type="email"
              disabled
              value={currUser?.email || ""}
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
          </div>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium mb-1">Blood Group</label>
          <select
            name="bloodGroup"
            disabled={!isEditing}
            value={formData.bloodGroup}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              !isEditing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-red-500"
            }`}
          >
            <option value="">Select</option>
            <option>O+</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O-</option>
          </select>
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <input
              type="text"
              name="district"
              disabled={!isEditing}
              value={formData.district}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:ring-2 focus:ring-red-500"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upazila</label>
            <input
              type="text"
              name="upazila"
              disabled={!isEditing}
              value={formData.upazila}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:ring-2 focus:ring-red-500"
              }`}
            />
          </div>
        </div>

        {/* Save */}
        {isEditing && (
          <div className="text-right pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
