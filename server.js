// imported the dependencies to be used
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import userRoute from './routes/userRoute.js';

// created an instance of express
const app = express();
// using the body-parser middleware to parse the request body
app.use(bodyParser.json());

// definin the port number and listening to it
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Visit http://localhost:${port}/`);
})

// Function to connect to MongoDB database
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {dbName: "myRestData"});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

app.use("/user", userRoute)

// using the main function to connect to the database
const main = async () => {
   await connectdb()
}

// calling the main function to connect to the database
main()