package com.fitsync.servlet;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fitsync.dao.UserDAO;
import com.fitsync.model.User;

public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserDAO userDAO;
    
    @Override
    public void init() {
        userDAO = new UserDAO();
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String fullName = request.getParameter("fullName");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String confirmPassword = request.getParameter("confirmPassword");
        String errorMessage = null;
        
        // Validate input
        if (fullName == null || fullName.trim().isEmpty() || 
            email == null || email.trim().isEmpty() || 
            password == null || password.trim().isEmpty() || 
            confirmPassword == null || confirmPassword.trim().isEmpty()) {
            
            errorMessage = "Please fill in all fields";
            request.setAttribute("errorMessage", errorMessage);
            request.getRequestDispatcher("/pages/register.jsp").forward(request, response);
            return;
        }
        
        if (!password.equals(confirmPassword)) {
            errorMessage = "Passwords do not match";
            request.setAttribute("errorMessage", errorMessage);
            request.getRequestDispatcher("/pages/register.jsp").forward(request, response);
            return;
        }
        
        // Simple email validation
        if (!email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            errorMessage = "Please enter a valid email address";
            request.setAttribute("errorMessage", errorMessage);
            request.getRequestDispatcher("/pages/register.jsp").forward(request, response);
            return;
        }
        
        try {
            // Check if user already exists
            if (userDAO.userExists(email)) {
                errorMessage = "User with this email already exists";
                request.setAttribute("errorMessage", errorMessage);
                request.getRequestDispatcher("/pages/register.jsp").forward(request, response);
                return;
            }
            
            // Create username from email (before the @ symbol)
            String username = email.substring(0, email.indexOf('@'));
            
            // Create and register new user
            User user = new User(username, email, password, fullName);
            user = userDAO.registerUser(user);
            
            if (user != null) {
                // Create session
                HttpSession session = request.getSession();
                session.setAttribute("user", user);
                
                // Always show welcome page for new registrations
                response.sendRedirect("pages/welcome.html");
            } else {
                errorMessage = "Registration failed";
                request.setAttribute("errorMessage", errorMessage);
                request.getRequestDispatcher("/pages/register.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            errorMessage = "Database error: " + e.getMessage();
            request.setAttribute("errorMessage", errorMessage);
            request.getRequestDispatcher("/pages/register.jsp").forward(request, response);
        }
    }
} 