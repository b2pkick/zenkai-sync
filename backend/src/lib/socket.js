import {Server} from "socket.io"
import http from "http"
import express from "express"
import Board from "./../models/boardModel.js"

const app=express()
const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
})

const activeRooms=new Map()
io.on("connection",(socket)=>{
    console.log("socket connection",socket.id)
    socket.on("joinBoard",async({boardId,roomCode,user,ownerId})=>{
        if(!roomCode||!user) return
        socket.join(roomCode)
        socket.boardId=boardId
        socket.roomCode=roomCode
        socket.userData=user
        socket.isOwner=user._id.toString()===ownerId.toString()
        if(!activeRooms.has(roomCode)){
            activeRooms.set(roomCode,new Map())
        }
        activeRooms.get(roomCode).set(socket.id,{
            id:user._id,
            username:user.username,
            email:user.email
        })
        const roster=Array.from(activeRooms.get(roomCode).values())
        io.to(roomCode).emit("users_updated",roster)
    })
    socket.on("disconnect",async(reason)=>{
        const {roomCode,boardId,isOwner}=socket
        if(roomCode&&activeRooms.has(roomCode)){
            const roomMap=activeRooms.get(roomCode)
            roomMap.delete(socket.id)
            if(isOwner){
                io.to(roomCode).emit("owner_disconnected")
                activeRooms.delete(roomCode)
                try {
                    await Board.findByIdAndUpdate(boardId,{code:null})
                } catch (error) {
                    console.log("error",error.message)
                }
                return
            }
            if(roomMap.size===0){
                activeRooms.delete(roomCode)
                try {
                    await Board.findByIdAndUpdate(boardId,{code:null})
                } catch (error) {
                    console.log("error",error.message)
                }
            }else{
                const remainingRoster=Array.from(roomMap.values())
                io.to(roomCode).emit("users_updated",remainingRoster)
            }
        }
    })
    socket.on("user_drawing",({roomCode,changes})=>{
        socket.broadcast.to(roomCode).emit("peer_drawing",{changes})
    })
})

export {app,io,server}