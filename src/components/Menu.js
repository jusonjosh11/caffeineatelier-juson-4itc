import React, { useState, useEffect } from 'react';

const Menu = () => {
  const [activeTab, setActiveTab] = useState('espresso');
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [orderForm, setOrderForm] = useState({
    customer_name: '',
    contact: '',
    coffee_selection: '',
    coffee_size: 'Small',
    addons: [],
    quantity: 1
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Debug function to test state
  const testButtonClick = () => {
    console.log('Test button clicked!');
    console.log('Current showSuccess state:', showSuccess);
    setShowSuccess(false);
    console.log('Setting showSuccess to false');
  };

  // Force re-render test
  console.log('Menu component rendered, showSuccess:', showSuccess);

  // Fetch menu data from API
  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      // Use static data for now since API is not set up
      setMenuData(getStaticMenuData());
    } catch (error) {
      console.error('Error fetching menu:', error);
      setMenuData(getStaticMenuData());
    } finally {
      setLoading(false);
    }
  };

  // Static menu data as fallback
  const getStaticMenuData = () => ({
    espresso: [
      { name: "Classic Espresso", description: "Rich, bold, and perfectly balanced single shot", price: 180, image: "https://vinut.com.vn/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/12/how-to-make-a-macchiato-the-classic-way-6572e3d759e13.jpeg.webp", tags: ["Strong", "Bold"] },
      { name: "Double Ristretto", description: "Concentrated flavor with intense aroma", price: 220, image: "https://blogstudio.s3.theshoppad.net/coffeeheroau/10897ed60052f2aa1a495aa1c02a8ce6.jpg", tags: ["Intense", "Aromatic"] },
      { name: "Lungo", description: "Extended extraction for a milder taste", price: 200, image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80", tags: ["Mild", "Smooth"] }
    ],
    filter: [
      { name: "Pour Over", description: "Hand-crafted single-cup brewing method for the perfect extraction", price: 250, image: "https://burnoutmugs.com/wp-content/uploads/2024/09/4.1-1024x682.jpg", tags: ["Artisanal", "Clean"] },
      { name: "French Press", description: "Full-bodied coffee with rich oils and bold flavor profile", price: 280, image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80", tags: ["Full-bodied", "Rich"] },
      { name: "AeroPress", description: "Clean, smooth, and versatile brewing with precision control", price: 300, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80", tags: ["Clean", "Smooth"] }
    ],
    milk: [
      { name: "Cappuccino", description: "Perfect balance of espresso, steamed milk, and velvety foam", price: 320, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80", tags: ["Balanced", "Creamy"] },
      { name: "Latte", description: "Smooth espresso with velvety steamed milk and microfoam", price: 350, image: "https://cornercoffeestore.com/wp-content/uploads/2020/01/how-to-make-a-latte-at-home.jpg", tags: ["Smooth", "Velvety"] },
      { name: "Flat White", description: "Strong espresso with silky microfoam milk for intense flavor", price: 380, image: "https://images.arla.com/recordid/8763AA65-2EDD-4328-80C50FD4BB9B9EFE/picture.jpg?width=1200&height=630&mode=crop&format=jpg", tags: ["Strong", "Microfoam"] }
    ],
    specialty: [
      { name: "Caramel Macchiato", description: "Sweet caramel drizzle layered over rich espresso and steamed milk", price: 420, image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=800&q=80", tags: ["Sweet", "Caramel"] },
      { name: "Mocha", description: "Rich chocolate with premium espresso and velvety milk", price: 450, image: "https://www.thespruceeats.com/thmb/POPhcPYBWx7fNJu8Bc7YjS-Flso=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-mocha-4797918-hero-01-1-f8fb7ebd74914895b61366f6fc1d4b05.jpg", tags: ["Chocolate", "Rich"] },
      { name: "Vanilla Latte", description: "Smooth vanilla with perfectly balanced espresso and milk", price: 400, image: "https://cdn11.bigcommerce.com/s-5ljyj9oebs/products/6025/images/27336/P072023205410_1__56263.1709562034.386.513.jpg?c=2", tags: ["Vanilla", "Smooth"] }
    ]
  });

  const tabs = [
    { id: 'espresso', label: 'Espresso' },
    { id: 'filter', label: 'Filter' },
    { id: 'milk', label: 'Milk-Based' },
    { id: 'specialty', label: 'Specialty' }
  ];

  const addonPrices = {
    'Extra Shot': 25,
    'Whipped Cream': 15,
    'Almond Milk': 20,
    'Oat Milk': 20
  };

  const sizeMultipliers = {
    'Small': 1,
    'Medium': 1.2,
    'Large': 1.4
  };

  // Calculate total price with animations
  const calculateTotalPrice = () => {
    if (!orderForm.coffee_selection) return 0;
    
    const coffee = Object.values(menuData).flat().find(item => item.name === orderForm.coffee_selection);
    if (!coffee) return 0;
    
    let basePrice = coffee.price;
    let addonsPrice = orderForm.addons.reduce((total, addon) => total + (addonPrices[addon] || 0), 0);
    let sizeMultiplier = sizeMultipliers[orderForm.coffee_size] || 1;
    
    return Math.round((basePrice + addonsPrice) * sizeMultiplier * orderForm.quantity);
  };

  // Update total price when form changes
  useEffect(() => {
    const newTotal = calculateTotalPrice();
    if (newTotal !== totalPrice) {
      setTotalPrice(newTotal);
    }
  }, [orderForm]);

  const handleOrderClick = (coffee) => {
    setSelectedCoffee(coffee);
    setOrderForm({
      customer_name: '',
      contact: '',
      coffee_selection: coffee.name,
      coffee_size: 'Small',
      addons: [],
      quantity: 1
    });
    setShowOrderModal(true);
  };

  const handleFormChange = (field, value) => {
    setOrderForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddonToggle = (addon) => {
    setOrderForm(prev => ({
      ...prev,
      addons: prev.addons.includes(addon)
        ? prev.addons.filter(a => a !== addon)
        : [...prev.addons, addon]
    }));
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit_order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderForm)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowOrderModal(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="menu" id="menu">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Signature Menu</h2>
            <p className="section-subtitle">Loading our finest offerings...</p>
          </div>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="menu" id="menu">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Signature Menu</h2>
            <p className="section-subtitle">Curated selection of our finest offerings</p>
          </div>

          <div className="menu-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="menu-content">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`tab-content ${activeTab === tab.id ? 'active' : ''}`}
                id={`${tab.id}-tab`}
              >
                <div className="menu-grid">
                  {menuData[tab.id]?.map((item, index) => (
                    <div key={index} className="menu-item">
                      <div className="menu-image">
                        <img src={item.image} alt={item.name} />
                        <div className="menu-overlay">
                          <span className="price">₱{item.price}</span>
                        </div>
                        <div className="order-button-overlay">
                          <button 
                            className="order-btn"
                            onClick={() => handleOrderClick(item)}
                          >
                            <i className="fas fa-shopping-cart"></i>
                            Order Now
                          </button>
                        </div>
                      </div>
                      <div className="menu-details">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <div className="menu-tags">
                          {item.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="modal" id="order-modal">
          <div className="modal-backdrop" onClick={() => setShowOrderModal(false)}></div>
          <div className="modal-card">
            <div className="modal-header">
              <h2>Place Your Order</h2>
              <button 
                className="modal-close"
                onClick={() => setShowOrderModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Customer Name *</label>
                  <input
                    type="text"
                    value={orderForm.customer_name}
                    onChange={(e) => handleFormChange('customer_name', e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Number / Email *</label>
                  <input
                    type="text"
                    value={orderForm.contact}
                    onChange={(e) => handleFormChange('contact', e.target.value)}
                    placeholder="Phone or email"
                  />
                </div>
                
                <div className="form-group">
                  <label>Coffee Selection *</label>
                  <select
                    value={orderForm.coffee_selection}
                    onChange={(e) => handleFormChange('coffee_selection', e.target.value)}
                  >
                    <option value="">Select your coffee</option>
                    {Object.values(menuData).flat().map((coffee, index) => (
                      <option key={index} value={coffee.name}>
                        {coffee.name} - ₱{coffee.price}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Coffee Size *</label>
                  <div className="options">
                    {['Small', 'Medium', 'Large'].map(size => (
                      <label key={size} className="option">
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={orderForm.coffee_size === size}
                          onChange={(e) => handleFormChange('coffee_size', e.target.value)}
                        />
                        <span>{size}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group full-width">
                  <label>Add-ons</label>
                  <div className="addons-grid">
                    {Object.keys(addonPrices).map(addon => (
                      <label key={addon} className="option">
                        <input
                          type="checkbox"
                          checked={orderForm.addons.includes(addon)}
                          onChange={() => handleAddonToggle(addon)}
                        />
                        <span className="option-text">{addon}</span>
                        <span className="addon-price">+₱{addonPrices[addon]}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={orderForm.quantity}
                    onChange={(e) => handleFormChange('quantity', parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
              
              <div className="order-summary">
                <div>
                  <p>Select your coffee to see pricing</p>
                </div>
                <div className="total-price">
                  <span className={`price-display ${totalPrice > 0 ? 'price-animate' : ''}`}>
                    Total: ₱{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <div className="button-group">
                <button 
                  id="orderCancel"
                  onClick={() => setShowOrderModal(false)}
                >
                  Cancel
                </button>
                <button 
                  id="submitOrderBtn"
                  className={isSubmitting ? 'submitting' : ''}
                  onClick={handleSubmitOrder}
                  disabled={!orderForm.customer_name || !orderForm.contact || !orderForm.coffee_selection || isSubmitting}
                >
                  <span className="btn-text">Submit Order</span>
                  <span className="btn-loading">
                    <i className="fas fa-spinner fa-spin"></i> Processing...
                  </span>
                  <span className="btn-success">
                    <i className="fas fa-check"></i> Success!
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {showSuccess && (
        <div 
          className="success-animation show"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowSuccess(false);
            }
          }}
        >
          <div className="success-content">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Order Confirmed!</h3>
            <p>Your coffee order has been successfully placed. We'll start brewing it right away!</p>
            <button 
              type="button"
              className="back-to-menu-btn-react"
              onClick={testButtonClick}
              style={{
                background: 'white',
                color: '#8B4513',
                border: '2px solid #8B4513',
                padding: '1rem 2rem',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                zIndex: 9999,
                position: 'relative'
              }}
              data-testid="back-to-menu-button"
            >
              Back to Menu (React Version)
            </button>
            <div className="success-animation-bg"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;