import React from 'react';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <div className="about-header">
              <span className="about-badge">Our Story</span>
              <h2 className="section-title">Crafting Coffee Excellence Since 2010</h2>
              <div className="about-divider"></div>
            </div>
            <div className="about-description">
              <p className="about-lead">
                Founded with a passion for exceptional coffee, Caffeine Atelier brings together the finest beans from
                around the world. Our expert baristas craft each cup with precision, ensuring every sip delivers an unforgettable experience.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <div className="feature-icon-small">
                    <i className="fas fa-leaf"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Ethically Sourced</h4>
                    <p>We partner with sustainable farms that prioritize environmental responsibility</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="feature-icon-small">
                    <i className="fas fa-award"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Award Winning</h4>
                    <p>Recognized for excellence in coffee craftsmanship and service</p>
                  </div>
                </div>
                <div className="about-feature">
                  <div className="feature-icon-small">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Made with Love</h4>
                    <p>Every cup is crafted with passion and attention to detail</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-circle">
                  <span className="stat-number">15+</span>
                </div>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <div className="stat-circle">
                  <span className="stat-number">50+</span>
                </div>
                <span className="stat-label">Coffee Varieties</span>
              </div>
              <div className="stat">
                <div className="stat-circle">
                  <span className="stat-number">1000+</span>
                </div>
                <span className="stat-label">Happy Customers</span>
              </div>
            </div>
            <div className="about-cta">
              <a href="#menu" className="btn btn-primary">Explore Our Menu</a>
              <a href="#contact" className="btn btn-outline">Get in Touch</a>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  if (window.openModalById) {
                    window.openModalById('feedback-contact-modal');
                  }
                }}
              >
                Share Feedback
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  if (window.openModalById) {
                    window.openModalById('reservation-contact-modal');
                  }
                }}
              >
                Reserve Table
              </button>
            </div>
          </div>
          <div className="about-visual">
            <div className="about-image-container">
              <div className="about-image-main">
                <img 
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80" 
                  alt="Coffee Roasting" 
                />
              </div>
              <div className="about-image-overlay">
                <div className="overlay-content">
                  <i className="fas fa-coffee"></i>
                  <span>Premium Quality</span>
                </div>
              </div>
              <div className="about-image-floating">
                <div className="floating-card">
                  <i className="fas fa-star"></i>
                  <span>4.9/5</span>
                  <small>Customer Rating</small>
                </div>
              </div>
            </div>
            <div className="about-gallery">
              <div className="gallery-item">
                <img 
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80" 
                  alt="Coffee Beans" 
                />
              </div>
              <div className="gallery-item">
                <img 
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80" 
                  alt="Coffee Cup" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
