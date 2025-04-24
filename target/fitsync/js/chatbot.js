document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    // Add event listeners
    if (sendBtn && userInput) {
        sendBtn.addEventListener('click', function() {
            sendMessage();
        });
        
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add click event listeners to suggestion items
    const suggestions = document.querySelectorAll('.chat-suggestions li');
    suggestions.forEach(suggestion => {
        suggestion.addEventListener('click', function() {
            userInput.value = this.textContent;
            sendMessage();
        });
    });
});

// Send message to the chatbot
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const message = userInput.value.trim();
    
    // Don't send empty messages
    if (!message) {
        return;
    }
    
    // Add user message to chat
    addMessageToChat('user', message);
    
    // Clear input field
    userInput.value = '';
    
    // Get bot response after a short delay
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessageToChat('bot', response);
        
        // Scroll to the bottom of the chat
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 500);
}

// Add a message to the chat window
function addMessageToChat(sender, message) {
    const chatWindow = document.getElementById('chat-window');
    
    // Create message elements
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'chat-avatar';
    
    const avatarIcon = document.createElement('i');
    avatarIcon.className = sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'chat-content';
    
    const messageText = document.createElement('p');
    messageText.textContent = message;
    
    // Assemble the message
    avatarDiv.appendChild(avatarIcon);
    contentDiv.appendChild(messageText);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    // Add to chat window
    chatWindow.appendChild(messageDiv);
    
    // Scroll to the bottom of the chat
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Get bot response based on user input
function getBotResponse(userMessage) {
    // Convert user message to lowercase for easier matching
    const message = userMessage.toLowerCase();
    
    // Check for greetings
    const greetings = ['hi', 'hello', 'hey', 'hola', 'howdy', 'greetings', 'sup', 'yo'];
    if (greetings.some(greeting => message === greeting || message.startsWith(greeting + ' '))) {
        return "Hello! How can I help with your fitness journey today? Feel free to ask me about workouts, nutrition, or health tips.";
    }
    
    // Handle goodbye messages
    const goodbyes = ['bye', 'goodbye', 'see you', 'cya', 'later', 'good night'];
    if (goodbyes.some(bye => message === bye || message.includes(bye))) {
        return "Goodbye! Remember to stay active and keep working toward your fitness goals. Come back anytime for more advice!";
    }
    
    // Handle thank you messages
    if (message.includes('thank') || message.includes('thanks') || message === 'ty') {
        return "You're welcome! I'm always here to help with your fitness questions.";
    }
    
    // Handle how are you messages
    if (message.includes('how are you') || message === 'how r u' || message === 'hru') {
        return "I'm doing great, thanks for asking! Ready to help you with your fitness goals. What can I assist you with today?";
    }
    
    // Predefined Q&A responses
    const responses = {
        'what is a good workout for weight loss': 
            'For weight loss, a combination of cardio and strength training works best. Try 30 minutes of HIIT (High-Intensity Interval Training) 3-4 times per week, plus 2-3 strength sessions. Don\'t forget that diet plays a major role in weight loss too!',
        
        'how many calories should i eat daily': 
            'The average adult needs about 2000-2500 calories for men and 1600-2000 for women, but this varies based on age, weight, height, and activity level. For weight loss, create a deficit of 500 calories per day to lose about 1 pound per week. Consider using a calorie calculator or consulting a nutritionist for personalized advice.',
        
        'what\'s a healthy breakfast idea': 
            'A balanced breakfast could include: Greek yogurt with berries and a tablespoon of honey, overnight oats with nuts and fruits, or a vegetable omelet with whole-grain toast. The key is to include protein, complex carbs, and healthy fats to keep you energized.',
        
        'how often should i work out': 
            'Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week, plus strength training for all major muscle groups 2-3 times weekly. It\'s best to spread your activity throughout the week and allow at least one rest day. Listen to your body and adjust as needed.',
        
        'best exercises for abs': 
            'Effective ab exercises include planks, bicycle crunches, Russian twists, and hanging leg raises. Remember that visible abs also require losing fat through diet and cardio. Aim for 2-3 ab workouts per week as part of a complete fitness routine.',
        
        'how to build muscle': 
            'To build muscle: 1) Perform resistance training 3-4 times per week, focusing on progressive overload, 2) Consume sufficient protein (0.7-1g per pound of bodyweight), 3) Ensure you\'re in a caloric surplus, 4) Get adequate sleep (7-9 hours), and 5) Allow 48-72 hours of recovery between training the same muscle group.',
        
        'what should i eat before a workout': 
            'Eat a meal with carbs and some protein 2-3 hours before workout, or a smaller snack 30-60 minutes before. Good options include a banana with peanut butter, oatmeal with fruit, or a small protein smoothie. Hydration is also key - drink water before, during, and after exercise.',
        
        'how to improve flexibility': 
            'To improve flexibility: 1) Do dynamic stretches before workouts and static stretches after, 2) Hold stretches for 15-60 seconds, 3) Try yoga or Pilates, 4) Stay consistent with 2-3 flexibility sessions per week, 5) Focus on major muscle groups like hamstrings, hip flexors, and shoulders.',
            
        'how much water should i drink': 
            'Aim for about 8 cups (64 ounces) of water daily as a baseline, but this varies based on your size, activity level, and climate. During workouts, drink 7-10 ounces every 10-20 minutes. A good indicator of hydration is having pale yellow urine.',
            
        'best protein sources': 
            'Top protein sources include: lean meats (chicken, turkey), fish (salmon, tuna), eggs, dairy (Greek yogurt, cottage cheese), legumes (beans, lentils), tofu and tempeh, quinoa, and nuts/seeds. For supplements, whey protein is quick-absorbing while casein provides slower release.',
            
        'how to increase stamina': 
            'To increase stamina: 1) Gradually increase workout duration and intensity, 2) Incorporate HIIT and circuit training, 3) Add cardio workouts 3-5 times weekly, 4) Practice proper breathing techniques, 5) Stay hydrated and eat a balanced diet, and 6) Ensure adequate recovery between sessions.',
            
        'best exercise for beginners': 
            'Great beginner exercises include walking, swimming, bodyweight movements (squats, push-ups, lunges), resistance band workouts, and stationary cycling. Start with 2-3 days per week, focus on proper form, and gradually increase intensity as you build confidence.',
            
        'protein shake recipe': 
            'Basic protein shake recipe: 1 scoop protein powder, 1 cup liquid (milk, almond milk, or water), ½ banana, handful of berries, 1 tbsp nut butter, and ice. Blend until smooth. Adjust ingredients based on your taste and nutritional goals.',
            
        'what is bmr': 
            'BMR (Basal Metabolic Rate) is the number of calories your body needs at rest to maintain basic functions like breathing and circulation. It\'s influenced by age, gender, weight, and height. Knowing your BMR helps determine your daily calorie needs for weight maintenance or loss.',
            
        'healthy snack ideas': 
            'Nutritious snack options include: Greek yogurt with berries, apple slices with nut butter, hummus with vegetables, hard-boiled eggs, a handful of nuts, cottage cheese with fruit, protein bars (check sugar content), roasted chickpeas, or a small smoothie.',
            
        'recovery after workout': 
            'Post-workout recovery tips: 1) Consume protein within 30 minutes, 2) Stay hydrated, 3) Get 7-9 hours of sleep, 4) Consider foam rolling and stretching, 5) Take rest days, 6) Use contrast therapy (alternating hot and cold), and 7) Listen to your body and avoid overtraining.',
            
        'benefits of cardio': 
            'Cardio benefits include improved heart health, increased lung capacity, lower blood pressure, better sleep, reduced stress, weight management, improved endurance, stronger immune system, and enhanced cognitive function. Aim for at least 150 minutes of moderate cardio weekly.',
            
        'strength training benefits': 
            'Strength training increases muscle mass, boosts metabolism, improves bone density, enhances posture and balance, reduces injury risk, helps manage chronic conditions, improves body composition, and can improve mental health. Include strength training 2-3 times per week for optimal results.'
    };
    
    // Check for exact matches first
    if (responses[message]) {
        return responses[message];
    }
    
    // Check for partial matches
    for (const key in responses) {
        if (message.includes(key) || key.includes(message)) {
            return responses[key];
        }
    }
    
    // Keywords matching
    if (message.includes('workout') || message.includes('exercise') || message.includes('training')) {
        return "Regular exercise is essential for physical and mental health. Aim for a mix of cardio, strength training, and flexibility work. What specific type of workout are you interested in? Try asking about workouts for weight loss, muscle building, or improving flexibility.";
    } else if (message.includes('diet') || message.includes('food') || message.includes('eat') || message.includes('nutrition')) {
        return "A balanced diet is key to fitness success. Focus on whole foods, lean proteins, complex carbs, healthy fats, and plenty of fruits and vegetables. For specific nutrition advice, try asking about calorie needs, meal timing, or healthy meal ideas.";
    } else if (message.includes('weight') || message.includes('fat') || message.includes('slim') || message.includes('lose')) {
        return "Healthy weight management combines proper nutrition, regular exercise, adequate sleep, and stress management. Remember that sustainable results take time. Would you like specific advice on diet or exercises for weight management?";
    } else if (message.includes('muscle') || message.includes('strength') || message.includes('gain') || message.includes('build')) {
        return "Building muscle requires consistent strength training with progressive overload, adequate protein intake (0.7-1g per pound of bodyweight), sufficient calories, and proper recovery. Would you like a specific muscle-building workout plan or nutrition advice?";
    } else if (message.includes('injury') || message.includes('pain') || message.includes('hurt') || message.includes('sore')) {
        return "If you're experiencing pain, it's important to rest the affected area and consider consulting a healthcare professional. For muscle soreness, try gentle stretching, hydration, proper nutrition, and adequate rest between workouts.";
    } else if (message.includes('supplement') || message.includes('protein') || message.includes('creatine') || message.includes('vitamin')) {
        return "Supplements can complement your nutrition plan but aren't a substitute for a balanced diet. Common fitness supplements include protein powder, creatine, BCAAs, and multivitamins. Always research thoroughly and consider consulting a healthcare provider before starting supplements.";
    }
    
    // Default response
    return "I'm not sure I understand your question. Try asking about workouts, nutrition, or specific fitness goals. You can also try one of the suggested questions above.";
} 