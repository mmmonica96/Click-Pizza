import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import "../../css/comidas.css";

export default function PizzaApp() {
  const [cart, setCart] = useState([]);
  const [pizzas, setPizzas] = useState([]);

  // Cargar pizzas desde el backend
  useEffect(() => {
    fetch("http://localhost/Click-Pizza/backend/connection/controller.php?action=getPizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.error("Error al cargar pizzas:", err));
  }, []);

  const addToCart = (pizza) => {
    setCart([...cart, pizza]);
    alert(`${pizza.name} ¡añadida al carrito!`);
  };

  return (
    <div className="comida-container">
      {pizzas.map((pizza) => (
        <div key={pizza.id} className="pizza-card p-4 flex flex-col items-center">
          <img
            src={`/img/pizzas/${pizza.img}`}
            alt={pizza.name}
            className="imagen-pizza"
          />
          <span className="pizza-name mb-2 text-center">{pizza.name}</span>

          <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between">
            <button
              onClick={() => addToCart(pizza)}
              className="btn btn-order"
            >
              Pedir
            </button>

            <button className="btn btn-ingredients">
              Añadir ingredientes
            </button>
          </div>

          <div className="rating">
            <span>Opiniones</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= (pizza.rating || 0) ? "star-filled" : "star-empty"}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
