# FitSync - Fitness Tracking Application

FitSync is a web application for tracking fitness goals, workouts, diet plans, and more.

## Setup Instructions

### Prerequisites
- Java JDK 8 or higher
- Apache Tomcat 9 or higher
- MySQL 5.7 or higher
- Maven (optional, if you're using Maven for build)

### Database Setup
1. Make sure MySQL is installed and running on your system
2. Run the database setup script:
   ```
   ./setup_database.sh
   ```
   This will create the `fitsync_app` database and initialize the required tables.

### Application Deployment
1. Build the project using your IDE or Maven
2. Deploy the WAR file to your Tomcat server
3. Access the application at `http://localhost:8080/fitsync`

## Features
- User registration and login
- Personalized dashboard
- Workout tracking
- Diet planning
- BMI calculator
- Fitness chatbot assistant

## Database Structure
The application uses a MySQL database with the following structure:

### Users Table
- `user_id`: Auto-incrementing user ID (Primary Key)
- `username`: User's username (Unique)
- `email`: User's email (Unique)
- `password`: User's password
- `full_name`: User's full name
- `date_of_birth`: User's date of birth (Optional)
- `gender`: User's gender (Male/Female/Other) (Optional)
- `height`: User's height (Optional)
- `profile_image`: Path to user's profile image (Optional)
- `fitness_level`: User's fitness level (Beginner/Intermediate/Advanced) (Optional)
- `created_at`: Timestamp of account creation
- `updated_at`: Timestamp of last account update

## Technology Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Java Servlets, JSP
- Database: MySQL
- Server: Apache Tomcat 