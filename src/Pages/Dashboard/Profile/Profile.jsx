import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <title>Profile</title>

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            My Profile
          </h1>
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

      {/* Profile Form */}
      <form className="bg-white border rounded-lg shadow-sm p-6 space-y-5">

        {/* Avatar */}
        <div className="flex items-center gap-6">
          <img
            src="https://i.ibb.co/9gL7wzM/user.png"
            alt="Avatar"
            className="w-24 h-24 rounded-full border object-cover"
          />

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:ring-2 focus:ring-red-500"
              }`}
              value="https://i.ibb.co/9gL7wzM/user.png"
              readOnly={!isEditing}
            />
          </div>
        </div>

        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:ring-2 focus:ring-red-500"
              }`}
              value="Imte Hasan"
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (not editable)
            </label>
            <input
              type="email"
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
              value="imte@email.com"
            />
          </div>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Group
          </label>
          <select
            disabled={!isEditing}
            className={`w-full px-4 py-2 border rounded-md ${
              !isEditing
                ? "bg-gray-100 cursor-not-allowed"
                : "focus:ring-2 focus:ring-red-500"
            }`}
          >
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              District
            </label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:ring-2 focus:ring-red-500"
              }`}
              value="Dhaka"
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upazila
            </label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-md ${
                !isEditing
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:ring-2 focus:ring-red-500"
              }`}
              value="Mirpur"
              readOnly={!isEditing}
            />
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="text-right pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
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
