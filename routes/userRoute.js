import express from "express";
import {getUsers, create, updateUser, deleteUser} from "../controller/userController.js"

const userRoute = express.Router();

userRoute.post('/create', create);
userRoute.get("/getAllUsers", getUsers)
userRoute.put("/update/:id", updateUser)
userRoute.delete("/delete/:id", deleteUser)

export default userRoute; 