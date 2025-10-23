import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderModal from './OrderModal';
import OrderDetailsPanel from './OrderDetailsPanel';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(v => !v);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showOrdersPanel, setShowOrdersPanel] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <i className="fas fa-coffee"></i>
          <span>Caffeine Atelier</span>
        </Link>
        
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/menu" 
              className={`nav-link ${isActive('/menu') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
        </ul>
        
        <div className="nav-actions">
          <button 
            className="btn btn-primary nav-order" 
            onClick={() => setShowOrderModal(true)}
          >
            Order Now
          </button>

          <button
            className="btn btn-cart"
            onClick={() => setShowOrdersPanel(true)}
            title="View order details"
            aria-label="Open order details"
          >
            <i className="fas fa-shopping-bag"></i>
            Order Details
          </button>

          <button
            className={`btn btn-theme theme-toggle`}
            onClick={toggleTheme}
            aria-pressed={isDark}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        
        <div className="nav-toggle" id="nav-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <OrderModal 
        isOpen={showOrderModal} 
        onClose={() => setShowOrderModal(false)} 
      />
      <OrderDetailsPanel isOpen={showOrdersPanel} onClose={() => setShowOrdersPanel(false)} />
    </nav>
  );
};

export default Header;
