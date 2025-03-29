import User from "../models/User.js";

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        const {email} = userData;

        const userExists = await User.findOne({email});
        if (userExists) {
            res.status(400).json({message: "User already exists."});
        }
        
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({error: "internal Server error"})
    }
}

export const helloMsg = async (req, res) => {
    try {
        return res.json("Hello World")
    } catch (error) {
        res.status(500).json({error: "internal Server error"})
    }
}
