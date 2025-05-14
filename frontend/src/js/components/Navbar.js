import React, { useState } from 'react';
import '../../css/Navbar.css';

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => setMenuActive(prev => !prev);
  const toggleUserMenu = () => setUserMenuOpen(prev => !prev);

  return (
    <nav className={`navbar ${menuActive ? 'active' : ''}`}>
      <div className="navbar-container">
        {/* Hamburger icon */}
        <div className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </div>

        {/* Navigation menu */}
        <ul className={`navbar-list ${menuActive ? 'active' : ''}`}>
          <li><a href="#">Menús</a></li>
          <li><a href="#">Pizza</a></li>
          <li><a href="#">Entrantes</a></li>
          <li><a href="#">Pasta</a></li>
          <li><a href="#">Postres</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>

        {/* User Icon */}
        <div className="user-menu-container">
          <img
            src="/img/icon-user.png"
            className="icono-user"
            alt="icono"
            onClick={toggleUserMenu}
          />
          {userMenuOpen && (
            <div className="user-dropdown">
              <a href="#">Registrarse</a>
              <a href="#">Iniciar sesión</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
