import React from 'react'
import LoginCard from "./../projectComponents/LoginCard"
import {Button} from "@/components/ui/button"

const LoginPage = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-10'>
        <h1 className='text-5xl'>ZENKAI-SYNC</h1>
        <LoginCard></LoginCard>
    </div>
  )
}

export default LoginPage