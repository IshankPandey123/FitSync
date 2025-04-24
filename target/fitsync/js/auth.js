// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Check if we're on the register page
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Check if user is already logged in
    checkAuthStatus();
});

// Check if user is already logged in
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('fitSyncUser'));
    
    // If user is logged in and we're on login/register page, redirect to dashboard
    if (user && (window.location.pathname.endsWith('/index.html') || window.location.pathname === '/' || window.location.pathname.includes('/pages/register.html'))) {
        window.location.href = 'pages/dashboard.html';
    }
    
    // If user is not logged in and we're not on login/register page, redirect to login
    if (!user && !(window.location.pathname.endsWith('/index.html') || window.location.pathname === '/' || window.location.pathname.includes('/pages/register.html'))) {
        window.location.href = '../index.html';
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');
    
    // Validate input
    if (!email || !password) {
        errorElement.textContent = 'Please enter both email and password';
        return;
    }
    
    // Check if user exists (simple localStorage check for demo)
    const users = JSON.parse(localStorage.getItem('fitSyncUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        errorElement.textContent = 'Invalid email or password';
        return;
    }
    
    // Store current user in localStorage
    localStorage.setItem('fitSyncUser', JSON.stringify({
        fullName: user.fullName,
        email: user.email
    }));
    
    // Set first time login flag to show welcome page
    const isFirstLogin = !localStorage.getItem('fitSyncFirstLoginDone');
    
    if (isFirstLogin) {
        // Mark first login as done
        localStorage.setItem('fitSyncFirstLoginDone', 'true');
        // Redirect to welcome page
        window.location.href = 'pages/welcome.html';
    } else {
        // Redirect to dashboard
        window.location.href = 'pages/dashboard.html';
    }
}

// Handle register form submission
function handleRegister(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('register-error');
    
    // Validate input
    if (!fullName || !email || !password || !confirmPassword) {
        errorElement.textContent = 'Please fill in all fields';
        return;
    }
    
    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match';
        return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = 'Please enter a valid email address';
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('fitSyncUsers')) || [];
    if (users.some(user => user.email === email)) {
        errorElement.textContent = 'User with this email already exists';
        return;
    }
    
    // Add new user
    users.push({
        fullName,
        email,
        password
    });
    
    localStorage.setItem('fitSyncUsers', JSON.stringify(users));
    
    // Store current user in localStorage
    localStorage.setItem('fitSyncUser', JSON.stringify({
        fullName,
        email
    }));
    
    // Always show welcome page for new registrations
    window.location.href = 'welcome.html';
} 