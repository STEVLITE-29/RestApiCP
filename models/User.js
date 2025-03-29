import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    age: {type: Number, required: true, min: 18},
    email: {type: String, required: true, trim: true, unique: true, lowercase: true},
    contact: {type: Number, required: true, trim: true},
    address: {type: String, required: true, trim: true}
});

const User = mongoose.model("users", userSchema);
export default User;