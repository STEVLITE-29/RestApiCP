import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port)

// Function to connect to MongoDB database
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {dbName: "myRestData"});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

const main = async () => {
   await connectdb()
}

main()