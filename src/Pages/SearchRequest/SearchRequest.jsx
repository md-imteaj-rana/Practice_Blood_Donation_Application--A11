import React, { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios';

const SearchRequest = () => {

    const axiosInstance = useAxios();

    const [searchedRequests, setSearchedRequests] = useState();

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
    const [selectedDistricts, setSelectedDistricts] = useState(null)

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
    };

    const handleSearch = (e) => {
        e.preventDefault()
        const bloodGroup = e.target.bloodGroup.value.trim();
        const district = selectedDistricts.name;
        const upazila = e.target.upazila.value;

        axiosInstance.get(`/search-request?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setSearchedRequests(res.data)
            })
    }

    return (
        <div className='py-10 px-4 md:px-10 bg-linear-to-b from-red-50 to-white min-h-screen flex flex-col items-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-red-600 mb-10 text-center'>Find Blood Requests Near You</h1>

            <form onSubmit={handleSearch} className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 md:p-10 space-y-6 border border-red-100">
                <div>
                    <label className="label font-medium text-red-600">Blood Group</label>
                    <select
                        name="bloodGroup"
                        className="select select-bordered w-full border-red-300 focus:border-red-500 focus:ring focus:ring-red-200"
                    >
                        <option value="">Select Blood Group</option>
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

                <div>
                    <label className="label font-medium text-red-600">District</label>
                    <select
                        onChange={handleDistrict}
                        name="district"
                        className="select select-bordered w-full border-red-300 focus:border-red-500 focus:ring focus:ring-red-200"
                    >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                            <option key={district?.id} value={district?.id}>{district?.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="label font-medium text-red-600">Upazila</label>
                    <select
                        name="upazila"
                        className="select select-bordered w-full border-red-300 focus:border-red-500 focus:ring focus:ring-red-200"
                    >
                        <option value="">Select Upazila</option>
                        {selectedUpazila.map((upazila) => (
                            <option key={upazila?.id} value={upazila?.name}>
                                {upazila?.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type='submit' className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-transform transform hover:scale-105">
                    Search
                </button>
            </form>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-6xl'>
                {searchedRequests?.map(searchedRequest => (
                    <div key={searchedRequest.id} className="card bg-white shadow-lg rounded-2xl border border-red-100 hover:shadow-2xl transition-transform transform hover:-translate-y-1">
                        <div className="card-body p-6">
                            <h2 className="text-xl font-semibold text-red-600 mb-1">Requester: {searchedRequest?.requesterName}</h2>
                            <p className="text-gray-700"><strong>Blood Group:</strong> {searchedRequest?.bloodGroup}</p>
                            <p className="text-gray-700"><strong>Recipient Name:</strong> {searchedRequest?.recipientName}</p>
                            <p className="text-gray-700"><strong>District:</strong> {searchedRequest?.recipientDistrict}</p>
                            <p className="text-gray-700"><strong>Upazila:</strong> {searchedRequest?.recipientUpazila}</p>
                            <p className="text-gray-700"><strong>Address:</strong> {searchedRequest?.address}</p>
                            <p className="text-gray-700"><strong>Hospital:</strong> {searchedRequest?.hospital}</p>
                            <p className="mt-2 text-gray-600 italic">"{searchedRequest?.message}"</p>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-transform transform hover:scale-105">
                                    Donate Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchRequest;
