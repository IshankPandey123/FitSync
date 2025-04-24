document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const categoryFilterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const levelFilterBtns = document.querySelectorAll('.filter-btn[data-level]');
    const workoutCards = document.querySelectorAll('.workout-card');
    const saveButtons = document.querySelectorAll('.workout-actions .btn-secondary');
    const startButtons = document.querySelectorAll('.workout-actions .btn-primary');
    
    // Add event listeners to category filter buttons
    categoryFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all category buttons
            categoryFilterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter workouts
            filterWorkouts();
        });
    });
    
    // Add event listeners to level filter buttons
    levelFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all level buttons
            levelFilterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter workouts
            filterWorkouts();
        });
    });
    
    // Add event listeners to save buttons
    saveButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent clicking on the card
            toggleSaveWorkout(this);
        });
    });
    
    // Add event listeners to start buttons
    startButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent clicking on the card
            startWorkout(this);
        });
    });
});

// Filter workouts based on selected category and level
function filterWorkouts() {
    const selectedCategory = document.querySelector('.filter-btn[data-filter].active').getAttribute('data-filter');
    const selectedLevel = document.querySelector('.filter-btn[data-level].active').getAttribute('data-level');
    const workoutCards = document.querySelectorAll('.workout-card');
    
    workoutCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardLevel = card.getAttribute('data-level');
        
        // Check if the card should be shown based on filters
        const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
        const levelMatch = selectedLevel === 'all' || cardLevel === selectedLevel;
        
        if (categoryMatch && levelMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Toggle save workout
function toggleSaveWorkout(button) {
    // Toggle saved state
    if (button.innerHTML.includes('Save')) {
        button.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        button.classList.add('saved');
        
        // Show save notification
        showNotification('Workout saved successfully!');
        
        // Save to localStorage (implementation depends on your data structure)
        saveWorkoutToStorage(button);
    } else {
        button.innerHTML = '<i class="fas fa-bookmark"></i> Save';
        button.classList.remove('saved');
        
        // Show unsave notification
        showNotification('Workout removed from saved');
        
        // Remove from localStorage
        removeWorkoutFromStorage(button);
    }
}

// Start workout
function startWorkout(button) {
    // Get workout details from parent card
    const card = button.closest('.workout-card');
    const workoutTitle = card.querySelector('h3').textContent;
    
    // Show start notification
    showNotification(`Starting ${workoutTitle}...`);
    
    // This would typically redirect to a detailed workout page
    // For now, we'll just show a notification
    
    // In a real app, you might do:
    // window.location.href = `workout-detail.html?id=${workoutId}`;
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Add visible class after a short delay (for animation)
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
        
        // Remove from DOM after fade out
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Save workout to localStorage
function saveWorkoutToStorage(button) {
    // Get workout details
    const card = button.closest('.workout-card');
    const workoutTitle = card.querySelector('h3').textContent;
    const category = card.getAttribute('data-category');
    const level = card.getAttribute('data-level');
    
    // Get saved workouts array from localStorage
    const savedWorkouts = JSON.parse(localStorage.getItem('fitSyncSavedWorkouts')) || [];
    
    // Add new workout if not already saved
    if (!savedWorkouts.some(workout => workout.title === workoutTitle)) {
        savedWorkouts.push({
            title: workoutTitle,
            category: category,
            level: level,
            savedDate: new Date().toISOString()
        });
        
        // Save back to localStorage
        localStorage.setItem('fitSyncSavedWorkouts', JSON.stringify(savedWorkouts));
    }
}

// Remove workout from localStorage
function removeWorkoutFromStorage(button) {
    // Get workout details
    const card = button.closest('.workout-card');
    const workoutTitle = card.querySelector('h3').textContent;
    
    // Get saved workouts array from localStorage
    const savedWorkouts = JSON.parse(localStorage.getItem('fitSyncSavedWorkouts')) || [];
    
    // Remove workout
    const updatedWorkouts = savedWorkouts.filter(workout => workout.title !== workoutTitle);
    
    // Save back to localStorage
    localStorage.setItem('fitSyncSavedWorkouts', JSON.stringify(updatedWorkouts));
}

// Add CSS for notifications
function addNotificationStyles() {
    // Create style element
    const style = document.createElement('style');
    
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s, transform 0.3s;
            z-index: 1000;
        }
        
        .notification.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    // Add to document
    document.head.appendChild(style);
}

// Call the function to add styles
addNotificationStyles(); 