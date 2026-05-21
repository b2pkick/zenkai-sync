import express from "express"
import { initializeBoard,fetchAllBoards,saveData,fetchData,deleteBoard, getRoom, deactivateBoard } from "../controllers/boardController.js"
import { protectRoute } from "./../middleware/authMiddleware.js"

const router=express.Router()

router.post("/initialize",protectRoute,initializeBoard)

router.get("/fetchAllBoards",protectRoute,fetchAllBoards)

router.get("/getroom/:code",protectRoute,getRoom)

router.patch("/deactivate/:id",protectRoute,deactivateBoard)

router.get("/fetchData/:id",protectRoute,fetchData)

router.patch("/saveData/:id",saveData)

router.delete("/delete/:id",deleteBoard)

export default router