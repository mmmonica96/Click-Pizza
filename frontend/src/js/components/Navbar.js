import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/Navbar.css";

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  //contador de productos en el carrito
  // const [cartItemCount] = useState(3);

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
            <a href="#">Menús</a>
          </li>
          <li>
            <Link to="./pizza" onClick={closeMenu}>
              Pizza
            </Link>
          </li>
          <li>
            <a href="#">Entrantes</a>
          </li>
          <li>
            <a href="#">Pasta</a>
          </li>
          <li>
            <a href="#">Postres</a>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>
        </ul>

        {/* Cart & User Menu */}
        <div className="user-menu-container">
          {/* Cart */}
          <div className="cart-container">
            <Link to="/cart">
              <img
                src="/img/carrito.png"
                className="icono-cart"
                alt="carrito"
              />
              {/*posible contador de carrito */}
              {/* {cartCounter > 0 && (
                <span className="cart-count">{cartCounter}</span>
              )} */}
            </Link>
          </div>

          {/* Account */}
          <img
            src="/img/icon-user.png"
            className="icono-user"
            alt="icono de usuario"
            onClick={toggleUserMenu}
          />
           {/*user menu*/}
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
