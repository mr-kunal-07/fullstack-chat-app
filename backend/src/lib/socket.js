import { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStroe'
import SidebarSkeleton from './Skeleton/SidebarSkeleton'
import { User } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()

  const { onlineUsers } = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)


  useEffect(() => {
    getUsers()
  }, [getUsers]);

  const filterUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users

  if (isUsersLoading) return <SidebarSkeleton />


  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
      <div className="borber-b border-base-300 w-full p-5">
        <div className='flex items-center gap-2'>
          <User className='size-6' />
          <span className='font-medium hidden lg:block'>Contacts</span>
        </div>
        {/*  */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className='cursor-pointer flex items-center gap-2'>
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className='checkbox checkbox-sm'
            />
            <span className='text-sm'>Show online Only</span>
          </label>
          <span className='text-xs text-zinc-500'>({onlineUsers.length - 1} online) </span>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {filterUsers.map((user) => (
            <button
              key={user._id}
              className={`w-full  flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt={user.name}
                  className=" size-12 object-cover rounded-full bg-black"
                />
                {onlineUsers.includes(user._id) && (
                  <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-zinc-900 ' />
                )}
              </div>

              {/* user info - only visible on lg */}
              <div className='hidden lg:block text-left min-w-0'>
                <div className='font-medium truncate'>{user.fullName}</div>
                <div className='text-sm text-zinc-400'>
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>

            </button>
          ))}

{filterUsers.length === 0 && (
  <div className="flex items-center justify-center h-full text-zinc-500">
    No online users
  </div>
)}

        </div>
      </div>
    </aside>
  )
}

export default Sidebar
