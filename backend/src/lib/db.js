import mongose from "mongoose";

export const connectDB = async () => {
    try {
       const conn =  await mongose.connect(process.env.MONGODB_URI)
       console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error}`);
    }
}