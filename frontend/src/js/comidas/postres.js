import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import "../../css/comidas.css";

export default function PostresApp() {
  const [cart, setCart] = useState([]);
  const [postres, setPostres] = useState([]);

  // Cargar postres desde el backend
  useEffect(() => {
    fetch(
      "http://localhost/Click-Pizza/backend/connection/controller.php?action=getPostres"
    )
      .then((res) => res.json())
      .then((data) => setPostres(data))
      .catch((err) => console.error("Error al cargar postres:", err));
  }, []);

  const addToCart = (postre) => {
    setCart([...cart, postre]);
    alert(`${postre.name} ¡añadido al carrito!`);
  };

  return (
    <div className="comida-container">
      {postres.map((postre) => (
        <div
          key={postre.id}
          className="pizza-card p-4 flex flex-col items-center"
        >
          <img
            src={`/img/postres/${postre.img}`}
            alt={postre.name}
            className="imagen-pizza"
          />
          <span className="pizza-name mb-2 text-center">{postre.name}</span>

          {/* Precio */}
          <span className="precio-texto">
            {Number(postre.price).toFixed(2)} €
          </span>

          <div className="w-full flex flex-col gap-2 md:flex-row md:justify-between">
            <button onClick={() => addToCart(postre)} className="btn btn-order">
              Pedir
            </button>

            <button className="btn btn-ingredients">Añadir toppings</button>
          </div>

          <div className="rating">
            <span>Opiniones</span>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= (postre.rating || 0) ? "star-filled" : "star-empty"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
