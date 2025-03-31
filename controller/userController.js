import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (users.length === 0) {
            return res.status(404).json({message: "No users found."})
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "internal Server Error"})
    }
}

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
        res.status(500).json({error: "internal Server Error"})
    }
}


export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({_id: id});
        if (!userExist) {
            res.status(404).json({message: "User not found."});
        }
        const update = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(201).json(update);
    } catch (error) {
        res.status(500).json({error: "internal Server Error"})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User not found." });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

