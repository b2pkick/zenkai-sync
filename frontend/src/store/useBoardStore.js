import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import axios from "axios"

export const useBoardStore = create((set,get)=>({
    currentBoard:null,
    isSaving:false,
    isFetchingBoards:false,
    isInitializing:false,
    isDeleting:false,
    isJoining:false,
    error:null,
    boards:[],
    initializeBoard:async()=>{
        set({isInitializing:true})
        try {
            const res=await axiosInstance.post("/api/board/initialize")
            set({boards:[res.data,...get().boards],isInitializing:false})
            return res.data
        } catch (error) {
            set({ isInitializing: false });
            console.log(error.message)
        }
    },
    getBoards:async()=>{
        set({ isFetchingBoards: true });
        try {
            const res=await axiosInstance.get("/api/board/fetchAllBoards")
            set({boards:res.data,isFetchingBoards:false})
        } catch (error) {
            set({ isFetchingBoards: false });
            console.log(error.message)
        }
    },
    saveData:async(boardId,canvasData)=>{
        set({isSaving:true})
        try {
            const res=await axiosInstance.patch(`/api/board/saveData/${boardId}`,{data:canvasData})
            set({isSaving:false,error:null})
        } catch (error) {
            set({isSaving:false,error:"Sync failed"})
            console.log(error.message)
        }
    },
    getData:async(boardId)=>{
        try {
            const res=await axiosInstance.get(`/api/board/fetchData/${boardId}`)
            return res.data
        } catch (error) {
            console.log(error.message)
        }
    },
    deleteBoard:async(boardId)=>{
        set({isDeleting:true})
        try {
            await axiosInstance.delete(`/api/board/delete/${boardId}`)
            set({boards:get().boards.filter(b=>b._id!==boardId),isDeleting:false})
        } catch (error) {
            set({ isDeleting: true });
            console.log(error.message)            
        }
    },
    joinBoardByCode:async(code)=>{
        set({isJoining:true})
        try {
            const res=await axiosInstance.get(`/api/board/getroom/${code}`)
            return res.data
        } catch (error) {
            console.log(error.message)
        }finally{
            set({isJoining:false})
        }
    },
    deactivateCode:async(boardId)=>{
        try {
            await axiosInstance.patch(`/api/board/deactivate/${boardId}`)
        } catch (error) {
            console.log("error in deactivate",error.message)
        }
    }
}))