import express from "express"
import {create,signup,getAll,deleteUser, updateUser} from "./../controllers/authController.js"

const router=express.Router();

router.post("/signup",signup)
router.post("/create",create)
router.get("/getAll",getAll)
router.delete("/deleteUser/:username",deleteUser)
router.patch("/updateUser/:username",updateUser)

export default router