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

export default function LoginCard() {
  const [formData,setFormData] = useState({
      email:"",
      password:""
  })
  const {login,isLoggingIn} = useAuthStore()
  const validateForm = ()=>{
      let email=formData.email.trim()
      let password=formData.password.trim()
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
      await login(formData)
    }
  return (
    <Card className="w-[90%] md:w-110 bg-white">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required 
                spellCheck="false"
                value={formData.email}
                onChange={(e)=>{setFormData((prev)=>({...prev,email:e.target.value}))}}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required value={formData.password} spellCheck="false" onChange={(e)=>{setFormData((prev)=>({...prev,password:e.target.value}))}} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleSubmit} disabled={isLoggingIn}>
          Login
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}