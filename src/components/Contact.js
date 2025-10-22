import React from 'react';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">We'd love to hear from you</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Location</h3>
                <p>#500 Caffeine Atelier, Cabuyao City, Laguna</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+63 9813035763</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>contact@caffeineatelier.com</p>
              </div>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
            <button 
              type="button" 
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
              type="button" 
              className="btn btn-secondary" 
              onClick={() => {
                if (window.openModalById) {
                  window.openModalById('reservation-contact-modal');
                }
              }}
            >
              Reserve Table
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
