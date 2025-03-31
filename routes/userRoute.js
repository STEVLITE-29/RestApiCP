import express from "express"; // Import Express framework
import { getUsers, create, updateUser, deleteUser } from "../controller/userController.js"; // Import user controller functions

// Create an instance of Express Router
const userRoute = express.Router();

// Route to create a new user (POST request)
userRoute.post('/create', create);  

// Route to get all users (GET request)
userRoute.get("/getAllUsers", getUsers);  

// Route to update a user by ID (PUT request)
userRoute.put("/update/:id", updateUser);  

// Route to delete a user by ID (DELETE request)
userRoute.delete("/delete/:id", deleteUser);  

// Export the router to use in the main app
export default userRoute;
