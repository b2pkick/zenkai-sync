import express from "express"
import authRoutes from "./src/routes/authRoutes.js"
import boardRoutes from "./src/routes/boardRoutes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import {app} from "./src/lib/socket.js"

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/board",boardRoutes)


export default app