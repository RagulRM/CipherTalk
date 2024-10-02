// Registration Form Submission
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Get the values from the input fields
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const passkey = document.getElementById('registerPasskey').value.trim();

        // Log the values to check
        console.log('Registration - Username:', username);
        console.log('Registration - Password:', password);
        console.log('Registration - Passkey:', passkey);

        // Check if username, password, and passkey are not empty
        if (!username || !password || !passkey) {
            alert("Username, Password, and Passkey cannot be empty.");
            return; // Exit the function if any field is empty
        }

        // Send the registration request
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, passkey })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.text();
        })
        .then(data => alert(data))
        .catch(err => console.error('Error:', err));
    });
}



// Login Form Submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Get the values from the input fields
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        // Log the values to check
        console.log('Login - Username:', username);
        console.log('Login - Password:', password);

        // Check if username and password are not empty
        if (!username || !password) {
            alert("Username and password cannot be empty.");
            return; // Exit the function if any field is empty
        }

        // Send the login request
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return res.text();
        })
        .then(data => alert(data))
        .catch(err => console.error('Error:', err));
    });
}