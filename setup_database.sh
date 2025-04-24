#!/bin/bash

# MySQL credentials
MYSQL_USER="root"
MYSQL_PASSWORD="ishank@123"
SQL_FILE="src/main/resources/db/init.sql"

# Print header
echo "====================================="
echo "FitSync App Database Setup"
echo "====================================="

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "Error: MySQL is not installed or not in the PATH"
    exit 1
fi

# Print status
echo "Setting up FitSync App database (fitsync_app)..."

# Run SQL script
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD < $SQL_FILE

# Check if the operation was successful
if [ $? -eq 0 ]; then
    echo "Database setup completed successfully!"
    echo "The fitsync_app database is ready to use."
    echo "You can now run the application."
else
    echo "Error: Failed to set up the database. Please check your MySQL credentials and try again."
    exit 1
fi

echo "=====================================" 