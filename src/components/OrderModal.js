import React, { useState, useEffect } from 'react';

const OrderModal = ({ isOpen, onClose, selectedCoffee = null }) => {
  const [orderForm, setOrderForm] = useState({
    customer_name: '',
    contact: '',
    coffee_selection: selectedCoffee?.name || '',
    coffee_size: 'Small',
    addons: [],
    quantity: 1
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Menu data - using actual coffee names from database
  const menuData = [
    { name: "Classic Espresso", description: "Rich, bold, and perfectly balanced single shot", smallPrice: 180, mediumPrice: 216, largePrice: 252 },
    { name: "Double Ristretto", description: "Concentrated flavor with intense aroma", smallPrice: 220, mediumPrice: 264, largePrice: 308 },
    { name: "Lungo", description: "Extended extraction for a milder taste", smallPrice: 200, mediumPrice: 240, largePrice: 280 },
    { name: "Pour Over", description: "Hand-crafted single-cup brewing method for the perfect extraction", smallPrice: 250, mediumPrice: 300, largePrice: 350 },
    { name: "French Press", description: "Full-bodied coffee with rich oils and bold flavor profile", smallPrice: 280, mediumPrice: 336, largePrice: 392 },
    { name: "AeroPress", description: "Clean, smooth, and versatile brewing with precision control", smallPrice: 300, mediumPrice: 360, largePrice: 420 },
    { name: "Cappuccino", description: "Perfect balance of espresso, steamed milk, and velvety foam", smallPrice: 320, mediumPrice: 384, largePrice: 448 },
    { name: "Latte", description: "Smooth espresso with velvety steamed milk and microfoam", smallPrice: 350, mediumPrice: 420, largePrice: 490 },
    { name: "Flat White", description: "Strong espresso with silky microfoam milk for intense flavor", smallPrice: 380, mediumPrice: 456, largePrice: 532 },
    { name: "Caramel Macchiato", description: "Sweet caramel drizzle layered over rich espresso and steamed milk", smallPrice: 420, mediumPrice: 504, largePrice: 588 },
    { name: "Mocha", description: "Rich chocolate with premium espresso and velvety milk", smallPrice: 450, mediumPrice: 540, largePrice: 630 },
    { name: "Vanilla Latte", description: "Smooth vanilla with perfectly balanced espresso and milk", smallPrice: 400, mediumPrice: 480, largePrice: 560 }
  ];

  const addonPrices = {
    'Extra Shot': 25,
    'Whipped Cream': 15,
    'Almond Milk': 20,
    'Oat Milk': 20
  };


  // Calculate total price
  const calculateTotalPrice = () => {
    if (!orderForm.coffee_selection) return 0;
    
    const coffee = menuData.find(item => item.name === orderForm.coffee_selection);
    if (!coffee) return 0;
    
    let basePrice = 0;
    switch (orderForm.coffee_size) {
      case 'Small':
        basePrice = coffee.smallPrice;
        break;
      case 'Medium':
        basePrice = coffee.mediumPrice;
        break;
      case 'Large':
        basePrice = coffee.largePrice;
        break;
    }
    
    let addonsPrice = orderForm.addons.reduce((total, addon) => total + (addonPrices[addon] || 0), 0);
    
    return Math.round((basePrice + addonsPrice) * orderForm.quantity);
  };

  // Update total price when form changes
  useEffect(() => {
    const newTotal = calculateTotalPrice();
    if (newTotal !== totalPrice) {
      setTotalPrice(newTotal);
    }
  }, [orderForm]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setOrderForm({
        customer_name: '',
        contact: '',
        coffee_selection: selectedCoffee?.name || '',
        coffee_size: 'Small',
        addons: [],
        quantity: 1
      });
      setShowSuccess(false);
    }
  }, [isOpen, selectedCoffee]);

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
      const response = await fetch('http://localhost/4ITC_JUSON/api/submit_order.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: orderForm.customer_name,
          contact: orderForm.contact,
          coffee_selection: orderForm.coffee_selection,
          coffee_size: orderForm.coffee_size,
          addons: orderForm.addons,
          quantity: orderForm.quantity
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log('Order submitted successfully:', result);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 3000);
      } else {
        throw new Error(result.error || 'Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal" id="order-modal">
        <div className="modal-backdrop" onClick={handleClose}></div>
        <div className="modal-card">
          <div className="modal-header">
            <h2>Place Your Order</h2>
            <button 
              className="modal-close"
              onClick={handleClose}
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
                  {menuData.map((coffee, index) => (
                    <option key={index} value={coffee.name}>
                      {coffee.name} - ₱{coffee.smallPrice} (Small)
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
                onClick={handleClose}
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

      {/* Success Animation */}
      {showSuccess && (
        <div className="success-animation show">
          <div className="success-content">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Order Confirmed!</h3>
            <p>Your coffee order has been successfully placed. We'll start brewing it right away!</p>
            <button 
              className="back-to-menu-btn"
              onClick={() => setShowSuccess(false)}
            >
              Back to Menu
            </button>
            <div className="success-animation-bg"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderModal;
