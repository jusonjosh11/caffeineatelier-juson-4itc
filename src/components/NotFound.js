import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-icon">
            <i className="fas fa-coffee"></i>
            <span className="error-code">404</span>
          </div>
          <h1 className="not-found-title">Oops! Page Not Found</h1>
          <p className="not-found-message">
            The page you're looking for seems to have vanished like morning mist. 
            But don't worry, our coffee is still brewing!
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <span className="btn-text">Back to Home</span>
              <span className="btn-icon">🏠</span>
            </Link>
            <Link to="/menu" className="btn btn-secondary">
              <span className="btn-text">View Menu</span>
              <span className="btn-icon">☕</span>
            </Link>
          </div>
          <div className="not-found-suggestions">
            <h3>Maybe you were looking for:</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
