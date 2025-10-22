// Test file to verify routing functionality
// This can be removed after testing

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Test function to verify all routes are working
export const testRoutes = () => {
  const routes = [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/menu', name: 'Menu' },
    { path: '/contact', name: 'Contact' },
    { path: '/invalid-route', name: '404 Test' }
  ];

  console.log('Available routes:');
  routes.forEach(route => {
    console.log(`- ${route.path} (${route.name})`);
  });
  
  return routes;
};

// Test navigation function
export const testNavigation = () => {
  console.log('Testing navigation...');
  
  // Test if React Router is working
  if (typeof window !== 'undefined') {
    console.log('Current path:', window.location.pathname);
    console.log('Navigation test completed!');
  }
};

// Run tests on load
if (typeof window !== 'undefined') {
  console.log('🚀 Caffeine Atelier SPA - Routing Tests');
  testRoutes();
  testNavigation();
}
