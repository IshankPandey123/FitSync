<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.fitsync.model.User" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to FitSync</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #2e7d32;
            --secondary-color: #43a047;
            --dark-color: #1b5e20;
            --light-color: #c8e6c9;
            --accent-color: #ff5722;
            --text-color: #e0e0e0;
            --dark-bg: #121212;
            --card-bg: #1e1e1e;
            --header-bg: #212121;
            --light-text: #ffffff;
            --border-radius: 8px;
            --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            --transition: all 0.3s ease;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--dark-bg);
            color: var(--text-color);
        }
        
        .welcome-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        .app-header {
            background-color: var(--header-bg);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            padding: 0.8rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .logo {
            color: var(--primary-color);
            font-size: 1.8rem;
            margin: 0;
            font-weight: 700;
        }
        
        .main-nav ul {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: 1.5rem;
        }
        
        .main-nav a {
            text-decoration: none;
            color: var(--text-color);
            font-weight: 500;
            padding: 0.5rem 0.8rem;
            border-radius: var(--border-radius);
            transition: var(--transition);
        }
        
        .main-nav a:hover, .main-nav a.active {
            color: var(--light-text);
            background-color: var(--primary-color);
        }
        
        .user-profile {
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .user-profile span {
            font-weight: 500;
            color: var(--light-text);
        }
        
        .user-profile:after {
            content: '\f107';
            font-family: 'Font Awesome 5 Free';
            font-weight: 900;
            color: var(--primary-color);
        }
        
        .profile-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background-color: var(--card-bg);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 0.8rem 0;
            width: 150px;
            display: none;
            margin-top: 0.5rem;
        }
        
        .user-profile:hover .profile-dropdown {
            display: block;
        }
        
        .profile-dropdown a {
            display: block;
            padding: 0.5rem 1rem;
            text-decoration: none;
            color: var(--text-color);
            transition: var(--transition);
        }
        
        .profile-dropdown a:hover {
            background-color: var(--dark-color);
            color: var(--light-text);
        }
        
        .welcome-content {
            flex: 1;
            padding: 2rem;
        }
        
        .welcome-hero {
            max-width: 1200px;
            margin: 0 auto;
            text-align: center;
            padding: 1.5rem 1rem;
        }
        
        .welcome-hero h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
        
        .welcome-hero p {
            font-size: 1.1rem;
            margin-bottom: 3rem;
            color: var(--text-color);
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .welcome-steps {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            margin-bottom: 3rem;
        }
        
        .step-card {
            background-color: var(--card-bg);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 2rem;
            flex: 1;
            min-width: 280px;
            max-width: 350px;
            transition: var(--transition);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        
        .step-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
            background-color: #292929;
        }
        
        .step-icon {
            background-color: var(--dark-color);
            color: var(--light-text);
            width: 70px;
            height: 70px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 1.8rem;
        }
        
        .step-card h3 {
            font-size: 1.3rem;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
        
        .step-card p {
            margin-bottom: 1.5rem;
            color: var(--text-color);
            flex: 1;
        }
        
        .btn-primary {
            background-color: var(--primary-color);
            color: var(--light-text);
            padding: 0.8rem 1.5rem;
            border-radius: var(--border-radius);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition);
            display: inline-block;
            border: none;
            cursor: pointer;
        }
        
        .btn-primary:hover {
            background-color: var(--secondary-color);
            transform: translateY(-2px);
        }
        
        .btn-large {
            background-color: var(--accent-color);
            color: var(--light-text);
            padding: 1rem 2rem;
            font-size: 1.1rem;
            border-radius: var(--border-radius);
            text-decoration: none;
            font-weight: 600;
            transition: var(--transition);
            display: inline-block;
            box-shadow: var(--box-shadow);
        }
        
        .btn-large:hover {
            background-color: #e64a19;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
        }
        
        .welcome-action {
            margin-top: 1rem;
        }
        
        .app-footer {
            background-color: #111111;
            color: var(--text-color);
            padding: 1.5rem 2rem;
            text-align: center;
        }
        
        .footer-links {
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            gap: 1.5rem;
        }
        
        .footer-links a {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            transition: var(--transition);
        }
        
        .footer-links a:hover {
            color: var(--primary-color);
        }
        
        @media (max-width: 768px) {
            .app-header {
                flex-direction: column;
                padding: 1rem;
            }
            
            .main-nav {
                margin: 1rem 0;
            }
            
            .main-nav ul {
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .welcome-steps {
                flex-direction: column;
                align-items: center;
            }
            
            .welcome-hero h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <% 
    // Check if user is logged in
    User user = (User) session.getAttribute("user");
    if (user == null) {
        response.sendRedirect("../index.jsp");
        return;
    }
    String userName = user.getFullName();
    %>
    
    <div class="welcome-container">
        <header class="app-header">
            <div class="logo-container">
                <h1 class="logo">FitSync</h1>
            </div>
            <nav class="main-nav">
                <ul>
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="workout.html">Workouts</a></li>
                    <li><a href="diet.html">Nutrition</a></li>
                    <li><a href="bmi.html">BMI Calculator</a></li>
                    <li><a href="chatbot.html">Fitness Chat</a></li>
                </ul>
            </nav>
            <div class="user-controls">
                <div class="user-profile">
                    <span><%= userName %></span>
                    <div class="profile-dropdown">
                        <a href="#">Profile</a>
                        <a href="#">Settings</a>
                        <a href="../logout">Logout</a>
                    </div>
                </div>
            </div>
        </header>

        <main class="welcome-content">
            <div class="welcome-hero">
                <h1>Welcome to FitSync, <%= userName %>!</h1>
                <p>Your fitness journey starts here. Let's set you up for success with personalized workouts, nutrition plans, and progress tracking.</p>
                
                <div class="welcome-steps">
                    <div class="step-card">
                        <div class="step-icon">
                            <i class="fas fa-bullseye"></i>
                        </div>
                        <h3>Set Your Goals</h3>
                        <p>Define what you want to achieve with your fitness journey. Whether it's weight loss, muscle gain, or improved endurance, we'll help you get there.</p>
                        <a href="#" class="btn-primary">Set Goals</a>
                    </div>
                    
                    <div class="step-card">
                        <div class="step-icon">
                            <i class="fas fa-dumbbell"></i>
                        </div>
                        <h3>Choose Workouts</h3>
                        <p>Explore our library of workouts designed for all fitness levels. Find what works for you and your goals, with step-by-step instructions.</p>
                        <a href="workout.html" class="btn-primary">Find Workouts</a>
                    </div>
                    
                    <div class="step-card">
                        <div class="step-icon">
                            <i class="fas fa-apple-alt"></i>
                        </div>
                        <h3>Plan Your Nutrition</h3>
                        <p>Discover meal plans and nutrition advice tailored to support your fitness journey. Eat right to maximize your results.</p>
                        <a href="diet.html" class="btn-primary">Explore Nutrition</a>
                    </div>
                </div>
                
                <div class="welcome-action">
                    <a href="dashboard.jsp" class="btn-large">Go to Dashboard</a>
                </div>
            </div>
        </main>
        
        <footer class="app-footer">
            <p>&copy; 2025 FitSync. All rights reserved.</p>
            <div class="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact</a>
            </div>
        </footer>
    </div>
</body>
</html> 