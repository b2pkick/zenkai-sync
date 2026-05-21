import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"https://zenkai-sync-wv5o.onrender.com",
    withCredentials:true
})