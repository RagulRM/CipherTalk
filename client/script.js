// Get references to buttons, forms, title, image, modals, and modal buttons
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const goBackRegister = document.getElementById('goBackRegister');
const goBackLogin = document.getElementById('goBackLogin');
const pageTitle = document.getElementById('pageTitle'); // Reference to the title
const titleImage = document.getElementById('titleImage'); // Reference to the image
const warningModal = document.getElementById('warningModal'); // Warning Modal
const changeButton = document.getElementById('changeButton');
const okayButton = document.getElementById('okayButton');
const successModal = document.getElementById('successModal'); // Success Modal
const continueLoginButton = document.getElementById('continueLoginButton'); // Continue to Login Button

// Store the registration data to proceed later
let registrationData = {};

// Show the register form when "Register" button is clicked
registerButton.addEventListener('click', () => {
    registerForm.style.display = 'flex';
    loginForm.style.display = 'none';
    registerButton.style.display = 'none';
    loginButton.style.display = 'none';
    titleImage.style.display = 'none'; // Hide the image
    pageTitle.textContent = "Register to the Chat Platform"; // Change title
});

// Show the login form when "Login" button is clicked
loginButton.addEventListener('click', () => {
    loginForm.style.display = 'flex';
    registerForm.style.display = 'none';
    registerButton.style.display = 'none';
    loginButton.style.display = 'none';
    titleImage.style.display = 'none'; // Hide the image
    pageTitle.textContent = "Welcome Back"; // Change title
});

// Go back to the main page from the registration form
goBackRegister.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    registerButton.style.display = 'inline-block';
    loginButton.style.display = 'inline-block';
    titleImage.style.display = 'block'; // Show the image
    pageTitle.textContent = "Welcome to the Chat Platform"; // Reset title
});

// Go back to the main page from the login form
goBackLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerButton.style.display = 'inline-block';
    loginButton.style.display = 'inline-block';
    titleImage.style.display = 'block'; // Show the image
    pageTitle.textContent = "Welcome to the Chat Platform"; // Reset title
});

// Registration Form Submission
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const passkey = document.getElementById('registerPasskey').value.trim();

        if (!username || !password || !passkey) {
            alert("Username, Password, and Passkey cannot be empty.");
            return;
        }

        // Store the registration data for later use
        registrationData = { username, password, passkey };

        // Show the warning modal
        warningModal.style.display = 'block';
    });
}

// Handle "Change" button - Redirects back to registration form
changeButton.addEventListener('click', () => {
    warningModal.style.display = 'none';
});

// Handle "Okay" button - Proceed with registration only once
okayButton.addEventListener('click', () => {
    warningModal.style.display = 'none';

    // Proceed with the registration using stored data
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    })
    .then(res => res.json())
    .then(data => {
        // Redirect and show the success modal after redirect
        if (data.message === 'User registered successfully') {
            handleSuccessfulRegistration(); // Trigger redirect and set flag
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('There was an error with your registration. Please try again.');
    });

    // Clear the registration data after successful submission
    registrationData = {};
});

// Handle "Continue to login" button - Hides the modal and reveals the home page
continueLoginButton.addEventListener('click', () => {
    successModal.style.display = 'none';
});

// Store a flag for successful registration in localStorage
function handleSuccessfulRegistration() {
    localStorage.setItem('registered', 'true');  // Store flag in localStorage
    window.location.href = 'index.html';  // Redirect to home page
}

// On home page load, check if registration was successful
window.addEventListener('load', () => {
    if (localStorage.getItem('registered') === 'true') {
        // Show the success modal on the home page after redirect
        successModal.style.display = 'block';
        localStorage.removeItem('registered');  // Clear the flag so it only happens once
    }
});
