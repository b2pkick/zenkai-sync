import dotenv from "dotenv"
import {connectDB} from "./src/lib/db.js"
import {server} from "./src/lib/socket.js"
import app from "./index.js"

dotenv.config()

server.listen(process.env.PORT,()=>{
    console.log(process.env.PORT)
    console.log("lets goo zenkaiiis")
    connectDB()
})