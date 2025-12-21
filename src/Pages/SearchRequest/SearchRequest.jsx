import React, { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios';

const SearchRequest = () => {

    const axiosInstance = useAxios();

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
        //console.log(resultUpa)
    };

    const handleSearch = (e) => {
        e.preventDefault()
        const bloodGroup = e.target.bloodGroup.value.trim();
        const district = selectedDistricts.name;
        const upazila = e.target.upazila.value;

        axiosInstance.get(`/search-request?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
        .then(res => {
            console.log(res.data);
            e.target.reset()
        })
    }

  return (
    <div className='py-5 fieldset flex items-center justify-center'>
      
      <form onSubmit={handleSearch} className="space-y-3">
         <div>
            <label className="label font-medium">Blood Group</label>
            <select
            name="bloodGroup"
            className="select select-bordered w-full"
            
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
            <label className="label font-medium">District</label>
            <select
            onChange={handleDistrict}
            name="district"
            className="select select-bordered w-full"
            
            >
            <option value="">Select District</option>
            {districts.map((district) => (
                <option value={district?.id}>{district?.name}</option>
            ))}
            </select>
        </div>

        <div>
            <label className="label font-medium">Upazila</label>
            <select
            name="upazila"
            className="select select-bordered w-full"
            
            >
            <option value="">Select Upazila</option>
            {selectedUpazila.map((upazila) => (
                <option value={upazila?.name}>
                {upazila?.name}
                </option>
            ))}
            </select>
        </div>

        <button type='submit' className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-xl mt-2">
                  Search
            </button>
      </form>
    </div>
  )
}

export default SearchRequest
