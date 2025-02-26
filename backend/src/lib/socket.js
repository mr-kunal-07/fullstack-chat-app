import { Server } from "socket.io"
import http from 'http'
import express from "express"
import exp from "constants"


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
})

export function getReceiverSocketId(userId) {
    return userSoketMap[userId]
}


// use to store online users
const userSoketMap = {}  // {userId: socketId}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId // get user id from query param

    if (userId) userSoketMap[userId] = socket.id

    // io.emit is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSoketMap))


    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
        delete userSoketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSoketMap))

    })
})


export { io, server, app };
