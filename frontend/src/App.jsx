import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import {useAuthStore} from "./store/useAuthStore"
import { Toaster } from 'react-hot-toast'
import { Routes,Route,Navigate } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import './App.css'

function App() {
  const {authUser,checkAuth,isCheckingAuth}=useAuthStore()
  useEffect(()=>{
    checkAuth()
    console.log("user loginned",authUser)
  },[checkAuth])

  if(isCheckingAuth) return(
    <div className='flex justify-center items-center h-screen text-7xl bg-black text-white'>
      <div className='animate-bounce'>. </div>
      <div className='animate-bounce delay1'>. </div>
      <div className='animate-bounce delay2'>. </div>
    </div>
  )

  return (
      <div className='w-screen h-screen flex flex-col justify-center items-center bg-white'>
      {/* <Navbar /> */}

      <div><Toaster className="bg-black"
      position="bottom-right"
      reverseOrder={true}
      /></div>
      <Routes>
        <Route path='/' element={authUser?<HomePage />:<Navigate to="/login" />} />
        <Route path='/signup' element={!authUser?<SignUpPage />:<Navigate to="/" />} />
        <Route path='/login' element={!authUser?<LoginPage />:<Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <ProfilePage />:<Navigate to="/login" />}  />
      </Routes>
    </div>
  )
}

export default App