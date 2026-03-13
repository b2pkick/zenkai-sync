import bcrypt from "bcrypt"
// import users from "./../models/userModel.js"
import fs from "fs"

export const signup=async(req,res)=>{
    const {username,email,password}=req.body
    try{
        if(!username||!email||!password) return res.status(400).json({message:"all fields are required"})
        if(password.length<6) return res.status(400).json({
            message:"password must be a minimum of 6 characters"
        })
        const user = users.findOne(username)
        if(user) return res.status(400).json({message:"username already exists"})
        const salt=await bcrypt.genSalt(10);
        const hashed=await bcrypt.hash(password,salt)
        const newUser=new users({
            username,
            email,
            password:hashed
        })
        if(newUser){
            const token=generateToken(username,res)
            await newUser.save()
            res.status(201).status({
                username:newUser.username,
                email:newUser.email,
            })
        }else{
            res.status(400).json({message:"invalid"})
        }
    }catch(error){
        console.log("error in signup controller",error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const create=async(req,res)=>{
    const {username,email,password}=req.body
    try{
        if(!username||!email||!password) return res.status(400).json({message:"all fields are required"})
        if(password.length<6) return res.status(400).json({
            message:"password must be a minimum of 6 characters"
        })
        const data=JSON.parse(fs.readFileSync("./src/userData/db.json","utf8"))
        const dup=data.slice(1).find((curr)=>(curr.username===username||curr.email===email))
        if(dup){
            return res.status(400).json({message:"duplicate credentials"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashed=await bcrypt.hash(password,salt)
        const count=data[0].count++
        const user={
            id:count,
            username,
            email,
            password:hashed
        }
        data.push(user)
        fs.writeFileSync("./src/userData/db.json",JSON.stringify(data,null,2))
        res.status(201).json({
            username,
            email
        })
    }catch(error){
        console.log("error in signup controller",error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const getAll=async(req,res)=>{
    try{
    const data =JSON.parse(fs.readFileSync("./src/userData/db.json","utf8"))
    const finalData=data.slice(1).map(({password,...rest})=>rest)
    res.status(200).json({
        users:finalData
    })
    }catch(error){
        console.log("error in getAll controller",error.message)
        res.status(500).json({message:"internal server error"})
    }   
}

export const deleteUser=async(req,res)=>{
    const username=req.params.username
    try{
        if(!username) return res.status(400).json({message:"username is required"})
        const data =JSON.parse(fs.readFileSync("./src/userData/db.json","utf8"))
        if((data.slice(1).find(curr=>curr.username===username))==null) return res.status(400).json({message:"user doesnt exist"})
        data.splice((data.slice(1).findIndex(curr=>curr.username===username))+1,1)
        fs.writeFileSync("./src/userData/db.json",JSON.stringify(data,null,2))
        res.status(200).json({
            message:"deletion successful"
        })
    }catch(error){
        console.log("error in deleteUser controller",error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const updateUser=async(req,res)=>{
    const username=req.params.username
    const newUsername=req.query.newUsername
    try{
        if(!username||!newUsername) return res.status(400).json({message:"username is required"})
        const data =JSON.parse(fs.readFileSync("./src/userData/db.json","utf8"))
        let index=data.slice(1).findIndex(curr=>curr.username===username)
        let newIndex=data.slice(1).findIndex(curr=>curr.username===newUsername)
        if(index==-1) return res.status(400).json({message:"username doesnt exist"})
        if(newIndex!=-1) return res.status(400).json({message:"username already exists"})
        data[index+1].username=newUsername
        fs.writeFileSync("./src/userData/db.json",JSON.stringify(data,null,2))
        res.status(200).json({
            message:"updation successful"
        })
    }catch(error){
        console.log("error in updateUser controller",error.message)
        res.status(500).json({message:"internal server error"})
    }
}