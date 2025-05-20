import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/main.css'; 

const combos = [
  {
    name: 'Margarita Clásica',
    price: '€12.99',
    img: 'img/pizzas/pizza_margarita.jpg',
  },
  {
    name: 'Pepperoni Explosion',
    price: '€14.99',
    img: 'img/pizzas/pizza-de-peperoni.jpg',
  },
  {
    name: 'Hawaiana Tropical',
    price: '€13.99',
    img: 'img/pizzas/hawaiana.jpg',
  },
  {
    name: 'BBQ Deluxe',
    price: '€15.99',
    img: 'img/pizzas/pizza_barbacoa.jpg',
  },
  {
    name: 'Vegetariana Garden',
    price: '€13.49',
    img: 'img/pizzas/Pizza_vegetariana.jpg',
  },
  {
    name: 'Cuatro Quesos',
    price: '€14.49',
    img: 'img/pizzas/pizza-4-quesos.jpg',
  },
  {
    name: 'Carbonara Special',
    price: '€15.49',
    img:'img/pizzas/carbonara.jpg',
  },
  {
    name: 'Diavola Picante',
    price: '€14.99',
    img: 'img/pizzas/diavola.jpg',
  },
  {
    name: 'Truffle Elegance',
    price: '€16.99',
    img: 'img/pizzas/TruffleElegance.jpg',
  },
  {
    name: 'Marinara Fresca',
    price: '€13.99',
    img: 'img/pizzas/MarinaraFresca.jpg',
  },
];

export default function Menus() {
  const [ordered, setOrdered] = useState({});

  const handleOrder = (name) => {
    setOrdered((prev) => ({ ...prev, [name]: true }));
    setTimeout(() => {
      setOrdered((prev) => ({ ...prev, [name]: false }));
    }, 1500);
    console.log(`Pedido: ${name}`);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="category-title">Menús</div>
        <div className="menu-categories">
          <Link to="/pizzas">Pizzas</Link>
          <Link to="/pasta">Pasta</Link>
          <Link to="/entrantes">Entrantes</Link>
          <Link to="/postres">Postres</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">Pizzas</h1>

        <div className="combos-container">
          {combos.map((combo, index) => (
            <div key={index} className="combo-card">
              <div className="combo-image">
                <img src={combo.img} alt={combo.name} />
              </div>
              <div className="combo-info">
                <div className="combo-name">{combo.name}</div>
                <div className="combo-price">{combo.price}</div>
                <button
                  className="order-btn"
                  style={{ backgroundColor: ordered[combo.name] ? '#27ae60' : '#e74c3c' }}
                  onClick={() => handleOrder(combo.name)}
                >
                  {ordered[combo.name] ? '✓ Pedido' : 'Añadir al carrito'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
