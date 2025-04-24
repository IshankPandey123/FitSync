<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FitSync - Login</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="login-container">
        <div class="login-image">
            <div class="overlay"></div>
            <div class="login-text">
                <h1>GROW YOUR <span>STRENGTH</span></h1>
                <p>The fastest way to track your fitness journey and achieve your goals. Join thousands of users in their fitness quest.</p>
                <a href="#login-form-section" class="btn-primary scroll-btn">GET STARTED</a>
            </div>
        </div>
        
        <div id="login-form-section" class="login-form-container">
            <div class="auth-container">
                <div class="logo-container">
                    <h1 class="logo">FitSync</h1>
                    <p class="tagline">Your fitness journey starts here</p>
                </div>
                
                <div class="auth-form">
                    <h2>Login</h2>
                    <form id="login-form" action="login" method="post">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password" required>
                        </div>
                        <% if(request.getAttribute("errorMessage") != null) { %>
                            <div class="error-message">
                                <%= request.getAttribute("errorMessage") %>
                            </div>
                        <% } %>
                        <button type="submit" class="btn-primary login-btn">Login</button>
                    </form>
                    <p class="auth-redirect">Don't have an account? <a href="pages/register.jsp">Register</a></p>
                </div>
            </div>
        </div>
    </div>
</body>
</html> 