import React from 'react'
import SignupCard from '@/projectComponents/SignUpCard'

const SignUpPage = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-10'>
        <h1 className='text-5xl'>ZENKAI-SYNC</h1>
        <SignupCard></SignupCard>
    </div>
  )
}

export default SignUpPage