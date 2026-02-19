import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env"
    )
}

let isConnected = false

async function connectToDatabase() {
    if (isConnected) {
        return mongoose
    }

    try {
        await mongoose.connect(MONGODB_URI!, {
            dbName: process.env.MONGODB_DB_NAME || "portfolio",
        })
        isConnected = true
        console.log("✅ Connected to MongoDB")
        return mongoose
    } catch (error) {
        console.error("❌ MongoDB connection error:", error)
        throw error
    }
}

// Handle connection events
mongoose.connection.on("disconnected", () => {
    isConnected = false
    console.log("⚠️  MongoDB disconnected")
})

mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB error:", err)
})

export default connectToDatabase
