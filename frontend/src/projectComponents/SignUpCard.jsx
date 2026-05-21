import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/useAuthStore"
import { useState } from "react"

export default function SignupCard() {
  const [formData,setFormData] = useState({
    username:"",
    email:"",
    password:""
  })
  const {signup,isSigningUp} = useAuthStore()
  const validateForm = ()=>{
    let name=formData.username.trim()
    let email=formData.email.trim()
    let password=formData.password.trim()
    if(!name){
      return false;
    }
    if(!email){
      return false;
    }
    if(!/\S+@\S+\.\S+/.test(email)){
      return false;
    }
      if(!password){
        return false;
      }
      if(password.length<6){
        return false;
      }
    return true
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    let isOk = validateForm()
    if(!isOk) return
    await signup(formData)
  }
  return (
    <Card className="w-[90%] md:w-110 bg-white">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="johndoe"
                required
                value={formData.username} spellCheck="false" onChange={(e)=>{
                  setFormData(prev=>({...prev,username:e.target.value}))
                }}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email} spellCheck="false" onChange={(e)=>{
                  setFormData(prev=>({...prev,email:e.target.value}))
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type={"password"} required value={formData.password} spellCheck="false" onChange={(e)=>{
              setFormData(prev=>({...prev,password:e.target.value}))
              }}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" onClick={handleSubmit} disabled={isSigningUp} className="w-full">
          Sign up
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="underline underline-offset-4">
            Login
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}