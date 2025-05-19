import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/main.css';

export default function Menus() {
  return (
    <div className="menus-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <img src="/img/logo.png" alt="Click & Pizza" className="logo" />
          <h3>CLICK & PIZZA</h3>
        </div>
        <div className="menu-categories">
          <Link to="/pizzas">Pizzas</Link>
          <Link to="/pasta">Pasta</Link>
          <Link to="/entrantes">Appetizers</Link>
          <Link to="/postres">Desserts</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar: Navigation + Cart */}
        <div className="topbar">
          <div className="topbar-title">Menus</div>
          <div className="topbar-menu">
            <ul>
              <li><Link to="#">Menus</Link></li>
              <li><Link to="/pizzas">Pizzas</Link></li>
              <li><Link to="#">Appetizers</Link></li>
              <li><Link to="#">Pasta</Link></li>
              <li><Link to="#">Desserts</Link></li>
              <li><Link to="#">Contact</Link></li>
            </ul>
            <div className="cart">
              <img src="/img/carrito.png" alt="Cart" />
              <button>Cart</button>
            </div>
          </div>
        </div>

        {/* Combo Cards */}
        <div className="combos-container">
          <div className="combo-card">
            <p>Pizza Combo1</p>
            <button>Order</button>
          </div>
          <div className="combo-card">
            <p>Pizza Combo2</p>
            <button>Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}
