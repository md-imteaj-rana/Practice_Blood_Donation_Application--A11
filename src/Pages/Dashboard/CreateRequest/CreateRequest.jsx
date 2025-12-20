import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateRequest = () => {
    
    const {user} = useContext(AuthContext)
    //console.log(user?.displayName)

    //secure axios
    const axiosSecure = useAxiosSecure()

    const [selectedDistricts, setSelectedDistricts] = useState(null)

    // fetch districts
      const [districts, setDistricts] = useState([]);
    
      useEffect(() => {
        fetch("/Districts.json")
          .then((res) => res.json())
          .then((data) => setDistricts(data))
          .catch((err) => console.log(err));
      }, []);
    
      // fetch upazilas
      const [upazilas, setUpazilas] = useState([]);
      const [selectedUpazila, setSelectedUpazia] = useState([]);
      useEffect(() => {
        fetch(`/Upazilas.json`)
          .then((res) => res.json())
          .then((data) => setUpazilas(data))
          .catch((err) => console.log(err));
      }, []);
    
      const handleDistrict = (e) => {
        e.preventDefault();
        const distId = e.target.value;
        const resultUpa = upazilas.filter(u => u.district_id == distId)
        const district = districts.find(d => d.id == distId)
        setSelectedDistricts(district)
        setSelectedUpazia(resultUpa)
        //console.log(resultUpa)
      };

      const handleCreateReq = (e) => {
        e.preventDefault()
        const form = e.target;
        const requesterName = form.requesterName.value
        const requesterEmail = form.requesterEmail.value
        const recipientName = form.recipientName.value
        const bloodGroup = form.bloodGroup.value
        const recipientDistrict = selectedDistricts.name
        const recipientUpazila = form.recipientUpazila.value
        const hospital = form.hospital.value
        const address = form.address.value
        const date = form.date.value
        const time = form.time.value
        const message = form.message.value

        const formData = {
            requesterName,
            requesterEmail,
            recipientName,
            bloodGroup,
            recipientDistrict,
            recipientUpazila,
            hospital,
            address,
            date,
            time,
            message
        }
        console.log(formData)

        axiosSecure.post(`/requests`, formData)
        .then(res => {
            //console.log(res.data)
            Swal.fire({
            title: "Created request.",
            icon: "success",
            draggable: true
            });
            form.reset()
        })
        .catch(err => {
            console.log(err)
        })
      }
  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Blood Donation Request
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Provide accurate information to help donors reach you quickly.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleCreateReq} className="bg-white rounded-lg shadow-sm border p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Requester Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requester Name
          </label>
          <input
            name="requesterName"
            type="text"
            readOnly
            value={user?.displayName}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requester Email
          </label>
          <input
            name="requesterEmail"
            type="email"
            readOnly
            value={user?.email}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Name
          </label>
          <input
            name="recipientName"
            type="text"
            placeholder="Recipient full name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blood Group
          </label>
          <select name="bloodGroup" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500">
            <option>Select blood group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient District
          </label>
          <select
                    onChange={handleDistrict}
                    name="recipientDistrict"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option value={district?.id}>{district?.name}</option>
                    ))}
                  </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Upazila
          </label>
          <select
                    name="recipientUpazila"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Upazila</option>
                    {selectedUpazila.map((upazila) => (
                      <option value={upazila?.name}>
                        {upazila?.name}
                      </option>
                    ))}
                  </select>
        </div>

        {/* Hospital Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hospital Name
          </label>
          <input
            name="hospital"
            type="text"
            placeholder="e.g. Dhaka Medical College Hospital"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Full Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Address
          </label>
          <input
            name="address"
            type="text"
            placeholder="Street, road, area"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Donation Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Donation Date
          </label>
          <input
            name="date"
            type="date"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Donation Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Donation Time
          </label>
          <input
            name="time"
            type="time"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Request Message */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Request Message
          </label>
          <textarea
            name="message"
            rows="4"
            placeholder="Explain why blood is needed"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-right mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
