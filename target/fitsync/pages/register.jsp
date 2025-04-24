<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FitSync - Register</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="login-container">
        <div class="login-form-container">
            <div class="auth-container">
                <div class="logo-container">
                    <h1 class="logo">FitSync</h1>
                    <p class="tagline">Your fitness journey starts here</p>
                </div>
                
                <div class="auth-form">
                    <h2>Register</h2>
                    <form id="register-form" action="../register" method="post">
                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Create a password" required>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required>
                        </div>
                        <% if(request.getAttribute("errorMessage") != null) { %>
                            <div class="error-message">
                                <%= request.getAttribute("errorMessage") %>
                            </div>
                        <% } %>
                        <button type="submit" class="btn-primary login-btn">Register</button>
                    </form>
                    <p class="auth-redirect">Already have an account? <a href="../index.jsp">Login</a></p>
                </div>
            </div>
        </div>
        
        <div class="login-image">
            <div class="overlay"></div>
            <div class="login-text">
                <h1>JOIN THE <span>MOVEMENT</span></h1>
                <p>Create your account today and start your fitness journey with personalized workouts, nutrition plans, and progress tracking.</p>
                <a href="../index.jsp" class="btn-secondary scroll-btn">BACK TO LOGIN</a>
            </div>
        </div>
    </div>
</body>
</html> 