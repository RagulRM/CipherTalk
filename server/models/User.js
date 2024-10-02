// const mongoose = require('mongoose');

// // Define the schema
// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     passkey: { type: String, required: true }
// });

// // Create the model
// const User = mongoose.model('User', UserSchema);

// // Export the model
// module.exports = User;

const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Username must be unique
    password: { type: String, required: true }, // Password is required
    passkey: { type: String, required: true } // Passkey is also required
});

// Create the model
const User = mongoose.model('User', UserSchema);

// Export the model
module.exports = User;

