document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const dietPlanContainers = document.querySelectorAll('.diet-plan-container');
    const dayBtns = document.querySelectorAll('.day-btn');
    const dayMeals = document.querySelectorAll('.day-meals');
    const alternativeBtns = document.querySelectorAll('.btn-secondary');
    const eatenBtns = document.querySelectorAll('.btn-primary');
    
    // Add event listeners to tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tab buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all diet plan containers
            dietPlanContainers.forEach(container => {
                container.classList.remove('active');
            });
            
            // Show the selected diet plan container
            const selectedTab = this.getAttribute('data-tab');
            document.getElementById(selectedTab).classList.add('active');
        });
    });
    
    // Add event listeners to day buttons
    dayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Find parent meal-days container
            const mealDaysContainer = this.closest('.meal-days');
            
            // Remove active class from all day buttons in this container
            mealDaysContainer.querySelectorAll('.day-btn').forEach(b => {
                b.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all day meals in this container
            mealDaysContainer.querySelectorAll('.day-meals').forEach(meals => {
                meals.classList.remove('active');
            });
            
            // Show the selected day meals
            const selectedDay = this.getAttribute('data-day');
            mealDaysContainer.querySelector(`.day-meals[data-day="${selectedDay}"]`).classList.add('active');
        });
    });
    
    // Add event listeners to alternative buttons
    alternativeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showAlternativeMeal(this);
        });
    });
    
    // Add event listeners to eaten buttons
    eatenBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            markMealAsEaten(this);
        });
    });
    
    // Initialize by loading saved meal states
    loadSavedMealStates();
});

// Show alternative meal
function showAlternativeMeal(button) {
    const mealCard = button.closest('.meal-card');
    const mealTitle = mealCard.querySelector('h5');
    const mealIngredients = mealCard.querySelector('.meal-ingredients');
    const mealNutrition = mealCard.querySelector('.meal-nutrition');
    const mealType = mealCard.querySelector('.meal-header h4').textContent.toLowerCase();
    
    // Get alternative meal based on meal type
    const alternativeMeal = getAlternativeMeal(mealType);
    
    // Update meal details
    mealTitle.textContent = alternativeMeal.title;
    
    // Update ingredients
    mealIngredients.innerHTML = '';
    alternativeMeal.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        mealIngredients.appendChild(li);
    });
    
    // Update nutrition info
    const nutritionSpans = mealNutrition.querySelectorAll('span');
    nutritionSpans[0].textContent = `Protein: ${alternativeMeal.nutrition.protein}`;
    nutritionSpans[1].textContent = `Carbs: ${alternativeMeal.nutrition.carbs}`;
    nutritionSpans[2].textContent = `Fat: ${alternativeMeal.nutrition.fat}`;
    
    // Show notification
    showNotification('Alternative meal loaded!');
}

// Get alternative meal data
function getAlternativeMeal(mealType) {
    // Sample alternative meals
    const alternatives = {
        breakfast: [
            {
                title: 'Avocado Toast with Eggs',
                ingredients: [
                    '2 slices whole grain bread',
                    '1/2 avocado, mashed',
                    '2 eggs, poached',
                    'Red pepper flakes to taste',
                    'Salt and pepper to taste'
                ],
                nutrition: {
                    protein: '20g',
                    carbs: '30g',
                    fat: '15g'
                }
            },
            {
                title: 'Protein Pancakes',
                ingredients: [
                    '1 scoop protein powder',
                    '1 banana',
                    '2 eggs',
                    '1/4 cup oats',
                    'Cinnamon to taste'
                ],
                nutrition: {
                    protein: '30g',
                    carbs: '35g',
                    fat: '10g'
                }
            }
        ],
        lunch: [
            {
                title: 'Quinoa Power Bowl',
                ingredients: [
                    '1 cup cooked quinoa',
                    '4 oz grilled tofu or chicken',
                    '1 cup mixed vegetables',
                    '1/4 avocado',
                    '2 tbsp tahini dressing'
                ],
                nutrition: {
                    protein: '25g',
                    carbs: '40g',
                    fat: '15g'
                }
            },
            {
                title: 'Mediterranean Wrap',
                ingredients: [
                    '1 whole grain wrap',
                    '3 oz falafel or grilled chicken',
                    '2 tbsp hummus',
                    'Cucumber, tomato, and lettuce',
                    '1 tbsp tzatziki sauce'
                ],
                nutrition: {
                    protein: '20g',
                    carbs: '45g',
                    fat: '12g'
                }
            }
        ],
        dinner: [
            {
                title: 'Lentil and Vegetable Curry',
                ingredients: [
                    '1 cup cooked lentils',
                    '1 cup mixed vegetables',
                    '1/4 cup coconut milk',
                    'Curry spices to taste',
                    '1/2 cup brown rice'
                ],
                nutrition: {
                    protein: '20g',
                    carbs: '50g',
                    fat: '10g'
                }
            },
            {
                title: 'Baked Cod with Roasted Vegetables',
                ingredients: [
                    '5 oz cod fillet',
                    '1 cup roasted vegetables',
                    '1/2 sweet potato',
                    '1 tbsp olive oil',
                    'Herbs and lemon'
                ],
                nutrition: {
                    protein: '30g',
                    carbs: '30g',
                    fat: '15g'
                }
            }
        ],
        snack: [
            {
                title: 'Greek Yogurt Parfait',
                ingredients: [
                    '1 cup Greek yogurt',
                    '1/4 cup granola',
                    '1/2 cup berries',
                    '1 tbsp honey',
                    '1 tbsp chia seeds'
                ],
                nutrition: {
                    protein: '20g',
                    carbs: '30g',
                    fat: '8g'
                }
            },
            {
                title: 'Protein Energy Balls',
                ingredients: [
                    '2 energy balls',
                    '1/2 cup dates',
                    '1/4 cup nut butter',
                    '1/4 cup protein powder',
                    '2 tbsp cacao nibs'
                ],
                nutrition: {
                    protein: '15g',
                    carbs: '25g',
                    fat: '12g'
                }
            }
        ]
    };
    
    // Get random alternative for the meal type
    const mealOptions = alternatives[mealType] || alternatives.snack;
    const randomIndex = Math.floor(Math.random() * mealOptions.length);
    return mealOptions[randomIndex];
}

// Mark meal as eaten
function markMealAsEaten(button) {
    const mealCard = button.closest('.meal-card');
    
    // Toggle eaten state
    if (button.innerHTML.includes('Eaten')) {
        button.innerHTML = '<i class="fas fa-check"></i> Eaten';
        button.classList.remove('eaten');
        mealCard.classList.remove('eaten');
    } else {
        button.innerHTML = '<i class="fas fa-undo"></i> Undo';
        button.classList.add('eaten');
        mealCard.classList.add('eaten');
        
        // Show notification
        showNotification('Meal marked as eaten!');
    }
    
    // Save meal state
    saveMealState(mealCard, button.classList.contains('eaten'));
}

// Save meal state to localStorage
function saveMealState(mealCard, isEaten) {
    // Get unique identifier for this meal
    const mealType = mealCard.querySelector('.meal-header h4').textContent;
    const mealTitle = mealCard.querySelector('h5').textContent;
    const dayElement = mealCard.closest('.day-meals');
    const day = dayElement ? dayElement.getAttribute('data-day') : '1';
    const dietPlan = mealCard.closest('.diet-plan-container').id;
    
    const mealId = `${dietPlan}-day${day}-${mealType}-${mealTitle}`;
    
    // Get saved meals from localStorage
    const savedMeals = JSON.parse(localStorage.getItem('fitSyncEatenMeals')) || {};
    
    // Update meal state
    if (isEaten) {
        savedMeals[mealId] = {
            isEaten: true,
            eatenAt: new Date().toISOString()
        };
    } else {
        delete savedMeals[mealId];
    }
    
    // Save back to localStorage
    localStorage.setItem('fitSyncEatenMeals', JSON.stringify(savedMeals));
}

// Load saved meal states from localStorage
function loadSavedMealStates() {
    // Get saved meals from localStorage
    const savedMeals = JSON.parse(localStorage.getItem('fitSyncEatenMeals')) || {};
    
    // Apply saved states to meal cards
    document.querySelectorAll('.meal-card').forEach(mealCard => {
        // Get unique identifier for this meal
        const mealType = mealCard.querySelector('.meal-header h4').textContent;
        const mealTitle = mealCard.querySelector('h5').textContent;
        const dayElement = mealCard.closest('.day-meals');
        const day = dayElement ? dayElement.getAttribute('data-day') : '1';
        const dietPlan = mealCard.closest('.diet-plan-container').id;
        
        const mealId = `${dietPlan}-day${day}-${mealType}-${mealTitle}`;
        
        // If meal is saved as eaten, update UI
        if (savedMeals[mealId] && savedMeals[mealId].isEaten) {
            const eatenBtn = mealCard.querySelector('.btn-primary');
            eatenBtn.innerHTML = '<i class="fas fa-undo"></i> Undo';
            eatenBtn.classList.add('eaten');
            mealCard.classList.add('eaten');
        }
    });
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

// Add CSS for notifications and eaten meals
function addStyles() {
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
        
        .meal-card.eaten {
            opacity: 0.7;
        }
        
        .meal-card.eaten::after {
            content: "✓";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 5rem;
            color: var(--primary-color);
            z-index: 10;
        }
    `;
    
    // Add to document
    document.head.appendChild(style);
}

// Call the function to add styles
addStyles(); 