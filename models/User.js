import mongoose from 'mongoose'; // Importing Mongoose for MongoDB interactions

// Defining the user schema
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,  // Name is required
        trim: true       // Removes extra spaces before and after the string
    },
    age: { 
        type: Number, 
        required: true,  // Age is required
        min: 18          // Minimum age allowed is 18
    },
    email: { 
        type: String, 
        required: true,  // Email is required
        trim: true,      // Removes extra spaces
        unique: true,    // Ensures no duplicate emails
        lowercase: true  // Converts email to lowercase for consistency
    },
    contact: { 
        type: Number, 
        required: true // Contact number is required
    },
    address: { 
        type: String, 
        required: true,  // Address is required
        trim: true       // Removes extra spaces
    }
});

// Creating the User model from the schema
const User = mongoose.model("users", userSchema);

// Exporting the model to use in other parts of the app
export default User;
