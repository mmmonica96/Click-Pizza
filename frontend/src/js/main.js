import React from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css';

export default function Menus() {
  return (
    <div className="menus-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="menu-categories">
          <Link to="/pizzas">Pizzas</Link>
          <Link to="/pasta">Pasta</Link>
          <Link to="/entrantes">Appetizers</Link>
          <Link to="/postres">Desserts</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
       
        </div>

        {/* Combo Cards */}
        <div className="combos-container">
          <div className="combo-card">
            <p>elTriple</p>
            <button>Pedir</button>
          </div>
          <div className="combo-card">
            <p>Family days</p>
            <button>Pedir</button>
          </div>
        </div>
      </div>
    
  );
}
