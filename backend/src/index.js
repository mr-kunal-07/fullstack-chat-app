import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.routes.js"
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { app, server } from "./lib/socket.js";

import path from "path";

dotenv.config();


const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();



// app.use(express.json())
app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
    })
}

server.listen(PORT, () => {

    console.log(`Server listening on port ${PORT}`);
    connectDB();
});