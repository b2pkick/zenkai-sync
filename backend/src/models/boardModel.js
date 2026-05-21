import mongoose from "mongoose"

const boardSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        default:"Untitled"
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    collaborators:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    data:{
        type:Object,
        default:{}
    },
    code:{
        type:String,
        default:null
    },
    lastUpdated:{
        type:Date,
        default:Date.now
    }
    },
    {timestamps:true}
)

boardSchema.pre("save",function(){
    this.lastUpdated=Date.now()
    // next()
})

const Board=mongoose.model("Board",boardSchema)

export default Board