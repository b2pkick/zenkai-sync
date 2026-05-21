import { useEffect, useState } from "react"
import { useBoardStore } from "./../store/useBoardStore"
import { useAuthStore } from "./../store/useAuthStore"
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom";
import avatar from "./../assets/image.webp"
import { Input } from "@/components/ui/input";

const LandingPage = () => {
  const navigate = useNavigate();
  const [roomCode,setroomCode]=useState("")
  const {authUser} = useAuthStore();
  const {boards,getBoards,initializeBoard,deleteBoard,isFetchingBoards,isInitializing,isDeleting,joinBoardByCode} = useBoardStore();

  useEffect(() => {
    getBoards()
  },[getBoards])
  const handleCreateNew=async()=>{
    const newBoard=await initializeBoard();
    if(newBoard?._id){
      navigate(`/canvas/${newBoard._id}`);
    }
  }
  const handleJoin=async(e)=>{
    e.preventDefault()
    if(roomCode.trim().length!==6 ){
      console.log("wrong")
      return
    }
    const board=await joinBoardByCode(roomCode)
      console.log(board)
      if(board?._id){
        navigate(`/canvas/${board._id}`)
      }
  }
  if (isFetchingBoards){
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F0F0F0]">
        <div className="text-xl animate-bounce">Syncing Boards...</div>
      </div>
    );
  }
  return(
    <div className="min-h-screen w-full bg-white p-8">
      <div className="max-w-[95%] mx-auto">
        <div className="mb-12 flex justify-between items-center">
          <div>
          <h1 className="text-[13px] sm:text-xl">
            Welcome <span className="">{authUser?.username||"user"}</span>
          </h1>
          <p className="text-[13px] sm:text-xl">
            {boards.length>0 ?"Here are your synced documents" : "You currently have no documents"}
          </p>
          </div>
          <Link to="/profile">
          <Avatar>
            <AvatarImage src={authUser.profilePic||avatar} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div
            onClick={handleCreateNew}
            disabled={isInitializing}
            className={"group relative flex flex-col items-center justify-center h-64 bg-white border-4 rounded-2xl"}
          >
            <div>
              <Plus size={24} strokeWidth={4} />
            </div>
            <span className="mt-4 font-black text-xl">
              {isInitializing ? "initializing..." : "create new"}
            </span>
          </div>
          <div className={"group relative flex flex-col items-center justify-center h-64 bg-white border-4 rounded-2xl"}>
            <form onSubmit={handleJoin}>
              <div className="flex flex-col gap-3">
              <Input maxLength={6} placeholder="enter 6 digit code" value={roomCode} onChange={(e)=>setroomCode(e.target.value.toUpperCase())} className="font-black uppercase text-center border-2 border-black"/>
              <Button type="submit" className={"bg-white"}>join</Button>
              </div>
            </form>
          </div>
          {boards.map((board) => (
            <div key={board._id} className="relative flex flex-col h-64 group bg-white border-4 rounded-2xl">
              <div 
                onClick={() => navigate(`/canvas/${board._id}`)}
                className="flex-1 p-6 cursor-pointer">
                <div className="flex justify-center items-center flex-col">
                <h3 className="mt-4 text-xl font-black">
                  {board.title}
                </h3>
                <div className="mt-2 flex items-center gap-2 font-bold text-sm text-black/50">
                  {new Date(board.updatedAt).toLocaleDateString()}
                </div>
                </div>
              </div>
                <Button onClick={()=>deleteBoard(board._id)} className="bg-red-400 p-2 absolute right-3 bottom-3">
                  <Trash2 size={20} color="black" className={isDeleting ? "animate-spin" : ""} />
                </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage