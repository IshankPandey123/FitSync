-- Create database if not exists
CREATE DATABASE IF NOT EXISTS fitsync_app;

-- Use the fitsync_app database
USE fitsync_app;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL
);

-- Insert a test user (optional)
-- INSERT INTO users (username, email, password, full_name) VALUES ('testuser', 'test@example.com', 'password123', 'Test User'); 