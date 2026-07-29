import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import photoRoutes from './routes/photoRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import TransactionRoutes from './routes/TransactionRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
const app=express()
app.use(cors())
app.use(express.json())
const connectDB = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECTED✅")
    } catch (err) {
        console.log("error while conncting to DB", err.message)
    }
}
connectDB();
app.use("/uploads", express.static("uploads"));
app.use("/profile-images",express.static("profile-images"))
app.use("/api/ai",aiRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/photo',photoRoutes)
app.use('/api/profile',profileRoutes)
app.use('/api/transaction',TransactionRoutes)
app.use('/api/comments',commentRoutes)
const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`server listening at port number: ${PORT}`)
})