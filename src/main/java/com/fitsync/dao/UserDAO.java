package com.fitsync.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.fitsync.model.User;
import com.fitsync.util.DatabaseUtil;

public class UserDAO {
    
    // SQL queries
    private static final String INSERT_USER = "INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)";
    private static final String SELECT_USER_BY_EMAIL = "SELECT * FROM users WHERE email = ?";
    private static final String SELECT_USER_BY_EMAIL_AND_PASSWORD = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    // Register a new user
    public User registerUser(User user) throws SQLException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet generatedKeys = null;
        
        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(INSERT_USER, Statement.RETURN_GENERATED_KEYS);
            pstmt.setString(1, user.getUsername());
            pstmt.setString(2, user.getEmail());
            pstmt.setString(3, user.getPassword());
            pstmt.setString(4, user.getFullName());
            
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected > 0) {
                generatedKeys = pstmt.getGeneratedKeys();
                if (generatedKeys.next()) {
                    user.setUserId(generatedKeys.getInt(1));
                    return user;
                }
            }
            return null;
        } finally {
            if (generatedKeys != null) generatedKeys.close();
            if (pstmt != null) pstmt.close();
            DatabaseUtil.closeConnection(conn);
        }
    }
    
    // Check if a user with the given email exists
    public boolean userExists(String email) throws SQLException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        
        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(SELECT_USER_BY_EMAIL);
            pstmt.setString(1, email);
            rs = pstmt.executeQuery();
            
            return rs.next();
        } finally {
            if (rs != null) rs.close();
            if (pstmt != null) pstmt.close();
            DatabaseUtil.closeConnection(conn);
        }
    }
    
    // Validate user credentials for login
    public User validateUser(String email, String password) throws SQLException {
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        
        try {
            conn = DatabaseUtil.getConnection();
            pstmt = conn.prepareStatement(SELECT_USER_BY_EMAIL_AND_PASSWORD);
            pstmt.setString(1, email);
            pstmt.setString(2, password);
            rs = pstmt.executeQuery();
            
            if (rs.next()) {
                User user = new User();
                user.setUserId(rs.getInt("user_id"));
                user.setUsername(rs.getString("username"));
                user.setEmail(rs.getString("email"));
                user.setFullName(rs.getString("full_name"));
                // Don't set password for security
                
                return user;
            }
            return null;
        } finally {
            if (rs != null) rs.close();
            if (pstmt != null) pstmt.close();
            DatabaseUtil.closeConnection(conn);
        }
    }
} 