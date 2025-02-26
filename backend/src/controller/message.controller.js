import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloud.js"
import { getReceiverSocketId, io } from "../lib/socket.js"

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filterUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

        res.status(200).json(filterUser)

    } catch (error) {
        console.log("Error in getUserForSidebar controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myid = req.user._id

        const message = await Message.find({
            $or: [
                { senderId: myid, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myid }
            ]
        })

        res.status(200).json(message)
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const sendMassage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl;
        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadedResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()
        
        
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(200).json(newMessage)

    } catch (error) {
        console.log("Error in sendMassage controller: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}