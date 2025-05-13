import React, { useState } from 'react'; // Import useState hook
import '../../css/Navbar.css';

export default function Navbar() {

  return (
    <nav className="navbar">
      <ul>
        <li>Menús</li>
        <li>Pizzas</li>
        <li>Entrantes</li>
        <li>Pasta</li>
        <li>Postre</li>
        <li>Contacto</li>
      </ul>
    </nav>
  );
}
