# ☕ Caffeine Atelier - Professional Coffee Shop Order System

A modern, responsive Single Page Application for Caffeine Atelier Coffee Shop with **dynamic pricing**, **smooth animations**, and **database integration** built with React, React Router DOM, and PHP/MySQL.

## 🚀 **NEW FEATURES IMPLEMENTED**

### ✨ **Professional Order System**
- **Dynamic Pricing Calculator** with real-time updates
- **Smooth Animations** for selections and price changes
- **Professional Order Modal** with form validation
- **Success Animation** with coffee-themed design
- **Database Integration** with MySQL backend

### 🎨 **Enhanced User Experience**
- **Hover Effects** on menu items with order buttons
- **Price Animations** when selections change
- **Loading States** with professional spinners
- **Form Validation** with visual feedback
- **Responsive Design** for all devices

### 🗄️ **Database Features**
- **Coffee Menu API** with dynamic data loading
- **Order Submission** with pricing calculations
- **Add-ons Pricing** (Extra Shot, Whipped Cream, Almond Milk, Oat Milk)
- **Size Multipliers** (Small: 1x, Medium: 1.2x, Large: 1.4x)
- **Order History** storage in database

## 📋 **Requirements Met**

✅ **Single Page Application (SPA)** using React Router DOM  
✅ **5 Sections**: Home, About, Menu, Contact, 404  
✅ **Dynamic Pricing System** with animations  
✅ **Professional Order Modal** with form validation  
✅ **Database Integration** with PHP/MySQL API  
✅ **Smooth Animations** for all interactions  
✅ **Success Confirmation** with themed animations  
✅ **Responsive Design** with mobile-first approach  
✅ **Professional Styling** with coffee-themed design  

## 🛠️ **Installation & Setup**

### **Prerequisites**
- **Node.js** (version 14 or higher)
- **XAMPP** (for PHP and MySQL)
- **npm** package manager

### **Quick Setup (Recommended)**

1. **Run the Enhanced Setup Script**:
   ```bash
   # Double-click setup_with_database.bat
   # OR run manually:
   setup_with_database.bat
   ```

2. **Start XAMPP**:
   - Start **Apache** and **MySQL** services
   - Ensure MySQL is running on port 3306

3. **Start Development Server**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - API: `http://localhost/api/`

### **Manual Setup**

#### **1. Install Dependencies**
```bash
npm install
```

#### **2. Database Setup**
```sql
-- Create database
CREATE DATABASE coffeeshopdb;

-- Use database
USE coffeeshopdb;

-- Create tables
CREATE TABLE coffee_menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
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
```

#### **3. Populate Menu Data**
```bash
mysql -u root -p coffeeshopdb < api/populate_menu.sql
```

#### **4. Start Development Server**
```bash
npm start
```

## 🎯 **Order System Features**

### **Dynamic Pricing**
- **Base Coffee Price** from database
- **Add-ons Pricing**:
  - Extra Shot: +₱25
  - Whipped Cream: +₱15
  - Almond Milk: +₱20
  - Oat Milk: +₱20
- **Size Multipliers**:
  - Small: 1.0x
  - Medium: 1.2x
  - Large: 1.4x
- **Real-time Calculation** with animations

### **Professional Animations**
- **Price Update Animation** with scale and color effects
- **Form Field Focus** animations
- **Option Selection** hover effects
- **Success Confirmation** with bouncing icon
- **Loading States** with spinners
- **Modal Transitions** with smooth slide-in effects

### **Order Flow**
1. **Browse Menu** - Hover over items to see order button
2. **Select Coffee** - Click "Order Now" button
3. **Fill Form** - Customer details and preferences
4. **Choose Options** - Size, add-ons, quantity
5. **View Pricing** - Real-time total calculation
6. **Submit Order** - Database storage with confirmation
7. **Success Animation** - Professional confirmation

## 📁 **Project Structure**

```
src/
├── components/
│   ├── Header.js          # Navigation header
│   ├── Home.js            # Home page with hero
│   ├── About.js           # About page
│   ├── Menu.js            # Enhanced menu with order system
│   ├── Contact.js         # Contact page
│   └── NotFound.js        # 404 page
├── App.js                 # Main app with routing
├── index.js               # React entry point
└── styles.css             # Enhanced styles with animations

api/
├── config.php             # Database configuration
├── coffee_menu.php        # Menu API endpoint
├── submit_order.php       # Order submission API
└── populate_menu.sql      # Menu data

Database Tables:
├── coffee_menu            # Coffee items with pricing
└── orders                 # Customer orders with calculations
```

## 🎨 **Animation Features**

### **Menu Interactions**
- **Hover Effects** on menu items
- **Order Button** slide-up animation
- **Price Overlay** with gradient background
- **Image Zoom** on hover

### **Order Modal**
- **Modal Fade-in** with backdrop blur
- **Form Field Focus** with scale animation
- **Option Selection** with bounce effects
- **Price Updates** with color transitions

### **Success Animation**
- **Full-screen Overlay** with blur effect
- **Bouncing Check Icon** with scale animation
- **Rotating Background** gradient
- **Slide-in Content** with smooth transitions

## 🔧 **API Endpoints**

### **GET /api/coffee_menu.php**
Returns coffee menu data grouped by category.

**Response:**
```json
{
  "success": true,
  "data": {
    "espresso": [...],
    "filter": [...],
    "milk": [...],
    "specialty": [...]
  }
}
```

### **POST /api/submit_order.php**
Submits customer order with pricing calculations.

**Request:**
```json
{
  "customer_name": "John Doe",
  "contact": "john@example.com",
  "coffee_selection": "Latte",
  "coffee_size": "Medium",
  "addons": ["Extra Shot", "Almond Milk"],
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "order_id": 123,
  "total_price": 450.00,
  "message": "Order submitted successfully!"
}
```

## 🎭 **Animation Details**

### **Price Animation**
```css
@keyframes priceUpdate {
  0% { transform: scale(1); color: #2c2c2c; }
  30% { transform: scale(1.2); color: #D2691E; }
  70% { transform: scale(1.1); color: #8B4513; }
  100% { transform: scale(1); color: #2c2c2c; }
}
```

### **Success Animation**
```css
@keyframes successIconBounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
```

## 📱 **Responsive Design**

- **Mobile First** approach
- **Breakpoints**: 480px, 768px, 1024px, 1200px
- **Touch-Friendly** interactions
- **Optimized Animations** for mobile
- **Flexible Grid** layouts

## 🌙 **Dark Mode Support**

- **Complete Dark Theme** for all components
- **Order Modal** dark styling
- **Success Animation** dark mode
- **Form Elements** dark theme
- **Price Display** dark mode colors

## 🚀 **Getting Started**

1. **Clone/Download** the project
2. **Run** `setup_with_database.bat`
3. **Start** XAMPP services
4. **Run** `npm start`
5. **Open** `http://localhost:3000`
6. **Browse** menu and place orders!

## 🎯 **Key Features Demonstrated**

1. ✅ **Professional Order System** with dynamic pricing
2. ✅ **Smooth Animations** for all interactions
3. ✅ **Database Integration** with PHP/MySQL
4. ✅ **Real-time Price Calculation** with visual feedback
5. ✅ **Success Confirmation** with themed animations
6. ✅ **Responsive Design** for all devices
7. ✅ **Professional UI/UX** with coffee theme
8. ✅ **Form Validation** with visual feedback

## 📞 **Support**

For any questions or issues with the order system implementation, please refer to the documentation or contact the development team.

---

**Caffeine Atelier Order System** - Crafted with ☕, React, and Professional Animations
