import express from "express";
import {helloMsg, create} from "../controller/userController.js"

const userRoute = express.Router();

userRoute.post('/create', create);
userRoute.get("/fetch", helloMsg)

export default userRoute; 