import Board from "./../models/boardModel.js"

export const initializeBoard=async(req,res)=>{
    try {
        const user=req.user._id
        const newBoard=new Board({
            owner:user,
            collaborators:[]
        })
        await newBoard.save()
        res.status(200).json(newBoard)
    } catch (error) {
        console.log("error in initializeBoard controller",error.message)
        res.status(500).json({error:"internal server error"})
    }
}

export const fetchData=async(req,res)=>{
    try {
        const boardId=req.params.id
        const userId=req.user._id
        let board=await Board.findById(boardId).lean()
        if(!board) return res.status(404).json({message:"board not found"})
        const chars="QWERTYUIOPASDFGHJKLZXCVBNM1234567890"
        if(board.owner.toString()==userId.toString()&&!board.code){ 
            let generateCode=''
            for(let i=0;i<6;i++){
                generateCode+=chars[Math.floor(Math.random()*chars.length)]
            }
            board=await Board.findByIdAndUpdate(boardId,{code:generateCode},{returnDocument:'after',lean:true})
        }
        res.status(200).json(board)
    } catch (error) {
        console.log("Error in fetchData controller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const deactivateBoard=async(req,res)=>{
    try {
        const boardId=req.params.id
        const userId=req.user._id
        const board=await Board.findById(boardId)
        if(!board) return res.status(404).json({message:"board not found"})
        if(board.owner.toString()===userId.toString()){
            await Board.findByIdAndUpdate(boardId,{code:null})
        }
        res.status(200).json({message:"code deactivated"})
    } catch (error) {
        console.log("Error in deactivate controller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const saveData=async(req,res)=>{
    try{
        const boardId=req.params.id
        const {data}=req.body
        const updatedBoard=await Board.findByIdAndUpdate(boardId,{data:data},{returnDocument: 'after'});
        res.status(200).json(updatedBoard)
    }catch(error){
        console.log("Error in saveData controller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const fetchAllBoards=async(req,res)=>{
    try{
        const user=req.user._id
        const filteredBoards=await Board.find({owner:user}).sort({updatedAt:-1})
        res.status(200).json(filteredBoards)
    }catch(error){
        console.log("Error in fetchAllBoards controller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const deleteBoard=async(req,res)=>{
    try {
        const boardId=req.params.id
        await Board.findByIdAndDelete(boardId)
        res.status(200).json({message:"board deleted successfully"})
    } catch (error) {
        console.log("Error in delete controller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const getRoom=async(req,res)=>{
    try {
        const code=req.params.code
        const roomId=await Board.findOne({code:code.toUpperCase()})
        res.status(200).json(roomId)
    } catch (error) {
        console.log("Error in getRoom controller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}