@echo off
echo Setting up Caffeine Atelier Coffee Shop with Order System...
echo.

echo Installing React dependencies...
call npm install

echo.
echo Setting up database...
echo Please make sure XAMPP is running and MySQL is started.
echo.

echo Creating database tables...
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS coffeeshopdb;"
mysql -u root -p coffeeshopdb -e "
CREATE TABLE IF NOT EXISTS coffee_menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    coffee_selection VARCHAR(255) NOT NULL,
    coffee_size VARCHAR(50) NOT NULL,
    addons JSON,
    quantity INT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    addons_price DECIMAL(10,2) DEFAULT 0,
    size_multiplier DECIMAL(3,2) DEFAULT 1.00,
    total_price DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending'
);
"

echo.
echo Populating coffee menu...
mysql -u root -p coffeeshopdb < api/populate_menu.sql

echo.
echo Setup complete! 
echo.
echo To start the development server, run:
echo   npm start
echo.
echo To build for production, run:
echo   npm run build
echo.
echo Make sure XAMPP is running and the API files are accessible at:
echo   http://localhost/api/
echo.
pause
