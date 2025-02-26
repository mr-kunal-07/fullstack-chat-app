import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStroe' // Fixed typo
import ChatHeader from './ChatHeader'
import MessageInput from './MassageInput' // Fixed typo
import MessageSkeleton from './MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
  const messageEndRef = React.useRef(null)
  const { messages, getMessages, isMessagesLoading, selectedUser, subcribeToMessages, unsubcribeToMessages } = useChatStore()
  const { authUser } = useAuthStore()

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id)
      subcribeToMessages()


      return () => {
        unsubcribeToMessages()
      }
    }
  }, [selectedUser?._id, getMessages, subcribeToMessages, unsubcribeToMessages])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])



  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      : selectedUser?.profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="avatar"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-sm opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="message"
                  className="sm:max-w-[200px] rounded-full mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
