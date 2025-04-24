<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.fitsync.model.User" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FitSync - Dashboard</title>
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
        
        .dashboard-container {
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
        
        .dashboard-content {
            flex: 1;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
        }
        
        .dashboard-summary h2 {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            color: var(--primary-color);
            border-left: 4px solid var(--primary-color);
            padding-left: 1rem;
        }
        
        .dashboard-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .dashboard-card {
            background-color: var(--card-bg);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 1.5rem;
            display: flex;
            align-items: center;
            transition: var(--transition);
        }
        
        .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
            background-color: #292929;
        }
        
        .card-icon {
            background-color: var(--dark-color);
            color: var(--light-text);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1.5rem;
            font-size: 1.5rem;
        }
        
        .card-content h3 {
            font-size: 1.2rem;
            margin: 0 0 0.5rem 0;
            color: var(--primary-color);
        }
        
        .card-content p {
            margin: 0;
            color: var(--text-color);
            font-size: 1.1rem;
            font-weight: 500;
        }
        
        .app-footer {
            background-color: #111111;
            color: var(--text-color);
            padding: 1.5rem 2rem;
            text-align: center;
            margin-top: auto;
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
        
        /* Progress Section */
        .activity-progress {
            margin-top: 2rem;
        }
        
        .activity-progress h2 {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            color: var(--primary-color);
            border-left: 4px solid var(--primary-color);
            padding-left: 1rem;
        }
        
        .progress-container {
            background-color: var(--card-bg);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 2rem;
            margin-bottom: 2rem;
        }
        
        .progress-item {
            margin-bottom: 1.5rem;
        }
        
        .progress-item:last-child {
            margin-bottom: 0;
        }
        
        .progress-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }
        
        .progress-label {
            font-weight: 500;
        }
        
        .progress-value {
            color: var(--primary-color);
            font-weight: 600;
        }
        
        .progress-bar-bg {
            height: 10px;
            background-color: #333;
            border-radius: 5px;
            overflow: hidden;
        }
        
        .progress-bar-fill {
            height: 100%;
            background-color: var(--primary-color);
            border-radius: 5px;
            transition: width 0.5s ease;
        }
        
        .upcoming-workouts {
            margin-top: 2rem;
        }
        
        .upcoming-workouts h2 {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            color: var(--primary-color);
            border-left: 4px solid var(--primary-color);
            padding-left: 1rem;
        }
        
        .workout-list {
            background-color: var(--card-bg);
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            overflow: hidden;
        }
        
        .workout-item {
            padding: 1.2rem 1.5rem;
            border-bottom: 1px solid #333;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .workout-item:last-child {
            border-bottom: none;
        }
        
        .workout-info {
            display: flex;
            align-items: center;
        }
        
        .workout-icon {
            margin-right: 1rem;
            color: var(--primary-color);
            font-size: 1.5rem;
        }
        
        .workout-details h3 {
            margin: 0 0 0.3rem 0;
            font-size: 1.1rem;
            color: var(--light-text);
        }
        
        .workout-details p {
            margin: 0;
            color: var(--text-color);
            font-size: 0.9rem;
        }
        
        .workout-action {
            background-color: var(--primary-color);
            color: var(--light-text);
            padding: 0.5rem 1rem;
            border-radius: var(--border-radius);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition);
        }
        
        .workout-action:hover {
            background-color: var(--secondary-color);
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
            
            .dashboard-content {
                padding: 1rem;
            }
            
            .dashboard-card {
                flex-direction: column;
                text-align: center;
            }
            
            .card-icon {
                margin-right: 0;
                margin-bottom: 1rem;
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
    
    <div class="dashboard-container">
        <header class="app-header">
            <div class="logo-container">
                <h1 class="logo">FitSync</h1>
            </div>
            <nav class="main-nav">
                <ul>
                    <li><a href="dashboard.jsp" class="active">Dashboard</a></li>
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

        <main class="dashboard-content">
            <section class="dashboard-summary">
                <h2>Dashboard Overview</h2>
                <div class="dashboard-cards">
                    <div class="dashboard-card">
                        <div class="card-icon">
                            <i class="fas fa-heartbeat"></i>
                        </div>
                        <div class="card-content">
                            <h3>Today's Goal</h3>
                            <p>Complete 30 min cardio workout</p>
                        </div>
                    </div>
                    <div class="dashboard-card">
                        <div class="card-icon">
                            <i class="fas fa-fire-alt"></i>
                        </div>
                        <div class="card-content">
                            <h3>Weekly Calories</h3>
                            <p>7,250 / 10,500</p>
                        </div>
                    </div>
                    <div class="dashboard-card">
                        <div class="card-icon">
                            <i class="fas fa-running"></i>
                        </div>
                        <div class="card-content">
                            <h3>Active Days</h3>
                            <p>4 / 7 days</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="activity-progress">
                <h2>Your Progress</h2>
                <div class="progress-container">
                    <div class="progress-item">
                        <div class="progress-info">
                            <span class="progress-label">Weekly Workout Goal</span>
                            <span class="progress-value">4 / 5 completed</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" style="width: 80%;"></div>
                        </div>
                    </div>
                    
                    <div class="progress-item">
                        <div class="progress-info">
                            <span class="progress-label">Nutrition Plan</span>
                            <span class="progress-value">70% adherence</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" style="width: 70%;"></div>
                        </div>
                    </div>
                    
                    <div class="progress-item">
                        <div class="progress-info">
                            <span class="progress-label">Water Intake</span>
                            <span class="progress-value">2.1 / 3 liters</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div class="progress-bar-fill" style="width: 65%;"></div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="upcoming-workouts">
                <h2>Upcoming Workouts</h2>
                <div class="workout-list">
                    <div class="workout-item">
                        <div class="workout-info">
                            <div class="workout-icon">
                                <i class="fas fa-dumbbell"></i>
                            </div>
                            <div class="workout-details">
                                <h3>Upper Body Strength</h3>
                                <p>Today at 5:30 PM • 45 min</p>
                            </div>
                        </div>
                        <a href="#" class="workout-action">Start</a>
                    </div>
                    
                    <div class="workout-item">
                        <div class="workout-info">
                            <div class="workout-icon">
                                <i class="fas fa-running"></i>
                            </div>
                            <div class="workout-details">
                                <h3>HIIT Cardio</h3>
                                <p>Tomorrow at 7:00 AM • 30 min</p>
                            </div>
                        </div>
                        <a href="#" class="workout-action">View</a>
                    </div>
                    
                    <div class="workout-item">
                        <div class="workout-info">
                            <div class="workout-icon">
                                <i class="fas fa-walking"></i>
                            </div>
                            <div class="workout-details">
                                <h3>Leg Day</h3>
                                <p>Wed, Apr 13 at 6:00 PM • 50 min</p>
                            </div>
                        </div>
                        <a href="#" class="workout-action">View</a>
                    </div>
                </div>
            </section>
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