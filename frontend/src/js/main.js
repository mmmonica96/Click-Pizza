import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/main.css";

const combos = [
  {
    name: "Margarita Clásica + Refresco",
    price: 12.99,
    img: "img/pizzas/pizza_margarita.jpg",
  },
  {
    name: "Pepperoni Explosion + Patatas + Refresco",
    price: 14.99,
    img: "img/pizzas/pizza-de-peperoni.jpg",
  },
  {
    name: "Hawaiana Tropical + Refresco + Helado",
    price: 13.99,
    img: "img/pizzas/hawaiana.jpg",
  },
  {
    name: "BBQ Deluxe + Complemento + Postre",
    price: 15.99,
    img: "img/pizzas/pizza_barbacoa.jpg",
  },
  {
    name: "Vegetariana Garden + Refresco",
    price: 13.49,
    img: "img/pizzas/Pizza_vegetariana.jpg",
  },
  {
    name: "Cuatro Quesos + Tequeños + Refresco",
    price: 14.49,
    img: "img/pizzas/pizza-4-quesos.jpg",
  },
  {
    name: "Carbonara Special + 2 Refrescos",
    price: 17.49,
    img: "img/pizzas/carbonara.jpg",
  },
  {
    name: "Diavola Picante +  2 complementos",
    price: 14.99,
    img: "img/pizzas/diavola.jpg",
  },
  {
    name: "Truffle Elegance + 2 Refresco + Postre",
    price: 19.99,
    img: "img/pizzas/TruffleElegance.jpg",
  },
  {
    name: "Marinara Fresca + Refresco",
    price: 13.99,
    img: "img/pizzas/MarinaraFresca.jpg",
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
      {/* Main Content - Full Width */}
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
                <div className="combo-price">
                  {combo.price.toLocaleString("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </div>
                <button
                  className="order-btn"
                  style={{
                    backgroundColor: ordered[combo.name]
                      ? "#27ae60"
                      : "#e74c3c",
                  }}
                  onClick={() => handleOrder(combo.name)}
                >
                  {ordered[combo.name] ? "✓ Pedido" : "Añadir al carrito"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <footer className="site-footer">
          <p>© 2023 Click & Pizza - Todos los derechos reservados</p>
        </footer>
      </div>
    </div>
  );
}
