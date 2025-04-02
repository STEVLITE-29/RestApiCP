// imported the dependencies to be used
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config({path: "./config/.env"});
import User from './models/User.js';

// created an instance of express
const app = express();
// using the body-parser middleware to parse the request body
app.use(bodyParser.json());


// Function to connect to MongoDB database
const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {dbName: "myRestData"});
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}
connectdb();

app.get("/", async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        if (users.length === 0) { // Check if no users exist
            return res.status(404).json({ message: "No users found." });
        }
        res.status(200).json(users); // Return user list
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" }); // Handle server errors
    }
})

app.post("/", async (req, res) => {
    try {
        const userData = new User(req.body); // Create a new user instance
        const { email } = userData; // Extract email from request body

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists." }); // Return error if user exists
        }

        const savedUser = await userData.save(); // Save new user to database
        res.status(200).json(savedUser); // Return saved user details
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" }); // Handle server errors
    }
})

app.put("/:id", async (req, res) => {
    try {
        const id = req.params.id; // Get user ID from request parameters

        // Check if user exists
        const userExist = await User.findOne({ _id: id });
        if (!userExist) {
            return res.status(404).json({ message: "User not found." }); // Return error if user not found
        }

        // Update the user with new data
        const update = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(update); // Return updated user data
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" }); // Handle server errors
    }
})

app.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id; // Get user ID from request parameters

        // Check if user exists
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found." }); // Return error if user not found
        }

        await User.findByIdAndDelete(id); // Delete user from database
        res.status(200).json({ message: "User deleted successfully." }); // Return success message
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" }); // Handle server errors
    }    
})

// defining the port number and listening to it
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Visit http://localhost:${port}/`);
})