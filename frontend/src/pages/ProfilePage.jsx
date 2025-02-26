import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUplode = async (e) => { 
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64String = reader.result
      setSelectedImage(base64String)
      await updateProfile({ profilePic: base64String })
    }


  }
  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className="bg-base-300 rounded-xl p-6 space-y-8 ">
          <div className="text-center">
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile Information</p>
          </div>

          {/* avter uplode sec */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img
                src={ selectedImage || authUser.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="Profile Pic"
                className='size-32 rounded-full object-cover border-4'
              />
              <label
                htmlFor='avtar-upload'
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className='size-5 text-base-200' />
                <input
                  type='file'
                  id='avtar-upload'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageUplode}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile ? "Updating..." : "Update your profile pic"}
            </p>
          </div>


          {/* user info */}
          <div className="space-y-6">
            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <User className='size-4' />
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border' >{authUser.fullName}</p>
            </div>



            <div className='space-y-1.5'>
              <div className='text-sm text-zinc-400 flex items-center gap-2'>
                <Mail className='size-4' />
                Email Address
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border' >{authUser.email}</p>
            </div>
          </div>


          {/* Additional info */}
          <div className='mt-6 bgbase-300 p-6 rounded-xl'>
            <h2 className='text-lg font-medium mb-4'>Account Information</h2>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0] || "N/A"}</span>
              </div>

              <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                <span>Account Status</span>
                <span className='text-green-500'>Active</span>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default ProfilePage