// Common JS functionality shared across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Handle logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Display user name
    displayUserName();
});

// Handle logout
function handleLogout() {
    // Clear client-side storage
    localStorage.removeItem('fitSyncUser');
    
    // Redirect to the logout servlet to invalidate server-side session
    window.location.href = '../logout';
}

// Display user name in the navigation bar
function displayUserName() {
    const userNameElement = document.getElementById('user-name');
    
    if (userNameElement) {
        const user = JSON.parse(localStorage.getItem('fitSyncUser'));
        
        if (user) {
            userNameElement.textContent = user.fullName.split(' ')[0]; // Show first name only
        }
    }
    
    // Also update greeting on dashboard if applicable
    const greetingNameElement = document.getElementById('greeting-name');
    
    if (greetingNameElement) {
        const user = JSON.parse(localStorage.getItem('fitSyncUser'));
        
        if (user) {
            greetingNameElement.textContent = user.fullName;
        }
    }
}

// Utility function to animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Generate random motivational quotes
function getRandomQuote() {
    const quotes = [
        "The only bad workout is the one that didn't happen.",
        "Your body can stand almost anything. It's your mind that you have to convince.",
        "The difference between try and triumph is a little umph.",
        "Fitness is not about being better than someone else. It's about being better than you used to be.",
        "The hard days are what make you stronger.",
        "Strength does not come from the physical capacity. It comes from an indomitable will.",
        "The only place where success comes before work is in the dictionary.",
        "The clock is ticking. Are you becoming the person you want to be?"
    ];
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Set a random motivational quote
function setRandomQuote() {
    const quoteElement = document.getElementById('motivational-quote');
    
    if (quoteElement) {
        quoteElement.textContent = `"${getRandomQuote()}"`;
    }
} 