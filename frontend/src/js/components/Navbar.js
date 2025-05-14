import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/navbar.css";

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleMenu = () => setMenuActive((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuActive(false);

  return (
    <nav className={`navbar ${menuActive ? "active" : ""}`}>
      <div className="navbar-container">
        {/* Hamburger icon */}
        <div className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </div>

        {/* Navigation menu */}
        <ul className={`navbar-list ${menuActive ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/menus" onClick={closeMenu}>
              Menús
            </Link>
          </li>
          <li>
            <Link to="/pizza" onClick={closeMenu}>
              Pizza
            </Link>
          </li>
          <li>
            <Link to="/entrantes" onClick={closeMenu}>
              Entrantes
            </Link>
          </li>
          <li>
            <Link to="/pasta" onClick={closeMenu}>
              Pasta
            </Link>
          </li>
          <li>
            <Link to="/postres" onClick={closeMenu}>
              Postres
            </Link>
          </li>
          <li>
            <Link to="/contacto" onClick={closeMenu}>
              Contacto
            </Link>
          </li>
        </ul>

        <div className="user-menu-container">
          {/*cart */}
          <div className="cart-container">
            <Link to="/cart">
              <img
                src="/img/carrito.png"
                className="icono-cart"
                alt="carrito"
              />
            </Link>
          </div>

          {/*account */}
          <img
            src="/img/icon-user.png"
            className="icono-user"
            alt="icono de usuario"
            onClick={toggleUserMenu}
          />

          {/*user menu*/}
          {userMenuOpen && (
            <div className="user-dropdown">
              <Link to="/registro" onClick={closeMenu}>
                Registrarse
              </Link>
              <Link to="/login" onClick={closeMenu}>
                Iniciar sesión
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
