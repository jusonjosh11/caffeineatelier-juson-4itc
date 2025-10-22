import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderModal from './OrderModal';

const Home = () => {
  const [showOrderModal, setShowOrderModal] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="hero-background">
          <div className="hero-particles" id="hero-particles"></div>
          <div className="hero-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
          <div className="hero-grid-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-icon">☕</span>
              <span className="badge-text">Premium Coffee Experience</span>
            </div>
            <h1 className="hero-title">
              <span className="title-line title-main">Artisanal Coffee</span>
              <span className="title-line title-highlight">Crafted with</span>
              <span className="title-line title-accent">Passion</span>
            </h1>
            <p className="hero-subtitle">
              Discover the perfect blend of tradition and innovation in every cup. Experience coffee that tells a story.
            </p>
            <div className="hero-features">
              <div className="hero-feature">
                <div className="feature-dot"></div>
                <span>Single-Origin Beans</span>
              </div>
              <div className="hero-feature">
                <div className="feature-dot"></div>
                <span>Expert Baristas</span>
              </div>
              <div className="hero-feature">
                <div className="feature-dot"></div>
                <span>Fresh Daily</span>
              </div>
            </div>
            <div className="hero-buttons">
              <a href="#coffee" className="btn btn-primary">
                <span className="btn-text">Explore Coffee</span>
                <span className="btn-icon">→</span>
              </a>
              <button 
                className="btn btn-secondary"
                onClick={() => setShowOrderModal(true)}
              >
                <span className="btn-text">View Menu</span>
                <span className="btn-icon">☕</span>
              </button>
              <Link to="/contact" className="btn btn-outline">
                <span className="btn-text">Share Feedback</span>
                <span className="btn-icon">💬</span>
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <span className="btn-text">Reserve Table</span>
                <span className="btn-icon">📅</span>
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Varieties</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Customers</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-container">
              <div className="coffee-scene">
                <div className="coffee-cup-main">
                  <div className="cup-body">
                    <div className="cup-rim"></div>
                    <div className="cup-content">
                      <div className="coffee-surface"></div>
                      <div className="coffee-foam"></div>
                    </div>
                    <div className="cup-handle"></div>
                  </div>
                  <div className="steam-group">
                    <div className="steam steam-1"></div>
                    <div className="steam steam-2"></div>
                    <div className="steam steam-3"></div>
                    <div className="steam steam-4"></div>
                  </div>
                </div>
                <div className="coffee-beans">
                  <div className="bean bean-1"></div>
                  <div className="bean bean-2"></div>
                  <div className="bean bean-3"></div>
                  <div className="bean bean-4"></div>
                  <div className="bean bean-5"></div>
                </div>
                <div className="floating-elements">
                  <div className="floating-card rating-card">
                    <div className="card-header">
                      <i className="fas fa-star"></i>
                      <span>4.9</span>
                    </div>
                    <div className="card-body">
                      <span className="rating-text">Customer Rating</span>
                    </div>
                  </div>
                  <div className="floating-card quality-card">
                    <div className="card-icon">🏆</div>
                    <div className="card-text">Premium Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-text">Scroll to explore</div>
          <div className="scroll-arrow">
            <div className="arrow-line"></div>
            <div className="arrow-line"></div>
          </div>
        </div>
      </header>

      {/* Coffee Categories Section */}
      <section className="coffee-categories" id="coffee">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Coffee Collection</h2>
            <p className="section-subtitle">From single-origin beans to signature blends</p>
          </div>
          <div className="categories-grid">
            <Link to="/menu" className="category-card" data-category="espresso">
              <div className="category-icon">
                <i className="fas fa-fire"></i>
              </div>
              <h3>Espresso</h3>
              <p>Bold, intense, and pure coffee essence</p>
              <div className="category-overlay">
                <span>View Selection</span>
              </div>
            </Link>
            <Link to="/menu" className="category-card" data-category="filter">
              <div className="category-icon">
                <i className="fas fa-filter"></i>
              </div>
              <h3>Filter Coffee</h3>
              <p>Smooth, clean, and perfectly balanced</p>
              <div className="category-overlay">
                <span>View Selection</span>
              </div>
            </Link>
            <Link to="/menu" className="category-card" data-category="milk">
              <div className="category-icon">
                <i className="fas fa-mug-hot"></i>
              </div>
              <h3>Milk-Based</h3>
              <p>Creamy, indulgent, and comforting</p>
              <div className="category-overlay">
                <span>View Selection</span>
              </div>
            </Link>
            <Link to="/menu" className="category-card" data-category="specialty">
              <div className="category-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Specialty</h3>
              <p>Unique flavors and innovative combinations</p>
              <div className="category-overlay">
                <span>View Selection</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Premium Beans</h3>
              <p>Ethically sourced from sustainable farms worldwide</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3>Fast Delivery</h3>
              <p>Fresh coffee delivered to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3>Expert Baristas</h3>
              <p>Masterfully crafted by coffee professionals</p>
            </div>
          </div>
        </div>
      </section>
      
      <OrderModal 
        isOpen={showOrderModal} 
        onClose={() => setShowOrderModal(false)} 
      />
    </>
  );
};

export default Home;
