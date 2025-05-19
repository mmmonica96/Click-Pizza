import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/navbar.css";

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  //localstorage
  useEffect(() => {
    const savedCart = localStorage.getItem("pizzaCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Toggle carrito desplegable
  const toggleCart = () => setCartOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuActive(false);

  // Calcular total del carrito
  const calcularTotal = () =>
    cart
      .reduce((total, item) => total + parseFloat(item.price || 0), 0)
      .toFixed(2);

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("pizzaCart");
    setCartOpen(false);
  };

  return (
    <nav className={`navbar ${menuActive ? "active" : ""}`}>
      <div className="navbar-container">
        <div
          className="menu-toggle"
          onClick={() => setMenuActive((prev) => !prev)}
        >
          &#9776;
        </div>

        {/*navigation menu */}
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
          {/* cart */}
          <div className="cart-container" style={{ position: "relative" }}>
            <img
              src="/img/carrito.png"
              className="icono-cart"
              alt="carrito"
              onClick={toggleCart}
              style={{ cursor: "pointer" }}
            />
            {cartOpen && (
              <div
                className="cart-dropdown"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #ccc",
                  width: "300px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  zIndex: 1000,
                  padding: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                {cart.length === 0 ? (
                  <p>El carrito está vacío.</p>
                ) : (
                  <>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {cart.map((item, index) => (
                        <li
                          key={index}
                          style={{
                            marginBottom: "8px",
                            borderBottom: "1px solid #eee",
                            paddingBottom: "6px",
                          }}
                        >
                          <strong>{item.name}</strong> -{" "}
                          {Number(item.price).toFixed(2)} €
                        </li>
                      ))}
                    </ul>
                    <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                      Total: {calcularTotal()} €
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button onClick={clearCart} className="btn btn-clear">
                        Vaciar carrito
                      </button>
                      <Link
                        to="/cart"
                        onClick={() => setCartOpen(false)}
                        className="btn btn-go-cart"
                      >
                        Ir al carrito
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* User icon */}
          <img
            src="/img/icon-user.png"
            className="icono-user"
            alt="icono de usuario"
            onClick={toggleUserMenu}
            style={{ cursor: "pointer" }}
          />

          {/* User dropdown */}
          {userMenuOpen && (
            <div className="user-dropdown">
              <Link to="/register" onClick={closeMenu}>
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
