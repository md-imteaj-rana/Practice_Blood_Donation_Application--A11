import React, { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";


const Funding = () => {

    const axiosInstance = useAxios()
    const {user} = useContext(AuthContext)
    
    const handleCheckOut = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donateAmount.value
        const fundEmail = user?.email
        const fundName = user?.displayName
        const fundDate = new Date()

        const formData = {
            donateAmount,
            fundEmail,
            fundName,
            fundDate
        }

        axiosInstance.post(`/create-payment-checkout`, formData)
        .then(res => {
            console.log(res.data)
            window.location.href=res.data.url
        })

    }
  return (
    <div className="max-w-6xl mx-auto">
      <title>Funding</title>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 mt-10">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Funding & Donations
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Support our blood donation organization through funding.
          </p>
        </div>

        {/* Give Fund Button */}
        <form onSubmit={handleCheckOut} className="flex flex-col">
            <button type="submit" className="mt-4 md:mt-0 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
            🤍 Give Fund
            </button>
            <input name="donateAmount" type="text" placeholder="Type here" className="input mt-2 w-107 md:w-40" />
        </form>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-lg p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Funds Collected</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">
            $ 125,000
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Updated automatically
          </p>
        </div>
      </div>

      {/* Funding Table */}
      <div className="bg-white border rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-red-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Donor Name</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Funding Date</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {/* Row */}
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">Rahim Uddin</td>
              <td className="px-4 py-3 text-green-600 font-semibold">
                $ 5,000
              </td>
              <td className="px-4 py-3">12 Jan 2025</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Funding;
