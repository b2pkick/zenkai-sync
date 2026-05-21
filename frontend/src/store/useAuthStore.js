import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/api/auth/check")
            set({authUser:res.data})
        } catch (error) {
            console.log("error in checkauth: ",error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/api/auth/login",data)
            set({authUser:res.data})
        } catch (error) {
            console.log(error.message)
        }finally{
            set({isLoggingIn:false})
        }
    },
    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/api/auth/signup",data)
            set({authUser:res.data})
        } catch (error) {
            console.log(error.message)
            set({authUser:null})
        }finally{
            set({isSigningUp:false})
        }
    }
}))