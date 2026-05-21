import { useBoardStore } from '@/store/useBoardStore'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tldraw, createTLStore, defaultShapeUtils, useEditor, loadSnapshot } from 'tldraw'
import CustomToolbar from '@/projectComponents/CustomToolbar'
import 'tldraw/tldraw.css'
import { io } from 'socket.io-client'
import { useAuthStore } from '@/store/useAuthStore'

const socket=io("http://localhost:5001",{
  autoConnect:false,
})

function Sync({boardId,roomCode}){
  const editor=useEditor()
  const {saveData}=useBoardStore()
  useEffect(()=>{
    if(!roomCode) return
    let timeout
    const cleanup=editor.store.listen((entry)=>{
      if (entry.source!=='user') return
      socket.emit("user_drawing",{
        roomCode,
        changes:entry.changes
      })
      clearTimeout(timeout)
      timeout=setTimeout(()=>{
        const snapshot=editor.getSnapshot()
        saveData(boardId,snapshot)
      },2000)
    })
    socket.on("peer_drawing",({changes})=>{
      editor.store.mergeRemoteChanges(()=>{
        editor.store.applyDiff(changes)
      })
    })
    return ()=>{
      clearTimeout(timeout)
      cleanup()
      socket.off("peer_drawing")
    }
  }, [editor,boardId,saveData])
  return null
}
const HomePage=()=>{
  const navigate=useNavigate()
  const {id:boardId}=useParams()
  const {authUser} =useAuthStore()
  const {getData,isSaving,setActiveUsers }=useBoardStore()
  const [store]=useState(()=>createTLStore({ shapeUtils: defaultShapeUtils }))
  const [loading,setloading]=useState(true)
  const [roomCode,setroomCode]=useState("")

  useEffect(()=>{ 
    const initialLoading=async()=>{
      try {
        const boardData=await getData(boardId)
        if(boardData){
          if(boardData.code){
            setroomCode(boardData.code)
          }
          if(!socket.connected){
            socket.connect()
            socket.once("connect",()=>{
            socket.emit("joinBoard",{
              boardId,
              roomCode:boardData.code, 
              user:authUser,
              ownerId:boardData.owner
            })
          })
          }else{
            socket.emit("joinBoard",{
              boardId,
              roomCode:boardData.code, 
              user:authUser,
              ownerId:boardData.owner
            })
          }
        }
        const snapshot=boardData.data
        if(snapshot&&(snapshot.store||snapshot.document)){
          loadSnapshot(store,snapshot)
        }
      } catch (error) {
        console.log("error",error)
      }finally{
        setloading(false)
      }
    }
    if(boardId) initialLoading()
    // socket.on("users_updated",(roster)=>{
    //   setActiveUsers(roster)
    // })
    socket.on("owner_disconnected",()=>{
      navigate("/")
    })
    return ()=>{
      // socket.off("users_updated")
      socket.off("owner_disconnected")
      socket.disconnect()
    }
  }, [boardId,getData,store,authUser,setActiveUsers,navigate])
  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-white text-black font-black text-2xl">
       initializing...
    </div>
  ) 
  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <Tldraw store={store} hideUi={true} autoFocus >
        <Sync boardId={boardId} roomCode={roomCode}/>
        <CustomToolbar roomCode={roomCode} />
        {/* {isSaving && (
          <div className="fixed bottom-3 left-3 z-200 text-black">
            syncing...
          </div>
        )} */}
      </Tldraw>
    </div>
  )
}

export default HomePage