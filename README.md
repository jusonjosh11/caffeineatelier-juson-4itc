# Caffeine Atelier - Single Page Application (SPA)

A modern, responsive Single Page Application for Caffeine Atelier Coffee Shop built with React and React Router DOM.

## 🚀 Features

- **Single Page Application (SPA)** with React Router DOM
- **5 Main Sections**: Home, About, Menu, Contact, and 404 Not Found
- **Dynamic Navigation** without page reloads
- **Responsive Design** with mobile-first approach
- **Modern UI/UX** with smooth animations and transitions
- **Professional Styling** with coffee-themed design
- **Interactive Components** including modals and forms

## 📋 Requirements Met

✅ **Single Page Application (SPA)** using React Router DOM  
✅ **5 Sections**: Home, About, Menu, Contact, 404  
✅ **Header Component** with navigation  
✅ **Dynamic Routing** between pages  
✅ **404 Page** for invalid routes  
✅ **Bootstrap/CSS Styling** applied  
✅ **No Page Reloads** during navigation  
✅ **Programmatic Navigation** support  

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - The application will automatically reload when you make changes

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header component
│   ├── Home.js            # Home page with hero section
│   ├── About.js           # About page with company info
│   ├── Menu.js            # Menu page with coffee categories
│   ├── Contact.js         # Contact page with form
│   └── NotFound.js        # 404 Not Found page
├── App.js                 # Main app component with routing
├── index.js               # React app entry point
└── styles.css             # Global styles and component styles
```

## 🎯 Navigation Structure

- **Home** (`/`) - Hero section, coffee categories, features
- **About** (`/about`) - Company story, stats, team info
- **Menu** (`/menu`) - Coffee menu with categories and items
- **Contact** (`/contact`) - Contact information and form
- **404** (`/*`) - Not Found page for invalid routes

## 🎨 Key Features

### Navigation
- **Fixed Header** with smooth scrolling
- **Active Link Highlighting** shows current page
- **Mobile Responsive** with hamburger menu
- **Smooth Transitions** between pages

### Pages
- **Home**: Hero section with animated coffee cup, features, and stats
- **About**: Company story with interactive elements and gallery
- **Menu**: Tabbed menu system with coffee categories
- **Contact**: Contact form with validation and info cards
- **404**: Custom error page with navigation suggestions

### Styling
- **Coffee Theme** with warm browns and golds
- **Modern Animations** and hover effects
- **Responsive Grid** layouts
- **Professional Typography** with Google Fonts
- **Interactive Elements** with smooth transitions

## 🔧 Technical Implementation

### React Router DOM
- **BrowserRouter** for client-side routing
- **Routes & Route** components for page routing
- **Link** components for navigation
- **useLocation** hook for active link detection

### Component Architecture
- **Functional Components** with React Hooks
- **State Management** with useState
- **Effect Management** with useEffect
- **Event Handling** for user interactions

### CSS Features
- **CSS Grid** and **Flexbox** layouts
- **CSS Animations** and **Transitions**
- **Media Queries** for responsive design
- **CSS Variables** for consistent theming

## 📱 Responsive Design

- **Mobile First** approach
- **Breakpoints**: 480px, 768px, 1024px, 1200px
- **Flexible Grid** systems
- **Touch-Friendly** navigation
- **Optimized Images** and content

## 🎭 Animations & Effects

- **Fade In** animations for page content
- **Hover Effects** on interactive elements
- **Smooth Transitions** between states
- **Loading Animations** for better UX
- **Parallax Effects** on hero section

## 🚀 Getting Started

1. Clone or download the project
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open `http://localhost:3000` in your browser
5. Navigate between pages using the header menu

## 📝 Development Notes

- All existing modal functionality is preserved
- CSS is optimized for React components
- Navigation state is managed by React Router
- Components are reusable and modular
- Code follows React best practices

## 🎯 Learning Objectives Achieved

1. ✅ **Build a Single Page Application (SPA)** using React Router DOM
2. ✅ **Navigate between pages** without reloading the browser
3. ✅ **Implement dynamic routing** with React Router
4. ✅ **Handle programmatic navigation** with Link components
5. ✅ **Create 404 pages** for invalid routes
6. ✅ **Apply professional styling** with CSS and responsive design

## 📞 Support

For any questions or issues with the SPA implementation, please refer to the React Router DOM documentation or contact the development team.

---

**Caffeine Atelier SPA** - Crafted with ☕ and React
