document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const calculateBtn = document.getElementById('calculate-bmi');
    const resetBtn = document.getElementById('reset-bmi');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const bmiScoreElement = document.getElementById('bmi-score');
    const bmiCategoryElement = document.getElementById('bmi-category');
    const bmiTipElement = document.getElementById('bmi-tip');
    
    // Add event listeners
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBMI);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetBMI);
    }
});

// Calculate BMI
function calculateBMI() {
    // Get input values
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    
    // Validate input
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert('Please enter valid weight and height values');
        return;
    }
    
    // Calculate BMI
    const bmi = weight / (height * height);
    const roundedBMI = Math.round(bmi * 10) / 10; // Round to 1 decimal place
    
    // Determine BMI category
    let category, tip, categoryClass;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        tip = 'Try to increase your caloric intake with nutrient-rich foods. Focus on strength training to build muscle mass.';
        categoryClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal';
        tip = 'Great job! Maintain your healthy lifestyle with regular exercise and balanced nutrition.';
        categoryClass = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        tip = 'Try to increase physical activity and focus on a balanced diet with portion control.';
        categoryClass = 'overweight';
    } else {
        category = 'Obese';
        tip = 'Consider consulting a healthcare professional. Focus on increasing activity and making dietary changes.';
        categoryClass = 'obese';
    }
    
    // Update the DOM with results
    const bmiScoreElement = document.getElementById('bmi-score');
    const bmiCategoryElement = document.getElementById('bmi-category');
    const bmiTipElement = document.getElementById('bmi-tip');
    
    bmiScoreElement.textContent = roundedBMI;
    bmiCategoryElement.textContent = category;
    bmiTipElement.textContent = tip;
    
    // Reset category classes
    bmiCategoryElement.classList.remove('underweight', 'normal', 'overweight', 'obese');
    
    // Add appropriate category class
    bmiCategoryElement.classList.add(categoryClass);
}

// Reset BMI calculator
function resetBMI() {
    // Reset input fields
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    
    // Reset result display
    document.getElementById('bmi-score').textContent = '--';
    document.getElementById('bmi-category').textContent = '--';
    document.getElementById('bmi-tip').textContent = 'Calculate your BMI to see personalized health tips.';
    
    // Remove category classes
    document.getElementById('bmi-category').classList.remove('underweight', 'normal', 'overweight', 'obese');
} 