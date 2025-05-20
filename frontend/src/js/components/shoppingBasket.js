import { useState, useEffect } from "react";
import "../../css/comidas.css";

export default function ShoppingBasket() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("pizzaCart")) || [];
    setCart(storedCart);
    const totalPrice = storedCart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setTotal(totalPrice.toFixed(2));
  }, []);

  const confirmOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("Debes iniciar sesión para confirmar el pedido.");
      return;
    }

    try {
      const response = await fetch("http://localhost/Click-Pizza/backend/php/shoppingBasket.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, total, user_id: user.id }),
      });

      const result = await response.json();
      if (result.success) {
        alert("¡Pedido confirmado!");
        localStorage.removeItem("pizzaCart");
        setCart([]);
        setTotal(0);
      } else {
        alert("Error al guardar pedido: " + result.message);
      }
    } catch (error) {
      console.error("Error al enviar pedido:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="comida-container">
      <h2 className="text-center mb-2 font-semibold text-orange-600">
        Carrito de compras
      </h2>

      {cart.map((item, index) => (
        <div key={index} className="pizza-card p-4 flex flex-col items-center">
          <img
            src={item.img ? `/img/${item.type || "pizzas"}/${item.img}` : "/img/pizzas/default.png"}
            alt={item.name}
            className="imagen-pizza"
          />
          <span className="pizza-name mb-2 text-center">{item.name}</span>
          <span className="precio-texto">{parseFloat(item.price).toFixed(2)} €</span>
        </div>
      ))}

      <div className="finalizar-pedido">
        <h4>Total: {total} €</h4>
        <button className="btn btn-confirm" onClick={confirmOrder}>
          Confirmar pedido
        </button>
      </div>
    </div>
  );
}
