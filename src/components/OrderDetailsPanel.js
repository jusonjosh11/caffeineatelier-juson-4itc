import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'orders';

const formatCurrency = (v) => `₱${Number(v || 0).toFixed(2)}`;

const OrderDetailsPanel = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setOrders(Array.isArray(parsed) ? parsed.slice().reverse() : []);
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
      setOrders([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const refresh = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        setOrders(Array.isArray(parsed) ? parsed.slice().reverse() : []);
      } catch {}
    };
    window.addEventListener('orders:updated', refresh);
    return () => window.removeEventListener('orders:updated', refresh);
  }, []);

  const totals = useMemo(() => {
    const count = orders.length;
    const revenue = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);
    return { count, revenue };
  }, [orders]);

  const clearOrders = () => {
    if (!window.confirm('Clear all orders?')) return;
    localStorage.removeItem(STORAGE_KEY);
    setOrders([]);
  };

  return (
    <aside className={`orders-panel ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      <div className="orders-backdrop" onClick={onClose} />
      <div className="orders-card" role="dialog" aria-label="Order details panel">
        <div className="orders-header">
          <div className="orders-title">
            <i className="fas fa-receipt" />
            <h3>Order Details</h3>
          </div>
          <button className="orders-close" onClick={onClose} aria-label="Close order details">
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="orders-summary">
          <div className="summary-item"><span>Total Orders</span><strong>{totals.count}</strong></div>
          <div className="summary-item"><span>Total Revenue</span><strong>{formatCurrency(totals.revenue)}</strong></div>
        </div>

        <div className="orders-list">
          {orders.length === 0 && (
            <div className="orders-empty">
              <i className="fas fa-mug-hot" />
              <p>No orders yet. Place an order to see details here.</p>
            </div>
          )}

          {orders.map((o) => (
            <div key={o.id} className="order-item">
              <div className="order-item-header">
                <div className="order-id">{o.id}</div>
                <div className="order-time">{new Date(o.timestamp).toLocaleString()}</div>
              </div>
              <div className="order-item-body">
                <div className="order-main">
                  <div className="order-line">
                    <span className="label">Customer</span>
                    <span className="value">{o.customer_name}</span>
                  </div>
                  <div className="order-line">
                    <span className="label">Contact</span>
                    <span className="value">{o.contact}</span>
                  </div>
                  <div className="order-line">
                    <span className="label">Coffee</span>
                    <span className="value">{o.coffee_selection} · {o.coffee_size} × {o.quantity}</span>
                  </div>
                  {Array.isArray(o.addons) && o.addons.length > 0 && (
                    <div className="order-line">
                      <span className="label">Add-ons</span>
                      <span className="value">{o.addons.join(', ')}</span>
                    </div>
                  )}
                </div>
                <div className="order-total">{formatCurrency(o.total_price)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="orders-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-outline" onClick={clearOrders}>Clear All</button>
        </div>
      </div>
    </aside>
  );
};

export default OrderDetailsPanel;


