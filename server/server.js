const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chat_platform')
    .then(() => {
        console.log("Connected to MongoDB Database");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
    });


// Define User Schema and Model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    passkey: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '..', 'client')));

// Registration Route
app.post('/register', async (req, res) => {
    console.log('Register Request:', req.body);

    const { username, password, passkey } = req.body;

    // Simple validation
    if (!username || !password || !passkey) {
        console.log('Validation Error: All fields are required');
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('User exists: ', existingUser);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new User({ username, password: hashedPassword, passkey });
        await newUser.save();
        console.log('User registered successfully:', newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log('Login Request:', req.body);

        // Find the user by username
        let user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials for user:', username);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // If password matches, login is successful
        console.log('Login successful for user:', username);
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fallback route for any other request (serve index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});