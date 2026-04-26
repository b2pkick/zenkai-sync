import app from "./index.js"
import dotenv from "dotenv"
import {connectDB} from "./src/lib/db.js"

dotenv.config()

app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT)
    console.log("lets goo zenkaiiis")
    connectDB()
})