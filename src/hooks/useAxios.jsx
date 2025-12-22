import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://blood-connect-a11.vercel.app'

})

const useAxios = () => {
    return axiosInstance
}

export default useAxios;