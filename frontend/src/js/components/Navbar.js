import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/navbar.css";

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("pizzaCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Calcular total
  const calcularTotal = () =>
    cart.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2);

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("pizzaCart");
    setCartOpen(false);
  };

  // Eliminar un solo ítem
  const removeItem = (indexToRemove) => {
    const newCart = [...cart];
    newCart.splice(indexToRemove, 1);
    setCart(newCart);
    localStorage.setItem("pizzaCart", JSON.stringify(newCart));
  };

  // Confirmar pedido
  const confirmOrder = async () => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      alert("Debes iniciar sesión antes de confirmar el pedido.");
      return;
    }

    try {
      const response = await fetch("http://localhost/Click-Pizza/backend/php/shoppingBasket.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          total: calcularTotal(),
          user_id: user_id,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert("¡Pedido confirmado!");
        clearCart();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error al confirmar pedido:", error);
      alert("Error de conexión con el servidor");
    }
  };

  const toggleCart = () => setCartOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuActive(false);

  // Agrupar items iguales
  const groupedCart = cart.reduce((acc, item) => {
    const key = item.name;
    acc[key] = acc[key] || { ...item, quantity: 0 };
    acc[key].quantity++;
    return acc;
  }, {});

  const cartItems = Object.values(groupedCart);

  return (
    <nav className={`navbar ${menuActive ? "active" : ""}`}>
      <div className="navbar-container">
        <div
          className="menu-toggle"
          onClick={() => setMenuActive((prev) => !prev)}
        >
          &#9776;
        </div>

        <ul className={`navbar-list ${menuActive ? "active" : ""}`}>
          <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/menus" onClick={closeMenu}>Menús</Link></li>
          <li><Link to="/pizza" onClick={closeMenu}>Pizza</Link></li>
          <li><Link to="/entrantes" onClick={closeMenu}>Entrantes</Link></li>
          <li><Link to="/pasta" onClick={closeMenu}>Pasta</Link></li>
          <li><Link to="/postres" onClick={closeMenu}>Postres</Link></li>
          <li><Link to="/contacto" onClick={closeMenu}>Contacto</Link></li>
        </ul>

        <div className="user-menu-container">
          {/* Carrito */}
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
                      {cartItems.map((item, index) => (
                        <li
                          key={index}
                          style={{
                            marginBottom: "8px",
                            borderBottom: "1px solid #eee",
                            paddingBottom: "6px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span><strong>{item.name}</strong> × {item.quantity} — {Number(item.price).toFixed(2)} €</span>
                          <button onClick={() => removeItem(index)} style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            lineHeight: "18px",
                            fontSize: "14px",
                            cursor: "pointer"
                          }}>×</button>
                        </li>
                      ))}
                    </ul>
                    <div style={{ fontWeight: "bold", marginTop: "5px" }}>
                      Total: {calcularTotal()} €
                    </div>
                    <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                      <button onClick={clearCart} className="btn btn-clear">Vaciar carrito</button>
                      <button onClick={confirmOrder} className="btn btn-go-cart">Confirmar pedido</button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Usuario */}
          <img
            src="/img/icon-user.png"
            className="icono-user"
            alt="usuario"
            onClick={toggleUserMenu}
            style={{ cursor: "pointer" }}
          />
          {userMenuOpen && (
            <div className="user-dropdown">
              <Link to="/register" onClick={closeMenu}>Registrarse</Link>
              <Link to="/login" onClick={closeMenu}>Iniciar sesión</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
