import React from 'react'
import ProfileCard from '@/projectComponents/ProfileCard'
import avatar from "./../assets/image.webp"
import { useAuthStore } from '@/store/useAuthStore'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ProfilePage = () => {
  const {authUser} = useAuthStore()

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center bg-white gap-10'>
      <Avatar className="h-30 w-30">
            <AvatarImage src={authUser.profilePic||avatar} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
      <ProfileCard />
    </div>
  )
}

export default ProfilePage