// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
// const User = require('./models/User'); // Import the User model
// const path = require('path');

// const app = express();

// // Middleware to parse incoming JSON data
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/chat_platform')
//     .then(() => {
//         console.log("Connected to MongoDB Database");
//     })
//     .catch((err) => {
//         console.log("Failed to connect to MongoDB", err);
//     });


// // Serve static files from the client directory
// app.use(express.static(path.join(__dirname, '..', 'client')));

// // Registration Route
// app.post('/register', async (req, res) => {
//     console.log('Register Request:', req.body); // Log the request body

//     const { username, password, passkey } = req.body;

//     // Simple validation
//     if (!username || !password || !passkey) {
//         console.log('Validation Error: All fields are required'); // Log validation error
//         return res.status(400).send('All fields are required');
//     }

//     try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             console.log('User exists: ', existingUser); // Log existing user
//             return res.status(400).send('User already exists');
//         }

//         // Hash the password before storing
//         const hashedPassword = await bcrypt.hash(password, 10);  // <-- Hash the password here

//         // Create a new user with the hashed password
//         const newUser = new User({ username, password: hashedPassword, passkey });  // <-- Save hashed password
//         await newUser.save();
//         console.log('User registered successfully:', newUser); // Log successful registration

//         res.status(201).send('User registered successfully');
//     } catch (err) {
//         console.error('Error during registration:', err); // Log any error during registration
//         res.status(500).send('Error registering user');
//     }
// });





// // Login Route
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body; // Passkey is not needed for login

//     try {
//         // Log the incoming request
//         console.log('Login Request:', req.body); // Log the login request body

//         // Find the user by username
//         let user = await User.findOne({ username });
//         if (!user) {
//             console.log('User not found:', username); // Log username if not found
//             return res.status(400).send('User not found');
//         }

//         // Compare the provided password with the hashed password stored in the database
//         const isMatch = await bcrypt.compare(password, user.password); // Compare password with hashed password
//         if (!isMatch) {
//             console.log('Invalid credentials for user:', username); // Log invalid credentials
//             return res.status(400).send('Invalid credentials');
//         }

//         // If password matches, login is successful
//         console.log('Login successful for user:', username); // Log successful login
//         res.status(200).send('Login successful');
//     } catch (err) {
//         console.error('Error during login:', err.message); // Log any error during login
//         res.status(500).send('Server error');
//     }
// });





// // Fallback route for any other request (serve index.html)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const User = require('./models/User'); // Import the User model
const path = require('path');

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chat_platform')
    .then(() => {
        console.log("Connected to MongoDB Database");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
    });

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '..', 'client')));

// Registration Route
app.post('/register', async (req, res) => {
    console.log('Register Request:', req.body); // Log the request body

    const { username, password, passkey } = req.body;

    // Simple validation
    if (!username || !password || !passkey) {
        console.log('Validation Error: All fields are required'); // Log validation error
        return res.status(400).send('All fields are required');
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('User exists: ', existingUser); // Log existing user
            return res.status(400).send('User already exists');
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password

        // Create a new user with the hashed password
        const newUser = new User({ username, password: hashedPassword, passkey });
        await newUser.save();
        console.log('User registered successfully:', newUser); // Log successful registration

        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Error during registration:', err); // Log any error during registration
        res.status(500).send('Error registering user');
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // Passkey is not needed for login

    try {
        // Log the incoming request
        console.log('Login Request:', req.body); // Log the login request body

        // Find the user by username
        let user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username); // Log username if not found
            return res.status(400).send('User not found');
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials for user:', username); // Log invalid credentials
            return res.status(400).send('Invalid credentials');
        }

        // If password matches, login is successful
        console.log('Login successful for user:', username); // Log successful login
        res.status(200).send('Login successful');
    } catch (err) {
        console.error('Error during login:', err.message); // Log any error during login
        res.status(500).send('Server error');
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
