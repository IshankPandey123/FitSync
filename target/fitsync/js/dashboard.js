document.addEventListener('DOMContentLoaded', function() {
    // Set a random motivational quote
    setRandomQuote();
    
    // Add click event listeners to the cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Get the target URL from the onclick attribute
            const url = this.getAttribute('onclick').replace("location.href='", "").replace("'", "");
            window.location.href = url;
        });
    });
    
    // Animate dashboard elements
    animateDashboard();
});

// Function to animate dashboard elements
function animateDashboard() {
    // Add the 'animate-on-scroll' class to elements that should be animated
    const animatedElements = document.querySelectorAll('.quick-links .card, .dashboard-banner');
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Initialize the scroll animation
    animateOnScroll();
} 