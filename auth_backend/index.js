import express from "express"
import authRoutes from "./src/routes/authRoutes.js"
import cors from "cors"

const app=express()

app.use(express.json())

app.use("/api/auth",authRoutes)

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

export default app