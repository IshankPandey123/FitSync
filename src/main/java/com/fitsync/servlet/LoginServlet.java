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

public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserDAO userDAO;
    
    @Override
    public void init() {
        userDAO = new UserDAO();
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String errorMessage = null;
        
        // Validate input
        if (email == null || email.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            errorMessage = "Please enter both email and password";
            request.setAttribute("errorMessage", errorMessage);
            request.getRequestDispatcher("/index.jsp").forward(request, response);
            return;
        }
        
        try {
            // Validate user credentials
            User user = userDAO.validateUser(email, password);
            
            if (user != null) {
                // Create session
                HttpSession session = request.getSession();
                session.setAttribute("user", user);
                
                // Check if it's first login
                if (session.getAttribute("firstLoginDone") == null) {
                    session.setAttribute("firstLoginDone", true);
                    response.sendRedirect("pages/welcome.html");
                } else {
                    response.sendRedirect("pages/dashboard.html");
                }
            } else {
                errorMessage = "Invalid email or password";
                request.setAttribute("errorMessage", errorMessage);
                request.getRequestDispatcher("/index.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            errorMessage = "Database error: " + e.getMessage();
            request.setAttribute("errorMessage", errorMessage);
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        }
    }
} 