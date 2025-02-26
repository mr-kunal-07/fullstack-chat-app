import { create } from 'zustand'
import toast from "react-hot-toast";
import { axiosInstance } from '../lib/axios'
import {useAuthStore} from './useAuthStore'


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,




    getUsers: async () => {
        set({ isUsersLoading: true })
        try {
            const res = await axiosInstance.get("/messages/users")
            set({ users: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages = [] } = get(); // Ensure messages has a default value

        if (!selectedUser?._id) {
            toast.error("No recipient selected!");
            return;
        }

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.error("Message send error:", error);
            toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
        }
    },

   
    subcribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return
        
        const sockert = useAuthStore.getState().socket
        sockert.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return
            set({ messages: [...get().messages, newMessage] })
        })

    },

    unsubcribeToMessages: () => {        
        const sockert = useAuthStore.getState().socket
        sockert.off("newMessage")
    },


    setSelectedUser: (selectedUser) => set({ selectedUser }),


}))